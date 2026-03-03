import { Extension, Command } from 'openclaw';

export default class GeneralSocialOrchestrator extends Extension {
    async onload() {
        // 1. Facebook Auth Command
        this.registerCommand(
            new Command('fb-auth')
                .description('Authenticate Facebook Page')
                .argument('<page_id>', 'Facebook Page ID')
                .argument('<access_token>', 'Page Access Token')
                .action(async (pageId, accessToken) => {
                    await this.updatePlatformConfig('fb', {
                        page_id: pageId,
                        access_token: accessToken
                    });
                    console.log('✅ Facebook configuration updated successfully.');
                })
        );

        // 2. Instagram Auth Command
        this.registerCommand(
            new Command('ig-auth')
                .description('Authenticate Instagram Business Account')
                .argument('<ig_user_id>', 'Instagram Business ID')
                .argument('<access_token>', 'Page Access Token (with IG permissions)')
                .action(async (igUserId, accessToken) => {
                    await this.updatePlatformConfig('ig', {
                        ig_user_id: igUserId,
                        access_token: accessToken
                    });
                    console.log('✅ Instagram configuration updated successfully.');
                })
        );

        // 3. X (Twitter) Auth Command
        this.registerCommand(
            new Command('x-auth')
                .description('Authenticate X (Twitter) Account')
                .argument('<api_key>', 'API Key')
                .argument('<api_secret>', 'API Key Secret')
                .argument('<access_token>', 'Access Token')
                .argument('<access_secret>', 'Access Token Secret')
                .action(async (apiKey, apiSecret, accessToken, accessSecret) => {
                    await this.updatePlatformConfig('x', {
                        api_key: apiKey,
                        api_secret: apiSecret,
                        access_token: accessToken,
                        access_secret: accessSecret
                    });
                    console.log('✅ X (Twitter) configuration updated successfully.');
                })
        );

        // 4. Threads Auth Command
        this.registerCommand(
            new Command('threads-auth')
                .description('Authenticate Threads Account')
                .argument('<access_token>', 'Threads Access Token')
                .action(async (accessToken) => {
                    await this.updatePlatformConfig('threads', {
                        access_token: accessToken
                    });
                    console.log('✅ Threads configuration updated successfully.');
                })
        );
    }

    /**
     * Helper to update specific platform config without losing other data
     */
    async updatePlatformConfig(platform, credentials) {
        const currentConfig = this.config || {};
        const newConfig = {
            ...currentConfig,
            [platform]: credentials
        };
        
        if (this.saveConfig) {
            await this.saveConfig(newConfig);
        } else {
            throw new Error('Plugin context does not support saveConfig');
        }
    }
}
