document.addEventListener('DOMContentLoaded', function() {

// light mode dark mode
  const toggleSwitch = document.querySelector('.theme-switch input[type="checkbox"]');
  const bodyElement = document.body;

  const currentTheme = localStorage.getItem('theme');

  if (currentTheme === 'dark') {
    bodyElement.classList.add('dark-mode');
    if (toggleSwitch) {
      toggleSwitch.checked = true; 
    }
  }

  if (toggleSwitch) {
    toggleSwitch.addEventListener('change', function(e) {
      if (e.target.checked) {
        bodyElement.classList.add('dark-mode');
        localStorage.setItem('theme', 'dark'); 
      } else {
        bodyElement.classList.remove('dark-mode');
        localStorage.setItem('theme', 'light'); 
      }
    });
  }

//   navbar
  const navbar = document.querySelector('.custom-navbar');
  
  if (navbar) {
    window.addEventListener('scroll', function() {
      if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    });
  }

//   slider
  const eventsSlider = document.getElementById('events-slider');
  const prevEventBtn = document.getElementById('prev-event-btn');
  const nextEventBtn = document.getElementById('next-event-btn');
  const scrollAmount = 312; 

  if (eventsSlider) {
    if (nextEventBtn) {
      nextEventBtn.addEventListener('click', function() {
        eventsSlider.scrollBy({ left: scrollAmount, behavior: 'smooth' });
      });
    }
    if (prevEventBtn) {
      prevEventBtn.addEventListener('click', function() {
        eventsSlider.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
      });
    }
  }
  
//   scoreboard
  const counters = document.querySelectorAll('.counter');
  const statsSection = document.querySelector('.impact-stats-section');

  if (counters.length > 0 && statsSection) {
    const speed = 150; 
    const animateCounters = () => {
      counters.forEach(counter => {
        const updateCount = () => {
          const target = +counter.getAttribute('data-target');
          const count = +counter.innerText.replace(/\./g, ''); 
          const inc = target / speed;

          if (count < target) {
            counter.innerText = Math.ceil(count + inc);
            setTimeout(updateCount, 15);
          } else {
            counter.innerText = target.toLocaleString('id-ID'); 
          }
        };
        updateCount();
      });
    };

    const observer = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateCounters();
          observer.unobserve(entry.target); 
        }
      });
    }, { threshold: 0.5 });

    observer.observe(statsSection);
  }

