import fs from 'fs';
import path from 'path';

/**
 * Update plugin configuration in openclaw.json
 * This is a helper for CLI commands
 */
async function updateConfig(pluginContext, newConfig) {
    const currentConfig = pluginContext.config || {};
    const mergedConfig = { ...currentConfig, ...newConfig };
    
    // In OpenClaw plugin environment, we use the plugin context to save
    if (pluginContext.saveConfig) {
        await pluginContext.saveConfig(mergedConfig);
    } else {
        throw new Error('Plugin context does not support saveConfig');
    }
}

export async function fbAuth(args, context) {
    const [pageId, accessToken] = args;
    if (!pageId || !accessToken) {
        console.error('Usage: openclaw fb-auth <PAGE_ID> <ACCESS_TOKEN>');
        process.exit(1);
    }

    try {
        await updateConfig(context, {
            fb: {
                page_id: pageId,
                access_token: accessToken
            }
        });
        console.log('✅ Facebook configuration updated successfully.');
    } catch (error) {
        console.error('❌ Failed to update Facebook configuration:', error.message);
        process.exit(1);
    }
}

export async function igAuth(args, context) {
    const [igUserId, accessToken] = args;
    if (!igUserId || !accessToken) {
        console.error('Usage: openclaw ig-auth <INSTAGRAM_ID> <ACCESS_TOKEN>');
        process.exit(1);
    }

    try {
        await updateConfig(context, {
            ig: {
                ig_user_id: igUserId,
                access_token: accessToken
            }
        });
        console.log('✅ Instagram configuration updated successfully.');
    } catch (error) {
        console.error('❌ Failed to update Instagram configuration:', error.message);
        process.exit(1);
    }
}

export async function xAuth(args, context) {
    const [apiKey, apiSecret, accessToken, accessSecret] = args;
    if (!apiKey || !apiSecret || !accessToken || !accessSecret) {
        console.error('Usage: openclaw x-auth <API_KEY> <API_SECRET> <ACCESS_TOKEN> <ACCESS_SECRET>');
        process.exit(1);
    }

    try {
        await updateConfig(context, {
            x: {
                api_key: apiKey,
                api_secret: apiSecret,
                access_token: accessToken,
                access_secret: accessSecret
            }
        });
        console.log('✅ X (Twitter) configuration updated successfully.');
    } catch (error) {
        console.error('❌ Failed to update X configuration:', error.message);
        process.exit(1);
    }
}

export async function threadsAuth(args, context) {
    const [accessToken] = args;
    if (!accessToken) {
        console.error('Usage: openclaw threads-auth <ACCESS_TOKEN>');
        process.exit(1);
    }

    try {
        await updateConfig(context, {
            threads: {
                access_token: accessToken
            }
        });
        console.log('✅ Threads configuration updated successfully.');
    } catch (error) {
        console.error('❌ Failed to update Threads configuration:', error.message);
        process.exit(1);
    }
}
