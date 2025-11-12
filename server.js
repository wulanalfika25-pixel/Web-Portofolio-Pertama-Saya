// server.js
// ---------------
const express = require("express");
const path = require("path");

// 1. IMPORT MODUL AUTH (Sekarang seharusnya bisa ditemukan karena auth.js sejajar dengan server.js)
const { runLoginFlow } = require("./auth"); 

const app = express();
// Menggunakan Port 5000 untuk menghindari konflik 'EADDRINUSE'
const PORT = process.env.PORT || 5000; 

// Middleware
app.use(express.json());

// Arahkan folder public (untuk index.html, app.js, dll)
// Middleware ini melayani file statis seperti CSS/JS
app.use(express.static(path.join(__dirname, "public")));

// =========================================================
// BARIS PENTING: MENGATASI "Cannot GET /"
// =========================================================
// Ini secara eksplisit mengirimkan index.html ketika user mengakses root URL (/)
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});


// Data login demo
const DEMO_USER = {
  username: "admin@gmail.com",
  password: "password123",
};

// Endpoint API login (PROSES 1 - Digunakan oleh auth.js)
// Endpoint ini HANYA untuk validasi kredensial dari frontend
app.post("/api/login", (req, res) => {
  const { username, password } = req.body || {};

  if (username === DEMO_USER.username && password === DEMO_USER.password) {
    // Jika berhasil login, kita kirim status 200 OK.
    return res.json({ message: "Otentikasi berhasil" });
  } else {
    // Kirim 401 Unauthorized jika gagal
    return res.status(401).json({ message: "Username atau password salah" });
  }
});

// ENDPOINT BARU UNTUK MENGAMBIL LAPORAN
// Endpoint ini menjalankan keseluruhan alur asinkron (Promise -> Callback -> Module)
app.post("/api/report", async (req, res) => {
  const { username, password } = req.body;
    
    // Validasi dasar
    if (!username || !password) {
        return res.status(400).json({ success: false, message: "Kredensial wajib diisi." });
    }

  try {
    // Jalankan alur asinkron penuh (di dalam runLoginFlow: Auth -> KeyGen -> Report)
    const report = await runLoginFlow(username, password);

    res.json({ 
      success: true, 
      message: report.message,
      data: report.data
    });

  } catch (error) {
    // Tangani error dari Promise atau Callback (misalnya login gagal atau key tidak valid)
    console.error("Login Flow Error:", error.message);
    res.status(401).json({ 
      success: false, 
      message: error.message || "Gagal dalam menjalankan alur." 
    });
  }
});

// Jalankan server
app.listen(PORT, () => {
  console.log(`Server berjalan di http://localhost:${PORT}`);
});