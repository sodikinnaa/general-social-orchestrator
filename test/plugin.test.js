const { Extension } = require('openclaw');
const GeneralSocialOrchestrator = require('./index').default;

describe('GeneralSocialOrchestrator Plugin', () => {
    let extension;

    beforeEach(() => {
        extension = new GeneralSocialOrchestrator({
            id: 'test-plugin',
            config: {
                fb: { page_id: '123', access_token: 'abc' }
            }
        });
    });

    test('should be an instance of Extension', () => {
        expect(extension).toBeInstanceOf(Extension);
    });

    test('should have an onload method', () => {
        expect(typeof extension.onload).toBe('function');
    });

    test('should update specific platform config correctly', async () => {
        // Mock saveConfig
        extension.saveConfig = jest.fn().mockResolvedValue(true);
        
        await extension.updatePlatformConfig('x', { api_key: 'key', api_secret: 'secret' });
        
        expect(extension.saveConfig).toHaveBeenCalledWith({
            fb: { page_id: '123', access_token: 'abc' },
            x: { api_key: 'key', api_secret: 'secret' }
        });
    });
});
