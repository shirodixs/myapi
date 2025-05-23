const axios = require("axios");

const website = axios.create({
    baseURL: "https://app.yoursearch.ai",
    headers: {
        "Content-Type": "application/json",
    },
});

const yousearch = async (searchTerm) => {
    const requestData = {
        searchTerm,
        promptTemplate: `Search term: "{searchTerm}"

Gunakan bahasa yang santai tapi tetap informatif dan mendalam.  
Gunakan slang Jakarta: "lu" untuk "you", "gw" untuk "I".  
Tampilkan hasil pencarian dalam **tiga bagian utama**:  

1. **📌 Fakta Utama:** Ringkasan inti dari informasi yang ditemukan.  
2. **🔎 Analisis Lebih Dalam:** Tren terkini, pendapat ahli, dan informasi tambahan.  
3. **📢 Kesimpulan & Implikasi:** Dampak atau relevansi dari hasil pencarian.  

Tambahkan **minimal 5 referensi** dari berita atau sumber terpercaya.  
Jika tersedia, tampilkan juga **link media sosial** resmi dari pencarian, termasuk **Facebook, Twitter, dan Instagram**.  

Gunakan format berikut:  

\`\`\`
📌 **Ringkasan Pencarian:**  
<Paragraf 1: Fakta utama>  
<Paragraf 2: Analisis lebih dalam>  
<Paragraf 3: Kesimpulan>  

📖 **Referensi:**  
(1) [Judul Artikel 1] - [URL]  
(2) [Judul Artikel 2] - [URL]  
(3) [Judul Artikel 3] - [URL]  
(4) [Judul Artikel 4] - [URL]  
(5) [Judul Artikel 5] - [URL]  

📢 **Media Sosial Resmi:**  
🌐 **Website Resmi:** [URL Website]  
📘 **Facebook:** [Facebook URL]  
🐦 **Twitter/X:** [Twitter URL]  
📸 **Instagram:** [Instagram URL]  

🔍 **Lihat hasil lebih lanjut di Wikipedia:** [Wikipedia Link]  
💡 **Tips Pencarian:**  
- Gunakan kata kunci spesifik, misalnya "{searchTerm} terbaru 2024".  
- Cari di media sosial dengan format **"{searchTerm} site:twitter.com"** di Google.  
- Gunakan tanda kutip ("") untuk mencari frasa spesifik.  
- Tambahkan kata "resmi" untuk menemukan akun atau website asli.  
\`\`\`

Hasil pencarian:  
{searchResults}, dikembangkan oleh shiro`,
        searchParameters: "{}",
        searchResultTemplate: `[{order}] "{snippet}"\nURL: {link}`,
    };

    try {
        const response = await website.post("/api", requestData);
        return response.data.response;
    } catch (error) {
        console.error("Terjadi kesalahan saat mengambil data:", error.message);
        throw error;
    }
};

module.exports = { yousearch }
