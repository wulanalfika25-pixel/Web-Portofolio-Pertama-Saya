// app.js
// ---------------
const form = document.getElementById("loginForm");
const messageBox = document.getElementById("message");


const DEMO_USER = {
  username: "admin@gmail.com",
  password: "password123",
};

function setMessage(text, type = 'info') {
    messageBox.innerHTML = text; 
    messageBox.className = '';
    messageBox.classList.add('message', type);
}


async function verifyCredentials(data) {
    const response = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
    });

    if (!response.ok) {
        const errorResult = await response.json();
        // Melemparkan error dengan pesan dari server
        throw new Error(errorResult.message || "Login gagal. Periksa kredensial Anda.");
    }
    // Jika berhasil (status 200), kembalikan data
    return await response.json();
}

// Menghapus fungsi runReportFlow karena tidak diperlukan lagi

form.addEventListener("submit", async (event) => {
    event.preventDefault();

    // Mengubah pesan loading
    setMessage("Memverifikasi login...", 'info');

    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    try {
        // ==========================================================
        // LANGKAH 1: Lakukan otentikasi dasar
        // ==========================================================
        const result = await verifyCredentials(data);
        
        // JIKA BERHASIL (Status 200 OK)
        // Tampilkan pesan sukses saja, seperti permintaan Anda
        setMessage("Login berhasil.", 'success');

        // Catatan: Semua logika alur asinkron (Key Gen & Report) dihapus.

    } catch (error) {
        // JIKA GAGAL (Status 401 Unauthorized)
        // Tampilkan pesan kegagalan dari server ("Username atau password salah")
        setMessage(`Gagal: ${error.message}`, 'error');
    }
});