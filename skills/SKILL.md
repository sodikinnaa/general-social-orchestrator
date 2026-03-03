# Skill: Social Orchestrator
Gunakan tool ini untuk melakukan posting konten ke banyak platform sosial media sekaligus (Facebook, Instagram, X, Threads) melalui Unified API Sultan Engine.

## Tool: social_orchestrator_publish
Mengirim satu konten ke satu atau lebih platform sosial media secara bersamaan.
Input: { "platforms": ["string"], "text": "string", "media_urls": ["string"] }
Command: `node {{PLUGIN_PATH}}/tools/orchestrator-worker.js --platforms="{{platforms}}" --text="{{text}}" --media="{{media_urls}}" --config="{{PLUGIN_CONFIG_JSON}}"`

### Contoh Penggunaan:
User: "Post ke FB dan Twitter: Halo Dunia! [image_url]"
AI: Akan menjalankan tool ini dengan platforms=["facebook", "x"].
