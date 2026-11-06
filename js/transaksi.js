if(localStorage.getItem("customerLogin")!=="true"){
    window.location.replace("../index.html");
}

/*
 * DATA PRODUK CONTOH
 * Data ini nantinya dapat diganti dengan data dari database/admin.
 */
const defaultProducts = [
    {
        id: 1,
        nama: "EIGER Riding Pack 20L",
        kategori: "Tas",
        harga: 599000,
        stok: 15,
        gambar: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600",
        deskripsi: "Tas praktis untuk aktivitas harian dan perjalanan."
    },
    {
        id: 2,
        nama: "EIGER Adventure Jacket",
        kategori: "Jaket",
        harga: 899000,
        stok: 10,
        gambar: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=600",
        deskripsi: "Jaket outdoor untuk kegiatan petualangan."
    },
    {
        id: 3,
        nama: "EIGER Trail Running Shoes",
        kategori: "Sepatu",
        harga: 749000,
        stok: 12,
        gambar: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600",
        deskripsi: "Sepatu nyaman untuk aktivitas outdoor."
    },
    {
        id: 4,
        nama: "EIGER Waist Bag",
        kategori: "Tas",
        harga: 299000,
        stok: 20,
        gambar: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600",
        deskripsi: "Tas pinggang ringan untuk aktivitas sehari-hari."
    },
    {
        id: 5,
        nama: "EIGER Outdoor Cap",
        kategori: "Aksesoris",
        harga: 159000,
        stok: 25,
        gambar: "https://images.unsplash.com/photo-1521369909029-2afed882baee?w=600",
        deskripsi: "Topi outdoor dengan desain kasual."
    },
    {
        id: 6,
        nama: "EIGER Outdoor Sandal",
        kategori: "Sepatu",
        harga: 349000,
        stok: 18,
        gambar: "https://images.unsplash.com/photo-1603487742131-4160ec999306?w=600",
        deskripsi: "Sandal outdoor nyaman digunakan untuk perjalanan."
    },
    {
        id: 7,
        nama: "EIGER Rain Cover",
        kategori: "Aksesoris",
        harga: 129000,
        stok: 30,
        gambar: "https://images.unsplash.com/photo-1558981806-ec527fa84c39?w=600",
        deskripsi: "Pelindung barang dari hujan."
    },
    {
        id: 8,
        nama: "EIGER Hiking Backpack 35L",
        kategori: "Tas",
        harga: 999000,
        stok: 8,
        gambar: "https://images.unsplash.com/photo-1622260614153-03223fb72052?w=600",
        deskripsi: "Tas hiking berkapasitas besar untuk perjalanan outdoor."
    }
];
let products = JSON.parse(localStorage.getItem("eigerProducts") || "null") || defaultProducts;
if (!localStorage.getItem("eigerProducts")) localStorage.setItem("eigerProducts", JSON.stringify(products));


let cart = [];

const productList = document.getElementById("productList");
const cartList = document.getElementById("cartList");
const subtotalElement = document.getElementById("subtotal");
const totalItemElement = document.getElementById("totalItem");
const filterKategori = document.getElementById("filterKategori");

function rupiah(number){
    return new Intl.NumberFormat("id-ID", {
        style:"currency",
        currency:"IDR",
        minimumFractionDigits:0
    }).format(number);
}

function tampilkanProduk(kategori="Semua"){
    const filtered = kategori === "Semua"
        ? products
        : products.filter(p => p.kategori === kategori);

    productList.innerHTML = "";

    filtered.forEach(product => {

        const existing = cart.find(item => item.id === product.id);
        const jumlah = existing ? existing.jumlah : 0;

        productList.innerHTML += `
        <div class="col-md-6">
            <div class="card product-card overflow-hidden">

                <img src="${product.gambar}"
                     class="product-image w-100"
                     alt="${product.nama}"
                     onerror="this.src='https://via.placeholder.com/600x400?text=EIGER'">

                <div class="card-body">

                    <div class="d-flex justify-content-between mb-2">
                        <span class="badge bg-secondary">${product.kategori}</span>
                        <span class="badge ${product.stok > 0 ? 'bg-success' : 'bg-danger'} badge-stock">
                            Stok ${product.stok}
                        </span>
                    </div>

                    <h5>${product.nama}</h5>

                    <p class="text-muted small">
                        ${product.deskripsi}
                    </p>

                    <div class="product-price mb-3">
                        ${product.diskon > 0 ? `<span class="text-danger">${rupiah(Math.round(product.harga*(100-product.diskon)/100))}</span> <small class="text-muted text-decoration-line-through">${rupiah(product.harga)}</small>` : rupiah(product.harga)}${product.diskon > 0 ? `<span class="badge bg-danger ms-2">-${product.diskon}%</span>` : ""}
                    </div>

                    <button
                        class="btn btn-dark w-100"
                        onclick="tambahKeranjang(${product.id})"
                        ${product.stok <= 0 || jumlah >= product.stok ? "disabled" : ""}>
                        ${jumlah > 0 ? `Sudah di Keranjang (${jumlah})` : "Tambah ke Keranjang"}
                    </button>

                </div>
            </div>
        </div>`;
    });
}