//   form pendaftaran relawan
  const form = document.getElementById('formRelawan');
  
  if (form) {
    const inputs = {
      nama: document.getElementById('inputNama'),
      email: document.getElementById('inputEmail'),
      nohp: document.getElementById('inputNohp'),
      provinsi: document.getElementById('inputProvinsi'),
      kota: document.getElementById('inputKota'),
      kegiatan: document.getElementById('inputKegiatan'),
      pesan: document.getElementById('inputPesan')
    };

    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const regexHp = /^[0-9]{10,13}$/;

    const showError = (inputElement) => {
      if (!inputElement) return; 
      inputElement.classList.add('input-error');
      const errorMsg = document.getElementById(`error-${inputElement.id}`);
      if (errorMsg) errorMsg.classList.remove('d-none');
    };

    const hideError = (inputElement) => {
      if (!inputElement) return;
      inputElement.classList.remove('input-error');
      const errorMsg = document.getElementById(`error-${inputElement.id}`);
      if (errorMsg) errorMsg.classList.add('d-none');
    };

    if (inputs.provinsi) {
      fetch('https://ibnux.github.io/data-indonesia/provinsi.json')
        .then(response => response.json())
        .then(provinces => {
          provinces.forEach(prov => {
            const option = document.createElement('option');
            option.value = prov.id;
            option.textContent = prov.nama; 
            inputs.provinsi.appendChild(option);
          });
        })
        .catch(error => console.error('Error fetching provinces:', error));

      inputs.provinsi.addEventListener('change', (e) => {
        hideError(inputs.provinsi);
        if (!inputs.kota) return; 

        inputs.kota.innerHTML = '<option value="" selected disabled>Loading Kota/Kabupaten...</option>';
        inputs.kota.disabled = true;
        
        const provId = e.target.value;
        if (provId) {
          fetch(`https://ibnux.github.io/data-indonesia/kabupaten/${provId}.json`)
            .then(response => response.json())
            .then(regencies => {
              inputs.kota.innerHTML = '<option value="" selected disabled>Pilih Kota/Kabupaten...</option>';
              regencies.forEach(reg => {
                const option = document.createElement('option');
                option.value = reg.nama; 
                option.textContent = reg.nama;
                inputs.kota.appendChild(option);
              });
              inputs.kota.disabled = false;
            })
            .catch(error => console.error('Error fetching regencies:', error));
        }
      });
    }

    // live validasi
    inputs.nama?.addEventListener('input', () => { inputs.nama.value.trim() !== '' ? hideError(inputs.nama) : showError(inputs.nama); });
    inputs.email?.addEventListener('input', () => { regexEmail.test(inputs.email.value.trim()) ? hideError(inputs.email) : showError(inputs.email); });
    inputs.nohp?.addEventListener('input', () => { regexHp.test(inputs.nohp.value.trim()) ? hideError(inputs.nohp) : showError(inputs.nohp); });
    inputs.kota?.addEventListener('change', () => { inputs.kota.value !== '' ? hideError(inputs.kota) : showError(inputs.kota); });
    inputs.kegiatan?.addEventListener('change', () => { inputs.kegiatan.value !== '' ? hideError(inputs.kegiatan) : showError(inputs.kegiatan); });
    inputs.pesan?.addEventListener('input', () => { inputs.pesan.value.trim() !== '' ? hideError(inputs.pesan) : showError(inputs.pesan); });

    // submit form
    form.addEventListener('submit', function(e) {
      e.preventDefault();
      let isValid = true;

      if (inputs.nama && inputs.nama.value.trim() === '') { showError(inputs.nama); isValid = false; }
      if (inputs.email && !regexEmail.test(inputs.email.value.trim())) { showError(inputs.email); isValid = false; }
      if (inputs.nohp && !regexHp.test(inputs.nohp.value.trim())) { showError(inputs.nohp); isValid = false; }
      if (inputs.provinsi && inputs.provinsi.value === '') { showError(inputs.provinsi); isValid = false; }
      if (inputs.kota && inputs.kota.value === '') { showError(inputs.kota); isValid = false; }
      if (inputs.kegiatan && inputs.kegiatan.value === '') { showError(inputs.kegiatan); isValid = false; }
      if (inputs.pesan && inputs.pesan.value.trim() === '') { showError(inputs.pesan); isValid = false; }

      if (isValid) {
        Swal.fire({
          title: 'Pendaftaran Berhasil!',
          text: 'Terima kasih telah mendaftar. Kami akan menghubungi Anda segera melalui WhatsApp atau Email.',
          icon: 'success',
          confirmButtonText: 'Kembali ke Beranda',
          confirmButtonColor: '#0D6EFD',
          background: document.body.classList.contains('dark-mode') ? '#1E1E1E' : '#ffffff',
          color: document.body.classList.contains('dark-mode') ? '#E9ECEF' : '#212529',
          allowOutsideClick: false
        }).then((result) => {
          if (result.isConfirmed) {
            window.location.href = 'index.html';
          }
        });
      } else {
        Swal.fire({
          title: 'Data Belum Lengkap!',
          text: 'Mohon periksa kembali kolom pendaftaran yang berwarna merah.',
          icon: 'error',
          confirmButtonText: 'Perbaiki Data',
          confirmButtonColor: '#dc3545',
          background: document.body.classList.contains('dark-mode') ? '#1E1E1E' : '#ffffff',
          color: document.body.classList.contains('dark-mode') ? '#E9ECEF' : '#212529'
        });
      }
    });
  }
  
//   donate
  const formDonasi = document.getElementById('formDonasi');
  
  if (formDonasi) {
    const formatRupiah = (angka) => {
      return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(angka);
    };

    formDonasi.addEventListener('submit', function(e) {
      e.preventDefault();
      
      let namaInput = document.getElementById('namaDonatur').value.trim();
      let nominalInput = parseInt(document.getElementById('nominalDonasi').value);
      let pesanInput = document.getElementById('pesanDonasi').value.trim();
      
    // nama kosong, default hamba allah
      if (namaInput === '') {
        namaInput = 'Hamba Allah';
      }
      
      let inisial = namaInput.charAt(0).toUpperCase();

      let modalElement = document.getElementById('modalDonasi');
      let modalInstance = bootstrap.Modal.getInstance(modalElement);
      modalInstance.hide();

      Swal.fire({
        title: 'Donasi Berhasil!',
        text: `Terima kasih orang baik! Donasi sebesar ${formatRupiah(nominalInput)} telah diterima.`,
        icon: 'success',
        confirmButtonColor: '#0D6EFD',
        background: document.body.classList.contains('dark-mode') ? '#1E1E1E' : '#ffffff',
        color: document.body.classList.contains('dark-mode') ? '#E9ECEF' : '#212529'
      }).then(() => {
        let totalDonasiElement = document.getElementById('totalDonasi');
        let currentTotal = parseInt(totalDonasiElement.getAttribute('data-total'));
        let newTotal = currentTotal + nominalInput;
        
        totalDonasiElement.setAttribute('data-total', newTotal);
        totalDonasiElement.innerHTML = formatRupiah(newTotal).replace(',00', ''); 

        let listDonatur = document.getElementById('listDonatur');
        
        let newDonorHTML = `
          <div class="donor-item d-flex align-items-center p-3 p-md-4 mb-3 rounded-4 shadow-sm" style="animation: fadeIn 0.5s;">
            <div class="donor-avatar rounded-circle bg-primary text-white d-flex justify-content-center align-items-center fw-bold fs-4 me-3 me-md-4 flex-shrink-0">
              ${inisial}
            </div>
            <div class="flex-grow-1">
              <div class="d-flex justify-content-between align-items-center mb-1">
                <h6 class="fw-bold mb-0">${namaInput}</h6>
                <span class="fw-bold text-brand">${formatRupiah(nominalInput).replace(',00', '')}</span>
              </div>
              <small class="text-success fw-medium d-block mb-1">Baru saja masuk!</small>
              <p class="mb-0 fst-italic small opacity-75">"${pesanInput}"</p>
            </div>
          </div>
        `;
        
        listDonatur.insertAdjacentHTML('afterbegin', newDonorHTML);
        
        formDonasi.reset();
      });
    });
  }
  
