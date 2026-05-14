"use client";

import React, { useState, useEffect, useRef } from "react";
import Typed from "typed.js";

export default function Portfolio() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeNav, setActiveNav] = useState("home");
  const [isSticky, setIsSticky] = useState(false);
  const [mainFilter, setMainFilter] = useState("web");
  const [subFilter, setSubFilter] = useState("flyer");
  // State baru untuk modal alert
  const [showModal, setShowModal] = useState(false);
  const typedElement = useRef(null);
  const srRef = useRef<any>(null);

  const sendWhatsappMessage = () => {
    const phoneNumber = "6283867706113";
    const firstName = (document.querySelector('input[placeholder="Nama Depan"]') as HTMLInputElement).value;
    const lastName = (document.querySelector('input[placeholder="Nama Belakang"]') as HTMLInputElement).value;
    const email = (document.querySelector('input[placeholder="Alamat Email"]') as HTMLInputElement).value;
    const number = (document.querySelector('input[placeholder="Nomor HP"]') as HTMLInputElement).value;
    const message = (document.querySelector('textarea[placeholder="Pesan Anda"]') as HTMLTextAreaElement).value;
    const fullName = `${firstName} ${lastName}`.trim();

    // PERBAIKAN: Mengganti alert browser dengan modal custom
    if (!fullName || !message) return setShowModal(true);

    const formattedMessage = `*Halo PusatCoding,*%0A%0ASaya ingin menanyakan perihal layanan pengembangan digital Anda. Berikut adalah detail informasi kontak saya:%0A%0A*Nama:* ${encodeURIComponent(fullName)}%0A*Email:* ${encodeURIComponent(email)}%0A*No. HP:* ${encodeURIComponent(number)}%0A%0A*Isi Pesan:* ${encodeURIComponent(message)}%0A%0ATerima kasih. Saya tunggu kabar baik dari tim Anda.`;
    window.open(`https://wa.me/${phoneNumber}?text=${formattedMessage}`, '_blank')?.focus();
  };

  // --- LOGIKA FIX SCROLLREVEAL (Surgical Reset Lengkap) ---
  useEffect(() => {
    if (srRef.current) {
      const resetElements = document.querySelectorAll(
        '.home-content, .home-content h3, .home-content h1, .home-content p, .home-image, .about-img, .about-content, .services-box, .team-card, .contact form, .heading'
      );
      
      resetElements.forEach((el: any) => {
        el.style.visibility = 'visible';
        el.style.opacity = '1';
        el.style.transform = 'none';
      });

      const timer = setTimeout(() => {
        srRef.current.sync();
        window.dispatchEvent(new Event('scroll'));
        
        srRef.current.reveal('.team-card, .contact form', { 
            origin: 'bottom',
            distance: '40px',
            duration: 1000,
            interval: 100 
        });
      }, 500); 

      return () => clearTimeout(timer);
    }
  }, [mainFilter, subFilter]);

  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > 100);
      const sections = document.querySelectorAll('section');
      sections.forEach(sec => {
        const top = window.scrollY;
        const offset = (sec as HTMLElement).offsetTop - 150;
        const height = (sec as HTMLElement).offsetHeight;
        const id = sec.getAttribute('id');
        if (top >= offset && top < offset + height) {
          setActiveNav(id || "home");
        }
      });
    };
    window.addEventListener('scroll', handleScroll);

    const typed = new Typed(typedElement.current, {
      strings: ['Frontend Developer', 'UI/UX Designers', 'Backend Developer', 'Project Manager'],
      typeSpeed: 70,
      backSpeed: 50,
      backDelay: 1000,
      loop: true
    });

    const initSR = async () => {
      const ScrollReveal = (await import('scrollreveal')).default;
      const sr = ScrollReveal({ 
          reset: false, 
          distance: '40px', 
          duration: 1000, 
          delay: 100,
          viewFactor: 0.1 
      });
      
      sr.reveal('.home-content, .heading', { origin: 'top' });
      sr.reveal('.home-image, .services-box, .team-card, .contact form', { origin: 'bottom' });
      sr.reveal('.home-content h1, .about-img', { origin: 'left' });
      sr.reveal('.home-content p, .about-content', { origin: 'right' });
      srRef.current = sr;
    };
    initSR();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      typed.destroy();
    };
  }, []);

  return (
    <>
      <header className={`header ${isSticky ? 'sticky' : ''}`}>
        <a href="#" className="logo"><span>Pusat</span>Coding</a>
        <i className={`bx ${isMenuOpen ? 'bx-x' : 'bx-menu'}`} id="menu-icon" onClick={() => setIsMenuOpen(!isMenuOpen)}></i>
        <nav className={`navbar ${isMenuOpen ? 'active' : ''}`}>
          <a href="#home" className={activeNav === 'home' ? 'active' : ''} onClick={() => setIsMenuOpen(false)}>Beranda</a>
          <a href="#about" className={activeNav === 'about' ? 'active' : ''} onClick={() => setIsMenuOpen(false)}>Tentang</a>
          <a href="#services" className={activeNav === 'services' ? 'active' : ''} onClick={() => setIsMenuOpen(false)}>Layanan</a>
          <a href="#portfolio" className={activeNav === 'portfolio' ? 'active' : ''} onClick={() => setIsMenuOpen(false)}>Portofolio</a>
          <a href="#team" className={activeNav === 'team' ? 'active' : ''} onClick={() => setIsMenuOpen(false)}>Tim</a>
          <a href="#contact" className={activeNav === 'contact' ? 'active' : ''} onClick={() => setIsMenuOpen(false)}>Kontak</a>
        </nav>
      </header>

      <section className="home" id="home">
        <div className="home-content">
          <h3>Halo, Kami</h3>
          <h1>PusatCoding</h1>
          <h3 className="hero-typing">
            Kami bergerak di bidang <span className="typed-fix"><span ref={typedElement} className="multiple-text"></span></span>
          </h3>
          <p>Kami menghadirkan solusi digital modern melalui pengembangan website, desain kreatif, dan teknologi untuk mendukung kebutuhan bisnis serta membangun identitas digital yang profesional.</p>
          <div className="social-media">
            <a href="https://github.com/pusatcoding1" target="_blank" rel="noopener noreferrer"><i className='bx bxl-github'></i></a>
            <a href="https://www.instagram.com/pusatcoding?igsh=MWwxb3F6MjVhOXNjMQ==" target="_blank" rel="noopener noreferrer"><i className='bx bxl-instagram-alt'></i></a>
            <a href="tiktok.com/@pusat.coding" target="_blank" rel="noopener noreferrer"><i className='bx bxl-tiktok'></i></a>
          </div>
          <a href="#portfolio" className="btn">Proyek Kami</a>
        </div>
        <div className="home-image">
          <img src="/logo.png" alt="Startup Logo" />
        </div>
      </section>

      <section className="about" id="about">
        <div className="about-img">
          <img src="/logo.png" alt="About Us" />
        </div>
        <div className="about-content">
          <h2 className="heading">Tentang <span>Kami</span></h2>
          <p>Kami adalah <strong>PusatCoding</strong>, tim solusi digital profesional yang berfokus pada pengembangan perangkat lunak berdampak tinggi. Kami berkomitmen mengubah ide menjadi kenyataan melalui kode yang rapi dan inovatif. Dengan keahlian dalam <strong>Frontend Development, UI/UX Design, dan Backend Systems</strong>, kami membangun produk digital responsif yang memberikan pengalaman pengguna terbaik.</p>
          <p>Dipimpin oleh <strong>Project Manager</strong> yang berdedikasi, tim kami memastikan setiap kolaborasi berjalan efisien, terstruktur, dan sesuai kebutuhan bisnis. Kami terus mengikuti perkembangan teknologi terbaru agar tetap relevan dengan tren modern. Misi kami adalah menghadirkan solusi digital yang bermanfaat, mendorong pertumbuhan, serta menjaga kualitas profesional dan kerja sama yang optimal.</p>
        </div>
      </section>

      <section className="services" id="services">
        <h2 className="heading">Layanan <span>Kami</span></h2>
        <div className="services-container">
          <div className="services-box">
            <i className='bx bx-code-alt'></i>
            <h3>Web Development</h3>
            <p>Pembuatan website profesional untuk bisnis, sekolah, instansi, dan company profile dengan fokus pada performa, keamanan, dan tampilan responsif.</p>
            <div className="promo-tag">Promo: Mulai dari IDR 200k</div>
          </div>
          <div className="services-box">
            <i className='bx bx-rocket'></i>
            <h3>Landing Page & UMKM</h3>
            <p>Pembuatan landing page modern untuk promosi produk, UMKM, dan bisnis online dengan desain menarik dan tampilan responsif.</p>
            <div className="promo-tag">Promo: Mulai dari IDR 100k</div>
          </div>
          <div className="services-box">
            <i className='bx bx-paint'></i>
            <h3>Creative Design</h3>
            <p>Layanan desain kreatif untuk poster, banner, flyer, dan kebutuhan visual lainnya dengan konsep profesional, modern, serta menarik perhatian audiens.</p>
            <div className="promo-tag">Promo: Mulai dari IDR 50k</div>
          </div>
        </div>
      </section>

      <section className="portfolio" id="portfolio">
        <h2 className="heading">Proyek <span>Kami</span></h2>
        <div className="portfolio-filter">
          <div className="filter-group-main">
            <button className={`btn-f ${mainFilter === 'web' ? 'active' : ''}`} onClick={() => setMainFilter('web')}>Web</button>
            <button className={`btn-f ${mainFilter === 'design' ? 'active' : ''}`} onClick={() => setMainFilter('design')}>Design</button>
          </div>
          
          <div className="filter-group-sub" style={{ display: mainFilter === 'design' ? 'block' : 'none' }}>
            <button className={`btn-s ${subFilter === 'flyer' ? 'active' : ''}`} onClick={() => setSubFilter('flyer')}>Feed & Flyer</button>
            <button className={`btn-s ${subFilter === 'spanduk' ? 'active' : ''}`} onClick={() => setSubFilter('spanduk')}>Banner & Card</button>
          </div>
        </div>

        <div className={`portfolio-container ${mainFilter === 'web' ? 'grid-3' : subFilter === 'spanduk' ? 'grid-2' : 'grid-5'}`}>
          {mainFilter === 'web' && (
            <>
              <div className="portfolio-box web"><img src="/project1.png" alt="E-Layanan" /><div className="portfolio-layer"><h4>E-Layanan Desa</h4><p>Website Layanan Publik Desa Tanjung Mulya dengan Fitur AI Chat 24 Jam.</p><a href="https://elayanan.gt.tc/" target="_blank"><i className='bx bx-link-external'></i></a></div></div>
              <div className="portfolio-box web"><img src="/project3.png" alt="Samuel Rental" /><div className="portfolio-layer"><h4>Samuel Rental</h4><p>Rental Kendaraan dengan Harga Terjangkau dan Pilihan Mobil Nyaman untuk Segala Perjalanan.</p><a href="https://samuel-rental.vercel.app/" target="_blank"><i className='bx bx-link-external'></i></a></div></div>
              <div className="portfolio-box web"><img src="/project4.png" alt="Bakso Mantap" /><div className="portfolio-layer"><h4>Bakso Mantap</h4><p>Kuliner Bakso dengan Resep Keluarga dan Kuah Kaldu Gurih Sejak 2018.</p><a href="https://bakso-mantap-orcin.vercel.app/" target="_blank"><i className='bx bx-link-external'></i></a></div></div>
              <div className="portfolio-box web"><img src="/project6.png" alt="AURUM" /><div className="portfolio-layer"><h4>AURUM</h4><p>Solusi Modern dengan Dedikasi Tinggi untuk Masa Depan Berkualitas dan Inovatif.</p><a href="https://company-profile-zeta-two.vercel.app/" target="_blank"><i className='bx bx-link-external'></i></a></div></div>
              <div className="portfolio-box web"><img src="/project5.png" alt="Kost 50" /><div className="portfolio-layer"><h4>Kost 50</h4><p>Hunian Kost Nyaman dan Strategis dengan Fasilitas Lengkap untuk Mahasiswa dan Pekerja.</p><a href="https://landing-page-kos.vercel.app/" target="_blank"><i className='bx bx-link-external'></i></a></div></div>
              <div className="portfolio-box web"><img src="/project2.png" alt="Sinar Global" /><div className="portfolio-layer"><h4>Sinar Global Electronics</h4><p>Toko Elektronik dengan Promo Diskon dan Pilihan Smartphone Terbaru.</p><a href="https://SinarGlobal.wuaze.com" target="_blank"><i className='bx bx-link-external'></i></a></div></div>
            </>
          )}

          {mainFilter === 'design' && subFilter === 'flyer' && (
            <>
              <div className="portfolio-box design flyer"><img src="/feed1.png" alt="Design Feed" /></div>
              <div className="portfolio-box design flyer"><img src="/feed2.png" alt="Design Feed" /></div>
              <div className="portfolio-box design flyer"><img src="/feed3.png" alt="Design Feed" /></div>
              <div className="portfolio-box design flyer"><img src="/feed4.png" alt="Design Feed" /></div>
              <div className="portfolio-box design flyer"><img src="/feed5.png" alt="Design Feed" /></div>
              <div className="portfolio-box design flyer"><img src="/feed6.png" alt="Design Feed" /></div>
              <div className="portfolio-box design flyer"><img src="/feed7.png" alt="Design Feed" /></div>
              <div className="portfolio-box design flyer"><img src="/feed8.png" alt="Design Feed" /></div>
              <div className="portfolio-box design flyer"><img src="/feed9.png" alt="Design Feed" /></div>
              <div className="portfolio-box design flyer"><img src="/feed10.png" alt="Design Feed" /></div>
            </>
          )}

          {mainFilter === 'design' && subFilter === 'spanduk' && (
            <>
              <div className="portfolio-box design spanduk"><img src="/banner1.png" alt="Design Banner" /></div>
              <div className="portfolio-box design spanduk"><img src="/banner2.png" alt="Design Banner 2" /></div>
              <div className="portfolio-box design spanduk"><img src="/idcard1.png" alt="Design ID Card" /></div>
              <div className="portfolio-box design spanduk"><img src="/idcard2.png" alt="Design ID Card" /></div>
            </>
          )}
        </div>
      </section>

      <section className="team" id="team">
        <h2 className="heading">Tim <span>Kami</span></h2>
        <div className="team-container">
          <div className="team-card">
            <div className="team-img-box"><img src="/advent.png" alt="Adventsen Panjaitan" /></div>
            <div className="team-info">
              <h3>Adventsen Panjaitan</h3>
              <p className="role">Frontend Developer</p>
              <div className="team-social">
                <a href="https://github.com/advent33" target="_blank" rel="noopener noreferrer"><i className='bx bxl-github'></i></a>
                <a href="https://www.tiktok.com/@adventsen?_r=1&_t=ZS-928QNNLhyYG" target="_blank" rel="noopener noreferrer"><i className='bx bxl-tiktok'></i></a>
                <a href="https://www.instagram.com/adventpjtn?igsh=MW9lNTU0emVhMHh3NA==" target="_blank" rel="noopener noreferrer"><i className='bx bxl-instagram'></i></a>
                <a href="https://www.linkedin.com/in/adventsen-panjaitan-422472383?utm_source=share_via&utm_content=profile&utm_medium=member_android" target="_blank" rel="noopener noreferrer"><i className='bx bxl-linkedin'></i></a>
              </div>
            </div>
          </div>

          <div className="team-card">
            <div className="team-img-box"><img src="/azzahra.png" alt="Azzahra Safitri" /></div>
            <div className="team-info">
              <h3>Azzahra Safitri</h3>
              <p className="role">UI/UX Designers</p>
              <div className="team-social">
                <a href="https://github.com/azhrasftri" target="_blank" rel="noopener noreferrer"><i className='bx bxl-github'></i></a>
                <a href="https://www.instagram.com/azrasftri" target="_blank" rel="noopener noreferrer"><i className='bx bxl-instagram'></i></a>
              </div>
            </div>
          </div>

          <div className="team-card">
            <div className="team-img-box"><img src="/dian.png" alt="Dian Arya Pratama" /></div>
            <div className="team-info">
              <h3>Dian Arya Pratama</h3>
              <p className="role">Backend Developer</p>
              <div className="team-social">
                <a href="https://github.com/dianaryapratama" target="_blank" rel="noopener noreferrer"><i className='bx bxl-github'></i></a>
                <a href="https://www.tiktok.com/@dianaryapratama?is_from_webapp=1&sender_device=pc" target="_blank" rel="noopener noreferrer"><i className='bx bxl-tiktok'></i></a>
                <a href="https://www.instagram.com/dianaryapratama_/" target="_blank" rel="noopener noreferrer"><i className='bx bxl-instagram'></i></a>
                <a href="https://www.linkedin.com/in/dian-arya-pratama-7072b1383/" target="_blank" rel="noopener noreferrer"><i className='bx bxl-linkedin'></i></a>
              </div>
            </div>
          </div>

          <div className="team-card">
            <div className="team-img-box"><img src="/fuad.png" alt="Fuad Maulana" /></div>
            <div className="team-info">
              <h3>Fuad Maulana</h3>
              <p className="role">Project Manager</p>
              <div className="team-social">
                <a href="https://github.com/Fuadmau" target="_blank" rel="noopener noreferrer"><i className='bx bxl-github'></i></a>
                <a href="https://www.tiktok.com/@eboyyy___?_r=1&_t=ZS-961dfF1jhBt" target="_blank" rel="noopener noreferrer"><i className='bx bxl-tiktok'></i></a>
                <a href="https://www.instagram.com/fuadmln12?igsh=MTE3cXN6ajVmN2F1eQ==" target="_blank" rel="noopener noreferrer"><i className='bx bxl-instagram'></i></a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="contact" id="contact">
        <h2 className="heading">Hubungi <span>Kami!</span></h2>
        <form>
          <div className="input-box">
            <input type="text" placeholder="Nama Depan" />
            <input type="text" placeholder="Nama Belakang" />
          </div>
          <div className="input-box">
            <input type="email" placeholder="Alamat Email" />
            <input type="number" placeholder="Nomor HP" />
          </div>
          <textarea cols={30} rows={10} placeholder="Pesan Anda"></textarea>
          <input type="button" value="Kirim Pesan" className="btn" onClick={sendWhatsappMessage} />
        </form>
      </section>

      <footer className="footer">
        <div className="footer-text"><p>Copyright © 2026 by PusatCoding | All Rights Reserved.</p></div>
        <div className="footer-iconTop"><a href="#home"><i className='bx bx-up-arrow-alt'></i></a></div>
      </footer>

      {/* --- MODAL CUSTOM ALERT (BARU) --- */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal-box">
            <i className='bx bxs-error-circle'></i>
            <h2>Pemberitahuan</h2>
            <p>Mohon isi nama dan pesan Anda terlebih dahulu.</p>
            <button className="btn" onClick={() => setShowModal(false)}>Mengerti</button>
          </div>
        </div>
      )}
    </>
  );
}