function tambahKeranjang(id){

    const product = products.find(p => p.id === id);

    if(!product) return;

    const existing = cart.find(item => item.id === id);

    if(existing){

        if(existing.jumlah >= product.stok){
            alert("Jumlah melebihi stok barang.");
            return;
        }

        existing.jumlah++;

    }else{

        cart.push({
            id: product.id,
            nama: product.nama,
            harga: Math.round(product.harga * (100-(product.diskon || 0))/100),
            jumlah: 1
        });

    }

    tampilkanProduk(filterKategori.value);
    tampilkanKeranjang();
}

function kurangiJumlah(id){

    const item = cart.find(item => item.id === id);

    if(!item) return;

    item.jumlah--;

    if(item.jumlah <= 0){
        cart = cart.filter(item => item.id !== id);
    }

    tampilkanProduk(filterKategori.value);
    tampilkanKeranjang();
}

function tambahJumlah(id){

    const item = cart.find(item => item.id === id);
    const product = products.find(p => p.id === id);

    if(!item || !product) return;

    if(item.jumlah >= product.stok){
        alert("Jumlah sudah mencapai stok tersedia.");
        return;
    }

    item.jumlah++;

    tampilkanProduk(filterKategori.value);
    tampilkanKeranjang();
}

function hapusItem(id){

    cart = cart.filter(item => item.id !== id);

    tampilkanProduk(filterKategori.value);
    tampilkanKeranjang();
}

function tampilkanKeranjang(){

    cartList.innerHTML = "";

    if(cart.length === 0){

        cartList.innerHTML = `
            <div class="text-center text-muted py-4">
                Keranjang masih kosong.
            </div>
        `;

    }else{

        cart.forEach(item => {

            const total = item.harga * item.jumlah;

            cartList.innerHTML += `
            <div class="cart-item">

                <div class="d-flex justify-content-between">
                    <strong>${item.nama}</strong>
                    <button class="btn btn-sm btn-outline-danger"
                            onclick="hapusItem(${item.id})">
                        ×
                    </button>
                </div>

                <div class="small text-muted mt-1">
                    ${rupiah(item.harga)} × ${item.jumlah}
                </div>

                <div class="d-flex justify-content-between align-items-center mt-2">

                    <div>
                        <button class="btn btn-outline-secondary qty-btn"
                                onclick="kurangiJumlah(${item.id})">
                            −
                        </button>

                        <span class="mx-2">${item.jumlah}</span>

                        <button class="btn btn-outline-secondary qty-btn"
                                onclick="tambahJumlah(${item.id})">
                            +
                        </button>
                    </div>

                    <strong>${rupiah(total)}</strong>

                </div>

            </div>`;
        });
    }

    const subtotal = cart.reduce(
        (sum,item) => sum + (item.harga * item.jumlah), 0
    );

    const totalItem = cart.reduce(
        (sum,item) => sum + item.jumlah, 0
    );

    subtotalElement.textContent = rupiah(subtotal);
    totalItemElement.textContent = totalItem;
}

filterKategori.addEventListener("change", function(){
    tampilkanProduk(this.value);
});

document.getElementById("clearCartBtn").addEventListener("click", function(){

    if(cart.length === 0) return;

    if(confirm("Kosongkan semua isi keranjang?")){

        cart = [];

        tampilkanProduk(filterKategori.value);
        tampilkanKeranjang();
    }
});

document.getElementById("checkoutBtn").addEventListener("click", function(){

    if(cart.length === 0){
        alert("Keranjang masih kosong.");
        return;
    }

    const customer = document.getElementById("customer").value.trim();
    const email = document.getElementById("email").value.trim();
    const pembayaran = document.getElementById("pembayaran").value;
    const keterangan = document.getElementById("keterangan").value.trim();

    if(!customer || !email || !pembayaran){

        alert("Silakan lengkapi data pembeli dan metode pembayaran.");
        return;
    }

    const subtotal = cart.reduce(
        (sum,item) => sum + (item.harga * item.jumlah), 0
    );

    const transaksi = JSON.parse(
        localStorage.getItem("customerTransaksi") || "[]"
    );

    const nomorTransaksi =
        "TRX-" + Date.now();

    transaksi.push({

        id: Date.now(),

        nomorTransaksi: nomorTransaksi,

        customerUsername:
            localStorage.getItem("customerUsername"),

        tanggal:
            new Date().toLocaleString("id-ID"),

        customer: customer,

        email: email,

        items: cart.map(item => ({
            id: item.id,
            nama: item.nama,
            harga: item.harga,
            jumlah: item.jumlah,
            total: item.harga * item.jumlah
        })),

        totalItem:
            cart.reduce((sum,item) => sum + item.jumlah, 0),

        total:
            subtotal,

        pembayaran:
            pembayaran,

        keterangan:
            keterangan,

        status:
            "Menunggu Pembayaran"

    });

    localStorage.setItem(
        "customerTransaksi",
        JSON.stringify(transaksi)
    );

    alert(
        "Transaksi berhasil disimpan.\\n\\n" +
        "Nomor Transaksi: " + nomorTransaksi +
        "\\nTotal: " + rupiah(subtotal)
    );

    cart = [];

    document.getElementById("buyerForm").reset();

    tampilkanProduk(filterKategori.value);
    tampilkanKeranjang();
});

tampilkanProduk();
tampilkanKeranjang();