//   form kontak
  const formKontak = document.getElementById('formKontak');

  if (formKontak) {
    const kontakInputs = {
      nama: document.getElementById('kontakNama'),
      email: document.getElementById('kontakEmail'),
      subjek: document.getElementById('kontakSubjek'),
      pesan: document.getElementById('kontakPesan')
    };

    const regexEmailKontak = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // show error
    const showKontakError = (inputElement) => {
      if (!inputElement) return;
      inputElement.classList.add('input-error');
      const errorMsg = document.getElementById(`error-${inputElement.id}`);
      if (errorMsg) errorMsg.classList.remove('d-none');
    };

    const hideKontakError = (inputElement) => {
      if (!inputElement) return;
      inputElement.classList.remove('input-error');
      const errorMsg = document.getElementById(`error-${inputElement.id}`);
      if (errorMsg) errorMsg.classList.add('d-none');
    };

    // live validation
    kontakInputs.nama?.addEventListener('input', () => { kontakInputs.nama.value.trim() !== '' ? hideKontakError(kontakInputs.nama) : showKontakError(kontakInputs.nama); });
    kontakInputs.email?.addEventListener('input', () => { regexEmailKontak.test(kontakInputs.email.value.trim()) ? hideKontakError(kontakInputs.email) : showKontakError(kontakInputs.email); });
    kontakInputs.subjek?.addEventListener('input', () => { kontakInputs.subjek.value.trim() !== '' ? hideKontakError(kontakInputs.subjek) : showKontakError(kontakInputs.subjek); });
    kontakInputs.pesan?.addEventListener('input', () => { kontakInputs.pesan.value.trim() !== '' ? hideKontakError(kontakInputs.pesan) : showKontakError(kontakInputs.pesan); });

    formKontak.addEventListener('submit', function(e) {
      e.preventDefault();
      let isKontakValid = true;

      if (kontakInputs.nama && kontakInputs.nama.value.trim() === '') { showKontakError(kontakInputs.nama); isKontakValid = false; }
      if (kontakInputs.email && !regexEmailKontak.test(kontakInputs.email.value.trim())) { showKontakError(kontakInputs.email); isKontakValid = false; }
      if (kontakInputs.subjek && kontakInputs.subjek.value.trim() === '') { showKontakError(kontakInputs.subjek); isKontakValid = false; }
      if (kontakInputs.pesan && kontakInputs.pesan.value.trim() === '') { showKontakError(kontakInputs.pesan); isKontakValid = false; }

      if (isKontakValid) {
        Swal.fire({
          title: 'Pesan Terkirim!',
          text: 'Terima kasih telah menghubungi kami. Tim Pandawara akan segera membalas pesan Anda.',
          icon: 'success',
          confirmButtonColor: '#0D6EFD',
          background: document.body.classList.contains('dark-mode') ? '#1E1E1E' : '#ffffff',
          color: document.body.classList.contains('dark-mode') ? '#E9ECEF' : '#212529'
        }).then(() => {
          formKontak.reset(); 
        });
      } else {
        Swal.fire({
          title: 'Pesan Gagal Dikirim!',
          text: 'Mohon periksa dan lengkapi kolom yang berwarna merah.',
          icon: 'error',
          confirmButtonColor: '#dc3545',
          background: document.body.classList.contains('dark-mode') ? '#1E1E1E' : '#ffffff',
          color: document.body.classList.contains('dark-mode') ? '#E9ECEF' : '#212529'
        });
      }
    });
  }
});