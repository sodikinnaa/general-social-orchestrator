# Sultan License System (SaaS Core)

Sistem ini memastikan penggunaan API terkunci pada Lisensi dan ID Perangkat (HWID) yang sah.

## 1. Menyiapkan Lisensi
Setiap request ke backend API sekarang mewajibkan header:
- `x-license-key`: Kode lisensi Mas.
- `x-device-id`: ID Unik perangkat Mas.

## 2. Cara Konfigurasi di Plugin
Mas bisa mengatur lisensi global melalui perintah CLI (fitur mendatang) atau langsung di `openclaw.json`:

```json
"general-social-orchestrator": {
  "enabled": true,
  "config": {
    "licenseKey": "SULTAN-XXXX-XXXX",
    "deviceId": "MESIN-UTAMA-01"
  }
}
```

## 3. Manajemen Lisensi (Admin Only)
Untuk membuat lisensi baru, gunakan endpoint admin (perlu `x-admin-secret`):

- **Generate:** `POST /api/v1/admin/license/generate`
- **Body:** `{ "owner": "Nama User", "days": 30 }`

---
*Sistem ini menggunakan SQLite sebagai storage lokal di server backend.*
