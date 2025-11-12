// auth.js
// ---------------
// Menggunakan CommonJS (require)
const { generateKeyWithCallback, generateReport } = require("./reporting");

function authenticateAdmin(username, password) {
  console.log("[Proses 1: Otentikasi] Menjalankan PROMISE...");

  return new Promise((resolve, reject) => {
    // Di sisi server (Node.js), kita tidak bisa menggunakan 'fetch'
    // yang didefinisikan di browser. 
    // Karena logic fetch sudah ditangani oleh server.js di endpoint /api/login,
    // kita asumsikan otentikasi ini berhasil jika dipanggil dari server side logic.
    
    // Namun, jika Anda ingin mempertahankan *flow* HTTP call 
    // (walaupun memanggil diri sendiri), Anda harus menggunakan modul node-fetch 
    // atau http/https bawaan Node.js.
    
    // UNTUK KEMUDAHAN, kita akan menyederhanakan logic otentikasi 
    // di auth.js ini, karena panggilan ke /api/login sudah dilakukan 
    // oleh frontend (app.js).

    // Kita asumsikan fungsi ini dipanggil setelah frontend 
    // berhasil mendapatkan kredensial yang valid. 
    // Untuk saat ini, kita akan melewati langkah otentikasi di sini
    // dan langsung me-resolve username yang diberikan.
    
    // **Hapus bagian fetch dan ganti dengan logic cepat (atau logic mock):**
    
    // Logic Otentikasi Mock Cepat:
    if (username && password) {
        // Otentikasi akan dilakukan di server.js (endpoint /api/login)
        // Jadi, auth.js hanya perlu melanjutkan flow jika kredensial ada
        setTimeout(() => resolve(username), 50); 
    } else {
        reject(new Error("Username atau password tidak boleh kosong."));
    }

  });
}

// Jalankan seluruh alur: Promise → Callback → Module
function runLoginFlow(username, password) {
  return authenticateAdmin(username, password)
    .then((adminUsername) => {
      console.log(`[Proses 1] Otentikasi berhasil untuk ${adminUsername}.`);
      // Promisification: Bungkus fungsi callback menjadi Promise
      return new Promise((resolve, reject) => {
        generateKeyWithCallback(adminUsername, (err, key) => {
          if (err) return reject(err);
          resolve(key);
        });
      });
    })
    .then((key) => generateReport(key)); // PROSES 3
}

// Menggunakan CommonJS (module.exports) agar bisa di-require oleh server.js
module.exports = { runLoginFlow };