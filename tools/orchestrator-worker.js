const axios = require('axios');
const minimist = require('minimist');
const fs = require('fs');
const path = require('path');

const args = minimist(process.argv.slice(2));

// Parse input dari AI (JSON strings)
const platforms = JSON.parse(args.platforms || '[]');
const text = args.text;
const mediaUrls = JSON.parse(args.media || '[]');

// NEW: Ambil config dari argumen CLI (OpenClaw akan menyuntikkan config dari openclaw.json)
const configRaw = args.config;
let config = {};

try {
    if (configRaw) {
        config = JSON.parse(configRaw);
    } else {
        // Fallback ke config.json lokal untuk kompatibilitas selama transisi
        const PLUGIN_DIR = path.dirname(__dirname);
        const CONFIG_FILE = path.join(PLUGIN_DIR, 'config.json');
        if (fs.existsSync(CONFIG_FILE)) {
            config = JSON.parse(fs.readFileSync(CONFIG_FILE, 'utf8'));
        }
    }
} catch (e) {
    console.error('❌ Failed to parse configuration:', e.message);
    process.exit(1);
}

async function run() {
    try {
        if (!config.fb && !config.x && !config.threads && !config.ig) {
            console.error('❌ Configuration missing or empty. Please configure at least one platform via OpenClaw settings.');
            process.exit(1);
        }

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
                ig: config.ig,
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
