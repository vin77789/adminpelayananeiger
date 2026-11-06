import { db } from './firebase.js';
import { uploadGambar } from './cloudinary.js';
import { collection, addDoc, getDocs, deleteDoc, doc } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

const productRows = document.getElementById('productRows');
const countBadge = document.getElementById('count');

// 1. Fungsi Nampilin Data dari Firestore
async function tampilkanProduk() {
    productRows.innerHTML = '<tr><td colspan="5" class="text-center">Memuat data...</td></tr>';
    
    try {
        const snapshot = await getDocs(collection(db, "products"));
        const products = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        
        if (countBadge) countBadge.textContent = `${products.length} Produk`;

        productRows.innerHTML = products.map(p => `
            <tr>
                <td>
                    <img src="${p.image_url}" width="50" height="50" style="object-fit:cover; border-radius:5px;">
                    <span class="ms-2">${p.nama}</span>
                </td>
                <td>${p.kategori}</td>
                <td>Rp ${Number(p.harga).toLocaleString('id-ID')}</td>
                <td>${p.stok}</td>
                <td>
                    <button class="btn btn-sm btn-danger" onclick="hapusProduk('${p.id}')">Hapus</button>
                </td>
            </tr>
        `).join('');
    } catch (error) {
        console.error(error);
        productRows.innerHTML = '<tr><td colspan="5" class="text-center text-danger">Gagal memuat data.</td></tr>';
    }
}

// 2. Fungsi Simpan Barang Baru
const form = document.getElementById('productForm');
if(form) {
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const fileFoto = document.getElementById('foto').files[0];
        const btnSimpan = document.getElementById('saveProduct');
        
        if (!fileFoto) {
            alert("Pilih foto produk dulu!");
            return;
        }

        btnSimpan.textContent = "Mengunggah...";
        btnSimpan.disabled = true;

        try {
            const imageUrl = await uploadGambar(fileFoto);

            await addDoc(collection(db, "products"), {
                nama: document.getElementById('namaBarang').value,
                kategori: document.getElementById('kategori').value,
                harga: Number(document.getElementById('harga').value),
                stok: Number(document.getElementById('stok').value),
                image_url: imageUrl,
                diskon: 0
            });

            alert("Barang berhasil ditambahkan!");
            form.reset();
            tampilkanProduk();

        } catch (error) {
            alert("Gagal menyimpan barang: " + error.message);
        } finally {
            btnSimpan.textContent = "SIMPAN BARANG";
            btnSimpan.disabled = false;
        }
    });
}

// 3. Fungsi Hapus Barang
window.hapusProduk = async (id) => {
    if (confirm("Yakin mau hapus barang ini?")) {
        await deleteDoc(doc(db, "products", id));
        tampilkanProduk();
    }
};

// Panggil pertama kali
tampilkanProduk();
