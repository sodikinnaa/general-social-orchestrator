/**
 * General Social Orchestrator Plugin
 */
const PLUGIN_ID = 'general-social-orchestrator';

export function activate(api) {
    // 1. Facebook Auth Command
    api.registerCli(({ program }) => {
        program
            .command('fb-auth <page_id> <access_token>')
            .description('Authenticate Facebook Page')
            .action(async (pageId, accessToken) => {
                await updatePlatformConfig(api, 'fb', {
                    page_id: pageId,
                    access_token: accessToken
                });
                console.log('✅ Facebook configuration updated successfully.');
            });
    }, { commands: ['fb-auth'] });

    // 2. Instagram Auth Command
    api.registerCli(({ program }) => {
        program
            .command('ig-auth <ig_user_id> <access_token>')
            .description('Authenticate Instagram Business Account')
            .action(async (igUserId, accessToken) => {
                await updatePlatformConfig(api, 'ig', {
                    ig_user_id: igUserId,
                    access_token: accessToken
                });
                console.log('✅ Instagram configuration updated successfully.');
            });
    }, { commands: ['ig-auth'] });

    // 3. X (Twitter) Auth Command
    api.registerCli(({ program }) => {
        program
            .command('x-auth <api_key> <api_secret> <access_token> <access_secret>')
            .description('Authenticate X (Twitter) Account')
            .action(async (apiKey, apiSecret, accessToken, accessSecret) => {
                await updatePlatformConfig(api, 'x', {
                    api_key: apiKey,
                    api_secret: apiSecret,
                    access_token: accessToken,
                    access_secret: accessSecret
                });
                console.log('✅ X (Twitter) configuration updated successfully.');
            });
    }, { commands: ['x-auth'] });

    // 4. Threads Auth Command
    api.registerCli(({ program }) => {
        program
            .command('threads-auth <access_token>')
            .description('Authenticate Threads Account')
            .action(async (accessToken) => {
                await updatePlatformConfig(api, 'threads', {
                    access_token: accessToken
                });
                console.log('✅ Threads configuration updated successfully.');
            });
    }, { commands: ['threads-auth'] });

    // 5. License Setup Command
    api.registerCli(({ program }) => {
        program
            .command('sultan-license <license_key> <device_id>')
            .description('Setup Sultan Engine License and Device ID')
            .action(async (licenseKey, deviceId) => {
                const currentConfig = api.config || {};
                const newConfig = {
                    ...currentConfig,
                    licenseKey: licenseKey,
                    deviceId: deviceId
                };
                if (api.saveConfig) {
                    await api.saveConfig(newConfig);
                    console.log('✅ Sultan License and Device ID updated successfully.');
                } else {
                    console.warn('⚠️ api.saveConfig not available.');
                }
            });
    }, { commands: ['sultan-license'] });
}

async function updatePlatformConfig(api, platform, credentials) {
    const currentConfig = api.config || {};
    const newConfig = {
        ...currentConfig,
        [platform]: credentials
    };
    
    // Check if saveConfig is available on the api object
    if (api.saveConfig) {
        await api.saveConfig(newConfig);
    } else {
        // Fallback for older SDK or manual update
        console.warn('⚠️ api.saveConfig not available. Update openclaw.json manually or check SDK version.');
    }
}

export const register = activate;
export default activate;
