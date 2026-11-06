
const $ = id => document.getElementById(id);
let products=read("eigerProducts");
function persist(){localStorage.setItem("eigerProducts",JSON.stringify(products))}
function render(){
 $("count").textContent=products.length+" produk";
 $("productRows").innerHTML=products.map(p=>`<tr><td><div class="d-flex align-items-center gap-2"><img class="thumb" src="${esc(p.gambar||"")}" onerror="this.src='https://placehold.co/80x80?text=EIGER'"><div><b>${esc(p.nama)}</b><div class="small text-secondary">${esc(p.kategori)}</div></div></div></td><td>${rupiah(p.harga)}</td><td>${p.stok}</td><td><span class="badge ${p.diskon>0?"text-bg-danger":"badge-soft"}">${p.diskon||0}%</span></td><td class="text-nowrap"><button class="btn btn-sm btn-outline-success" onclick="editProduct(${p.id})">Edit</button> <button class="btn btn-sm btn-outline-danger" onclick="deleteProduct(${p.id})">Hapus</button></td></tr>`).join("")||'<tr><td colspan="5" class="empty-state">Belum ada produk. Tambahkan barang melalui formulir.</td></tr>'
}
function resetForm(){$("productForm").reset();$("productId").value="";$("discount").value=0;$("saveBtn").textContent="Simpan Barang"}
function editProduct(id){const p=products.find(x=>x.id===id);$("productId").value=p.id;$("name").value=p.nama;$("category").value=p.kategori;$("price").value=p.harga;$("stock").value=p.stok;$("discount").value=p.diskon||0;$("image").value=p.gambar||"";$("description").value=p.deskripsi||"";$("saveBtn").textContent="Simpan Perubahan";window.scrollTo({top:0,behavior:"smooth"})}
function deleteProduct(id){if(confirm("Hapus produk ini dari katalog?")){products=products.filter(p=>p.id!==id);persist();render()}}
$("productForm").addEventListener("submit",e=>{e.preventDefault();const id=$("productId").value?Number($("productId").value):Date.now();const item={id,nama:$("name").value.trim(),kategori:$("category").value,harga:Number($("price").value),stok:Number($("stock").value),diskon:Number($("discount").value)||0,gambar:$("image").value.trim()||"https://placehold.co/600x400?text=EIGER",deskripsi:$("description").value.trim()};if(item.diskon<0||item.diskon>100){alert("Diskon harus 0 sampai 100%.");return}const idx=products.findIndex(p=>p.id===id);if(idx>=0)products[idx]=item;else products.push(item);persist();resetForm();render();alert("Data produk berhasil disimpan.")});
render();
