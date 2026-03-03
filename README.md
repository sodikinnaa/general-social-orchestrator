# General Social Orchestrator Plugin
Plugin ini menghubungkan OpenClaw dengan Sultan Soul API untuk posting lintas platform (FB, IG, X, Threads).

## Perintah Auth (Simulasi):
Untuk sementara, silakan buat file `config.json` di root plugin ini dengan format:
```json
{
  "fb": { "page_id": "...", "access_token": "..." },
  "x": { "api_key": "...", "api_secret": "...", "access_token": "...", "access_secret": "..." },
  "threads": { "access_token": "..." }
}
```
Mendukung tool `social_orchestrator_publish`.
