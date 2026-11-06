WEBSITE ADMIN EIGER
Login demo:
Username: admin
Password: admin123

Cara menjalankan:
1. Ekstrak folder ZIP.
2. Buka folder customer eiger menggunakan VS Code.
3. Jalankan admin/index.html melalui Live Server.
4. Jalankan customer/index.html (file index.html di folder utama) melalui Live Server untuk sisi customer.
5. Gunakan browser dan origin/port yang sama agar data localStorage dapat dibaca bersama.

Fitur admin:
- Dashboard dan statistik penjualan
- Pengelolaan status transaksi
- Pengelolaan status retur
- Tambah, edit, hapus produk
- Pengaturan diskon produk

Catatan:
Prototype ini menggunakan localStorage, bukan database online. Data hanya tersimpan pada browser/perangkat dan origin yang sama. Untuk penggunaan multi-user atau perangkat berbeda, hubungkan aplikasi ke Firebase/Firestore atau backend database.
