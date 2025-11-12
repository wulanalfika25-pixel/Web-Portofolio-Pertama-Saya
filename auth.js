import { generateKeyWithCallback, generateReport } from "./reporting.js";

function authenticateAdmin(username, password) {
  console.log("[Proses 1: Otentikasi] Menjalankan PROMISE...");

  return new Promise((resolve, reject) => {
    fetch("/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    })
      .then((res) => {
        if (!res.ok) throw new Error("Login gagal. Periksa kredensial Anda.");
        return res.json();
      })
      .then(() => resolve(username))
      .catch((err) => reject(err));
  });
}

// Jalankan seluruh alur: Promise → Callback → Module
export function runLoginFlow(username, password) {
  return authenticateAdmin(username, password)
    .then((adminUsername) => {
      return new Promise((resolve, reject) => {
        generateKeyWithCallback(adminUsername, (err, key) => {
          if (err) return reject(err);
          resolve(key);
        });
      });
    })
    .then((key) => generateReport(key));
}
