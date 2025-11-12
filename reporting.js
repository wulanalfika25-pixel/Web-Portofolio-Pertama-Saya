export function generateKeyWithCallback(username, callback) {
  console.log("[Proses 2: Key Gen] Membuat key... (Callback)");

  setTimeout(() => {
    const generatedKey = `KEY-${username.toUpperCase()}-${Date.now()}`;
    console.log(`[Proses 2] Key berhasil dibuat: ${generatedKey}`);
    callback(null, generatedKey);
  }, 1500);
}

export function generateReport(key) {
  if (!key) throw new Error("Key tidak valid!");

  const earnings = (Math.random() * (15000000 - 5000000) + 5000000).toFixed(0);
  const formatted = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
  }).format(earnings);

  console.log("[Proses 3: Laporan] Laporan berhasil dibuat.");

  return {
    message: "Key validasi berhasil!",
    data: `Total penghasilan admin saat ini: <strong>${formatted}</strong>`,
  };
}
