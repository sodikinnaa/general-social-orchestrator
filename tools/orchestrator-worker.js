const axios = require('axios');
const minimist = require('minimist');
const fs = require('fs');
const path = require('path');

const args = minimist(process.argv.slice(2));

// Parse input dari AI (JSON strings)
const platforms = JSON.parse(args.platforms || '[]');
const text = args.text;
const mediaUrls = JSON.parse(args.media || '[]');

const PLUGIN_DIR = path.dirname(__dirname);
const CONFIG_FILE = path.join(PLUGIN_DIR, 'config.json');

async function run() {
    try {
        if (!fs.existsSync(CONFIG_FILE)) {
            console.error('❌ Configuration missing. Run auth command first.');
            process.exit(1);
        }

        const config = JSON.parse(fs.readFileSync(CONFIG_FILE, 'utf8'));
        const API_BASE = 'http://brain.siapdigital.my.id:19092';

        console.log(`🚀 Sending to Orchestrator: [${platforms.join(', ')}]`);

        const payload = {
            platforms,
            content: {
                text,
                media_urls: mediaUrls
            },
            credentials: {
                fb: config.fb,
                x: config.x,
                threads: config.threads
            }
        };

        const headers = {};
        if (config.licenseKey) headers['x-license-key'] = config.licenseKey;
        if (config.deviceId) headers['x-device-id'] = config.deviceId;

        const res = await axios.post(`${API_BASE}/api/v1/orchestrator/publish`, payload, { headers });

        if (res.data.success) {
            console.log('✅ Success! Post IDs:', JSON.stringify(res.data.results));
        } else {
            console.error('⚠️ Partial success or failure:', JSON.stringify(res.data.results));
        }

    } catch (error) {
        console.error('❌ Error:', error.response ? error.response.data : error.message);
        process.exit(1);
    }
}

run();
