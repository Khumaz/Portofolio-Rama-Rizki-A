// script.js

// 1. Variabel yang kita butuhkan
const targetElement = document.getElementById('efek-ketik');
const textArray = [
  "Saya Mahasiswa UPN Veteran Jawa Timur.",
  "Program Studi Informatika.",
  "Selamat datang di portofolio saya!"
]; // Daftar teks yang akan diketik

let textIndex = 0; // Indeks untuk teks saat ini di textArray
let charIndex = 0; // Indeks untuk karakter saat ini di teks
let isDeleting = false; // Status: apakah sedang menghapus?

const typingSpeed = 150; // Kecepatan mengetik
const deletingSpeed = 75; // Kecepatan menghapus (biasanya lebih cepat)
const delayAfterTyping = 1500; // Jeda setelah selesai mengetik satu kalimat

// 2. Fungsi utama
function type() {
  const currentText = textArray[textIndex];

  // Cek apakah sedang mengetik atau menghapus
  if (isDeleting) {
    // ---- MODE MENGHAPUS ----
    // Ambil sebagian teks dari awal sampai sebelum karakter terakhir
    targetElement.textContent = currentText.substring(0, charIndex - 1);
    charIndex--;

    // Jika sudah selesai menghapus
    if (charIndex === 0) {
      isDeleting = false; // Ganti mode ke mengetik
      textIndex = (textIndex + 1) % textArray.length; // Pindah ke teks berikutnya
    }
  } else {
    // ---- MODE MENGETIK ----
    // Ambil sebagian teks dari awal sampai karakter saat ini
    targetElement.textContent = currentText.substring(0, charIndex + 1);
    charIndex++;

    // Jika sudah selesai mengetik satu kalimat
    if (charIndex === currentText.length) {
      isDeleting = true; // Ganti mode ke menghapus
      // Tunggu sejenak sebelum mulai menghapus
      setTimeout(type, delayAfterTyping);
      return; // Hentikan fungsi agar tidak langsung lanjut
    }
  }

  // Tentukan kecepatan berdasarkan mode saat ini
  const speed = isDeleting ? deletingSpeed : typingSpeed;
  setTimeout(type, speed);
}

// 3. Mulai animasi saat halaman dimuat
document.addEventListener('DOMContentLoaded', type);
