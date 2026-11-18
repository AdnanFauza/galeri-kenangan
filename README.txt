GALERI KENANGAN — FILE TERPISAH

Cara pakai / upload ke Vercel:
1. Upload seluruh isi folder ini ke satu repository GitHub (jangan hanya index.html).
2. Di Vercel, pilih Add New Project lalu import repository tersebut.
3. Framework Preset: Other. Build Command dan Output Directory bisa dikosongkan/default.
4. Deploy.

Struktur:
- index.html : halaman utama
- base.css : reset dasar
- viewer.css : tampilan galeri
- editor.css : tampilan editor
- viewer.js : mesin tampilan galeri
- editor.js : fitur editor, simpan, unduh, dan buat link

Catatan: file hasil unduhan/tautan galeri tetap dibuat sebagai HTML mandiri agar bisa dibuka tanpa folder aset. Karena fitur ekspor mengambil file CSS/JS, gunakan melalui server (misalnya Vercel atau localhost), bukan membuka index.html langsung dengan file://.
