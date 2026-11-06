// js/cloudinary.js

export async function uploadGambar(file) {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'eiger_preset'); // Sesuai preset Cloudinary lu

    try {
        const response = await fetch('https://api.cloudinary.com/v1_1/o5nciczu/image/upload', {
            method: 'POST',
            body: formData
        });
        const data = await response.json();
        return data.secure_url; // Mengembalikan URL gambar
    } catch (error) {
        console.error("Gagal upload gambar:", error);
        throw error;
    }
}
