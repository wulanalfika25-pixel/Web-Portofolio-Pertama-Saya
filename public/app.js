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
    throw new Error(errorResult.message || "Login gagal. Periksa kredensial Anda.");
  }

  return await response.json();
}

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  setMessage("Memverifikasi login...", 'info');

  const formData = new FormData(form);
  const data = Object.fromEntries(formData.entries());

  try {
    const result = await verifyCredentials(data);
    setMessage("Login berhasil.", 'success');
  } catch (error) {
    setMessage(`Gagal: ${error.message}`, 'error');
  }
});
