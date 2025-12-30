const settingsBtn = document.getElementById('settings-btn');
const settingsPopup = document.getElementById('settings-popup');
const closePopup = document.getElementById('close-popup');
const themeSelect = document.getElementById('theme-select');

// 1. Fungsi Buka/Tutup Popup
settingsBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    settingsPopup.classList.toggle('show');
});

closePopup.addEventListener('click', () => {
    settingsPopup.classList.remove('show');
});

// Menutup popup jika klik di luar area popup
document.addEventListener('click', (e) => {
    if (!settingsPopup.contains(e.target) && e.target !== settingsBtn) {
        settingsPopup.classList.remove('show');
    }
});

// 2. Logika Dropdown Tema (DIUBAH KE documentElement)
themeSelect.addEventListener('change', (e) => {
    const selectedTheme = e.target.value;
    
    if (selectedTheme === 'dark') {
        document.documentElement.classList.add('dark-mode'); // Target html
        localStorage.setItem('theme', 'dark');
    } else {
        document.documentElement.classList.remove('dark-mode'); // Target html
        localStorage.setItem('theme', 'light');
    }
});

// 3. Cek Simpanan Tema saat Halaman Dimuat (DIUBAH KE documentElement)
window.addEventListener('load', () => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.documentElement.classList.add('dark-mode'); // Target html
        themeSelect.value = 'dark';
    } else {
        themeSelect.value = 'light';
    }
    
    // Aktifkan transisi setelah tema terpasang agar tidak flash saat load
    document.body.classList.add('preload-transitions');
});

let currentIndex = 0;

function openPost(){
    document.getElementById("ovrPost").style.display = "flex";
}
function closePost(){
    document.getElementById("ovrPost").style.display = "none";
}
function openStat(){
    document.getElementById("ovrStat").style.display = "flex";
}
function closeStat(){
    document.getElementById("ovrStat").style.display = "none";
    window.location.href='activity.html'
}

function openModal() {
  document.getElementById("overlay").style.display = "flex";
  currentIndex = 0;
  direction = 0;
  updateUI();
  updateButtonVisibility();
}

function upModal(){
    document.getElementById("success").style.display="flex";
    document.getElementById("overlay").style.display = "none";
}

function noupModal(){
    document.getElementById("success").style.display="none";
}

function closeModal() {
  document.getElementById("overlay").style.display = "none";
  currentIndex = 0;
  direction = 0;
  updateUI();
}

function updateButtonVisibility() {
  const backBtn = document.getElementById('back');
  const nextBtn = document.getElementById('next');
  const upBtn = document.getElementById('upload');
  if (currentIndex === 0) {
        backBtn.style.visibility = 'hidden';
        nextBtn.style.display="flex"
        upBtn.style.display="none"; 

  } else if (currentIndex === 2) {
        upBtn.style.display="flex";
        nextBtn.style.display="none"
  } else{
        backBtn.style.visibility = 'visible';
        nextBtn.style.display="flex"
        upBtn.style.display="none";
  }
}

function updateUI() {
  const track = document.querySelector('.slider-track');
  track.style.transform = 'translateX(0%)';
}

function moveSlide(direction) {
  const track = document.querySelector('.slider-track');
  const slides = document.querySelectorAll('.slide');
  const totalSlides = slides.length;

  currentIndex += direction;
  // Loop kembali ke awal jika sudah di ujung
  if (currentIndex >= totalSlides) {
    currentIndex = 0;
    
  } else if (currentIndex < 0) {
    currentIndex = totalSlides - 1;
  }

  updateButtonVisibility();

  // Geser track berdasarkan index
  const offset = -currentIndex * 100;
  track.style.transform = `translateX(${offset}%)`;
}

document.addEventListener('DOMContentLoaded', () => {
    // Mengambil elemen yang dibutuhkan
    const bookmarkTrigger = document.getElementById('bookmarkTrigger');
    const bookmarkIcon = document.getElementById('bookmarkIcon');
    const bookmarkCount = document.getElementById('bookmarkCount');

    // State awal (apakah sudah dibookmark atau belum)
    let isBookmarked = false;

    bookmarkTrigger.addEventListener('click', () => {
        // Toggle state
        isBookmarked = !isBookmarked;

        if (isBookmarked) {
            // Aksi: Bookmark Aktif
            
            // 1. Ubah class wrapper agar warna teks/icon jadi kuning (via CSS)
            bookmarkTrigger.classList.add('active');

            // 2. Ubah icon font-awesome dari regular (garis) ke solid (isi penuh)
            bookmarkIcon.classList.remove('fa-regular');
            bookmarkIcon.classList.add('fa-solid');

            // 3. Tambah angka
            let currentCount = parseInt(bookmarkCount.innerText);
            bookmarkCount.innerText = currentCount + 1;

        } else {
            // Aksi: Bookmark Non-aktif (opsional, jika ingin bisa di-unclick)
            
            // 1. Hapus class active
            bookmarkTrigger.classList.remove('active');

            // 2. Kembalikan icon ke regular
            bookmarkIcon.classList.remove('fa-solid');
            bookmarkIcon.classList.add('fa-regular');

            // 3. Kurangi angka kembali
            let currentCount = parseInt(bookmarkCount.innerText);
            // Mencegah angka negatif
            if(currentCount > 0) {
                bookmarkCount.innerText = currentCount - 1;
            }
        }
    });
});

document.addEventListener("DOMContentLoaded", () => {
    const charts = document.querySelectorAll('.pie-chart');

    charts.forEach(chart => {
        // Ambil target persentase dari style inline
        const targetValue = chart.style.getPropertyValue('--p');
        let startValue = 0;
        const duration = 1500; // 1.5 detik
        const stepTime = Math.abs(Math.floor(duration / targetValue));

        // Animasi angka dan lingkaran
        const timer = setInterval(() => {
            startValue++;
            chart.style.setProperty('--p', startValue);
            
            // Jika diagram memiliki angka di dalamnya, update juga teksnya (opsional)
            // chart.querySelector('.main-number').innerText = startValue;

            if (startValue >= targetValue) {
                clearInterval(timer);
            }
        }, stepTime);
    });
});