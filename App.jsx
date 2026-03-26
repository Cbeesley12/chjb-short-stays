import { useState, useEffect, useRef } from "react";

// ──────────────────────────────────────────
// CHJB Short Stays Ltd — Doncaster
// Change BOOKING_URL to your Uplisting direct booking link
// ──────────────────────────────────────────
// ─── UPDATE THESE ───
const BOOKING_URL = "https://direct.uplisting.io/YOUR-ID-HERE";
const WHATSAPP = "https://wa.me/44XXXXXXXXXXX?text=Hi%2C%20I'd%20like%20to%20enquire%20about%20availability.";
const EMAIL = "info@chjbshortstays.co.uk";
const PHONE = "+44 1302 000000";

const LOGO_SRC = "data:image/png;base64,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";

// ──────────────────────────────────────────────────────────────
// HOW TO EDIT PROPERTIES:
//
// Each property needs: id, name, tagline, description, price,
// features (array), and images (array of URLs).
//
// To ADD a property: copy one of the blocks below and paste
// it after the last one. Give it the next id number.
//
// To CHANGE photos: replace the URLs in the images array.
// Host your photos anywhere (Imgur, Google Drive public link,
// your own website) and paste the direct image URL.
//
// To REMOVE a property: delete the entire { ... } block
// including the trailing comma.
// ──────────────────────────────────────────────────────────────
const PROPERTIES = [
  {
    id: 1,
    name: "The Hallgate Apartment",
    tagline: "Town centre · Sleeps 4 · Free parking",
    description: "Modern 2-bed apartment in the heart of Doncaster, walking distance to the Frenchgate Centre and train station.",
    price: "From £89/night",
    features: ["2 Bedrooms", "Free Wi-Fi", "Smart TV", "Parking"],
    images: [
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&q=80",
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&q=80",
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&q=80",
    ],
  },
  {
    id: 2,
    name: "The Bennetthorpe Suite",
    tagline: "Racecourse area · Sleeps 2 · Workspace",
    description: "Stylish 1-bed near Doncaster Racecourse, perfect for contractors, business stays, and race-day visits.",
    price: "From £75/night",
    features: ["1 Bedroom", "Workspace", "Kitchen", "Parking"],
    images: [
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&q=80",
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&q=80",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80",
    ],
  },
  {
    id: 3,
    name: "The Thorne Road Retreat",
    tagline: "Quiet location · Sleeps 6 · Family-friendly",
    description: "Spacious 3-bed house ideal for families, relocations, or longer contractor stays. Garden and driveway parking.",
    price: "From £110/night",
    features: ["3 Bedrooms", "Garden", "Washer", "Driveway"],
    images: [
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&q=80",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80",
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&q=80",
    ],
  },
  // ── ADD MORE PROPERTIES BELOW ──
  // {
  //   id: 4,
  //   name: "Your New Property",
  //   tagline: "Area · Sleeps X · Key feature",
  //   description: "Describe it here.",
  //   price: "From £XX/night",
  //   features: ["X Bedrooms", "Feature", "Feature"],
  //   images: [
  //     "https://your-image-url-1.jpg",
  //     "https://your-image-url-2.jpg",
  //   ],
  // },
];

const USPS = [
  {
    icon: "£",
    title: "Book Direct & Save",
    text: "Save up to 15% vs Airbnb/Booking.com. No platform fees, best rate guaranteed.",
  },
  {
    icon: "✦",
    title: "Hotel-Quality Standards",
    text: "Professional cleaning, fresh linens, fully equipped kitchens, and fast Wi-Fi in every property.",
  },
  {
    icon: "⟳",
    title: "Flexible Stays",
    text: "From 2 nights to 12 months. Weekly and monthly discounts for longer bookings.",
  },
  {
    icon: "◉",
    title: "Local & Responsive",
    text: "Doncaster-based team. Fast support, smooth check-in, problems solved quickly.",
  },
];

const AUDIENCES = [
  "Contractors & Trades",
  "Business Travellers",
  "Families & Relocations",
  "Race-Day Visitors",
  "Insurance & Emergency Stays",
  "Holiday Breaks",
];

function useInView(threshold = 0.15) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return [ref, visible];
}

function FadeIn({ children, delay = 0, className = "" }) {
  const [ref, visible] = useInView();
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(28px)",
        transition: `opacity 0.7s ease ${delay}s, transform 0.7s ease ${delay}s`,
      }}
    >
      {children}
    </div>
  );
}

function Carousel({ images, alt }) {
  const [current, setCurrent] = useState(0);
  const len = images.length;

  useEffect(() => {
    if (len <= 1) return;
    const timer = setInterval(() => {
      setCurrent((c) => (c + 1) % len);
    }, 4000);
    return () => clearInterval(timer);
  }, [len]);

  const go = (dir) => {
    setCurrent((c) => (c + dir + len) % len);
  };

  return (
    <div className="carousel">
      <div className="carousel-track" style={{ transform: `translateX(-${current * 100}%)` }}>
        {images.map((src, i) => (
          <img key={i} src={src} alt={`${alt} ${i + 1}`} className="carousel-img" />
        ))}
      </div>
      {len > 1 && (
        <>
          <button className="carousel-btn carousel-prev" onClick={() => go(-1)} aria-label="Previous">‹</button>
          <button className="carousel-btn carousel-next" onClick={() => go(1)} aria-label="Next">›</button>
          <div className="carousel-dots">
            {images.map((_, i) => (
              <button
                key={i}
                className={`carousel-dot ${i === current ? "active" : ""}`}
                onClick={() => setCurrent(i)}
                aria-label={`Image ${i + 1}`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default function ChjbSite() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showPopup, setShowPopup] = useState(true);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div style={{ fontFamily: "'DM Sans', sans-serif", color: "#1a1a1a", background: "#faf9f7" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,wght@0,400;0,500;0,600;0,700&family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;1,400&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        :root {
          --charcoal: #1a1a1a;
          --warm: #c8a45c;
          --warm-light: #f5ead0;
          --cream: #faf9f7;
          --slate: #3d3d3d;
          --muted: #7a7a7a;
          --border: #e5e2dd;
        }

        html { scroll-behavior: smooth; }

        .nav {
          position: fixed; top: 0; left: 0; right: 0; z-index: 100;
          padding: 12px 32px;
          display: flex; align-items: center; justify-content: space-between;
          background: rgba(26,26,26,0.95);
          backdrop-filter: blur(12px);
          box-shadow: 0 2px 24px rgba(0,0,0,0.12);
          transition: all 0.35s ease;
        }
        .nav.scrolled {
          padding: 10px 32px;
        }
        .nav-logo {
          display: flex; align-items: center;
          text-decoration: none;
        }
        .nav-logo img {
          height: 48px; width: auto; border-radius: 6px;
          transition: height 0.35s ease;
        }
        .nav.scrolled .nav-logo img { height: 40px; }
        .nav-links { display: flex; gap: 28px; align-items: center; }
        .nav-links a {
          color: rgba(255,255,255,0.85); text-decoration: none;
          font-size: 14px; font-weight: 500; letter-spacing: 0.3px;
          transition: color 0.2s;
        }
        .nav-links a:hover { color: var(--warm); }
        .nav-cta {
          background: var(--warm); color: var(--charcoal) !important;
          padding: 10px 22px; border-radius: 6px;
          font-weight: 600 !important; letter-spacing: 0.5px;
          transition: transform 0.2s, box-shadow 0.2s !important;
        }
        .nav-cta:hover {
          transform: translateY(-1px);
          box-shadow: 0 4px 16px rgba(200,164,92,0.35);
        }

        .burger {
          display: none; background: none; border: none; cursor: pointer;
          flex-direction: column; gap: 5px; padding: 4px;
        }
        .burger span {
          display: block; width: 24px; height: 2px; background: #fff;
          transition: all 0.3s ease; border-radius: 2px;
        }
        .burger.open span:nth-child(1) { transform: rotate(45deg) translate(5px, 5px); }
        .burger.open span:nth-child(2) { opacity: 0; }
        .burger.open span:nth-child(3) { transform: rotate(-45deg) translate(5px, -5px); }

        .mobile-menu {
          position: fixed; top: 0; left: 0; right: 0; bottom: 0;
          background: rgba(26,26,26,0.97); backdrop-filter: blur(20px);
          z-index: 99; display: flex; flex-direction: column;
          align-items: center; justify-content: center; gap: 28px;
          opacity: 0; pointer-events: none; transition: opacity 0.3s;
        }
        .mobile-menu.open { opacity: 1; pointer-events: all; }
        .mobile-menu a {
          color: #fff; text-decoration: none; font-size: 20px;
          font-weight: 500; letter-spacing: 0.5px;
        }

        .hero {
          padding: 120px 32px 72px; position: relative;
          background: var(--cream); overflow: hidden;
        }
        .hero-inner {
          max-width: 1200px; margin: 0 auto;
          display: grid; grid-template-columns: 1fr 1fr; gap: 48px;
          align-items: center;
        }
        .hero-content { max-width: 560px; }
        .hero-badge {
          display: inline-block; padding: 8px 20px;
          background: var(--warm-light); border-radius: 30px;
          color: var(--warm); font-size: 12px; font-weight: 700;
          letter-spacing: 2.5px; text-transform: uppercase;
          margin-bottom: 24px;
        }
        .hero h1 {
          font-family: 'Playfair Display', serif;
          font-size: clamp(32px, 5vw, 52px); font-weight: 600;
          color: var(--charcoal); line-height: 1.15; margin-bottom: 18px;
          letter-spacing: -0.5px;
        }
        .hero h1 em {
          font-style: italic; color: var(--warm);
        }
        .hero p {
          color: var(--muted); font-size: 17px;
          line-height: 1.65; margin-bottom: 32px;
        }
        .hero-buttons { display: flex; gap: 14px; flex-wrap: wrap; }
        .hero-images {
          display: grid; grid-template-columns: 1fr 1fr; gap: 12px;
        }
        .hero-images img {
          width: 100%; border-radius: 14px; object-fit: cover;
          transition: transform 0.4s;
        }
        .hero-images img:hover { transform: scale(1.03); }
        .hero-images img:first-child {
          grid-column: 1 / -1; height: 240px;
        }
        .hero-images img:nth-child(2),
        .hero-images img:nth-child(3) {
          height: 160px;
        }

        /* POPUP */
        .popup-overlay {
          position: fixed; inset: 0; z-index: 200;
          background: rgba(26,26,26,0.6); backdrop-filter: blur(6px);
          display: flex; align-items: center; justify-content: center;
          animation: popFadeIn 0.3s ease;
        }
        @keyframes popFadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .popup-card {
          background: #fff; border-radius: 20px; padding: 48px 40px;
          max-width: 440px; width: 90%; text-align: center;
          position: relative;
          box-shadow: 0 24px 64px rgba(0,0,0,0.18);
          animation: popSlideUp 0.4s ease;
        }
        @keyframes popSlideUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .popup-close {
          position: absolute; top: 16px; right: 16px;
          background: none; border: none; cursor: pointer;
          font-size: 22px; color: var(--muted); line-height: 1;
          width: 36px; height: 36px; border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          transition: background 0.2s, color 0.2s;
        }
        .popup-close:hover { background: var(--cream); color: var(--charcoal); }
        .popup-icon {
          width: 64px; height: 64px; border-radius: 50%;
          background: var(--warm-light); color: var(--warm);
          display: flex; align-items: center; justify-content: center;
          font-size: 28px; font-weight: 700; margin: 0 auto 20px;
        }
        .popup-card h2 {
          font-family: 'Playfair Display', serif;
          font-size: 28px; font-weight: 600; color: var(--charcoal);
          margin-bottom: 10px; letter-spacing: -0.3px;
        }
        .popup-card p {
          color: var(--muted); font-size: 15px; line-height: 1.6;
          margin-bottom: 28px;
        }
        .popup-card .btn-primary {
          width: 100%; justify-content: center; padding: 16px;
          font-size: 16px;
        }
        .popup-skip {
          display: block; margin-top: 14px;
          background: none; border: none; cursor: pointer;
          color: var(--muted); font-size: 13px; font-weight: 500;
          text-decoration: underline;
          transition: color 0.2s;
        }
        .popup-skip:hover { color: var(--charcoal); }

        @media (max-width: 768px) {
          .hero-inner { grid-template-columns: 1fr; gap: 32px; }
          .hero-images { display: none; }
          .hero { padding: 100px 20px 48px; }
          .hero-buttons { flex-direction: column; }
        }
        .btn-primary {
          display: inline-flex; align-items: center; gap: 8px;
          padding: 15px 32px; background: var(--warm); color: var(--charcoal);
          font-size: 15px; font-weight: 700; border-radius: 8px;
          text-decoration: none; letter-spacing: 0.4px;
          transition: transform 0.2s, box-shadow 0.2s;
        }
        .btn-primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 28px rgba(200,164,92,0.35);
        }
        .btn-secondary {
          display: inline-flex; align-items: center; gap: 8px;
          padding: 15px 32px; background: transparent;
          border: 1.5px solid rgba(255,255,255,0.3); color: #fff;
          font-size: 15px; font-weight: 600; border-radius: 8px;
          text-decoration: none; letter-spacing: 0.4px;
          transition: border-color 0.2s, background 0.2s;
        }
        .btn-secondary:hover {
          border-color: rgba(255,255,255,0.6);
          background: rgba(255,255,255,0.06);
        }

        .section { padding: 96px 32px; max-width: 1200px; margin: 0 auto; }
        .section-label {
          color: var(--warm); font-size: 12px; font-weight: 700;
          letter-spacing: 3px; text-transform: uppercase; margin-bottom: 14px;
        }
        .section-title {
          font-family: 'Playfair Display', serif;
          font-size: clamp(28px, 4vw, 42px); font-weight: 600;
          color: var(--charcoal); line-height: 1.2; margin-bottom: 16px;
          letter-spacing: -0.5px;
        }
        .section-sub {
          color: var(--muted); font-size: 16px; line-height: 1.6;
          max-width: 560px; margin-bottom: 52px;
        }

        .usps-grid {
          display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 28px;
        }
        .usp-card {
          background: #fff; border: 1px solid var(--border);
          border-radius: 14px; padding: 32px 28px;
          transition: transform 0.25s, box-shadow 0.25s;
        }
        .usp-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 12px 36px rgba(0,0,0,0.06);
        }
        .usp-icon {
          width: 48px; height: 48px; border-radius: 12px;
          background: var(--warm-light); color: var(--warm);
          display: flex; align-items: center; justify-content: center;
          font-size: 22px; font-weight: 700; margin-bottom: 20px;
        }
        .usp-card h3 {
          font-size: 17px; font-weight: 700; margin-bottom: 8px;
          color: var(--charcoal);
        }
        .usp-card p {
          color: var(--muted); font-size: 14px; line-height: 1.6;
        }

        .properties-grid {
          display: grid; grid-template-columns: repeat(auto-fit, minmax(340px, 1fr));
          gap: 28px;
        }
        .prop-card {
          background: #fff; border-radius: 16px; overflow: hidden;
          border: 1px solid var(--border);
          transition: transform 0.3s, box-shadow 0.3s;
        }
        .prop-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 20px 48px rgba(0,0,0,0.08);
        }
        .prop-img {
          width: 100%; height: 240px; object-fit: cover;
        }
        .prop-img-wrap { overflow: hidden; position: relative; }

        /* CAROUSEL */
        .carousel {
          position: relative; overflow: hidden; height: 240px;
        }
        .carousel-track {
          display: flex; height: 100%;
          transition: transform 0.5s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .carousel-img {
          min-width: 100%; height: 240px; object-fit: cover; flex-shrink: 0;
        }
        .carousel-btn {
          position: absolute; top: 50%; transform: translateY(-50%);
          background: rgba(26,26,26,0.55); backdrop-filter: blur(4px);
          color: #fff; border: none; cursor: pointer;
          width: 34px; height: 34px; border-radius: 50%;
          font-size: 20px; line-height: 1;
          display: flex; align-items: center; justify-content: center;
          opacity: 0; transition: opacity 0.25s;
        }
        .prop-card:hover .carousel-btn { opacity: 1; }
        .carousel-btn:hover { background: rgba(26,26,26,0.8); }
        .carousel-prev { left: 10px; }
        .carousel-next { right: 10px; }
        .carousel-dots {
          position: absolute; bottom: 10px; left: 50%;
          transform: translateX(-50%);
          display: flex; gap: 6px;
        }
        .carousel-dot {
          width: 8px; height: 8px; border-radius: 50%;
          background: rgba(255,255,255,0.5); border: none; cursor: pointer;
          padding: 0; transition: background 0.2s, transform 0.2s;
        }
        .carousel-dot.active {
          background: #fff; transform: scale(1.25);
        }
        .prop-price-tag {
          position: absolute; bottom: 14px; left: 14px;
          background: rgba(26,26,26,0.85); backdrop-filter: blur(8px);
          color: var(--warm); padding: 6px 14px; border-radius: 6px;
          font-size: 13px; font-weight: 700; letter-spacing: 0.3px;
        }
        .prop-body { padding: 24px; }
        .prop-tagline {
          color: var(--warm); font-size: 12px; font-weight: 600;
          letter-spacing: 1px; text-transform: uppercase; margin-bottom: 8px;
        }
        .prop-body h3 {
          font-family: 'Playfair Display', serif;
          font-size: 22px; font-weight: 600; margin-bottom: 10px;
          color: var(--charcoal);
        }
        .prop-body p {
          color: var(--muted); font-size: 14px; line-height: 1.6; margin-bottom: 18px;
        }
        .prop-features {
          display: flex; flex-wrap: wrap; gap: 8px; margin-bottom: 20px;
        }
        .prop-feat {
          background: var(--cream); border: 1px solid var(--border);
          padding: 5px 12px; border-radius: 6px;
          font-size: 12px; font-weight: 500; color: var(--slate);
        }
        .prop-book {
          display: block; text-align: center; padding: 13px;
          background: var(--charcoal); color: #fff; border-radius: 8px;
          text-decoration: none; font-size: 14px; font-weight: 600;
          letter-spacing: 0.5px;
          transition: background 0.2s;
        }
        .prop-book:hover { background: var(--slate); }

        .audiences-section {
          background: var(--charcoal); padding: 80px 32px;
        }
        .audiences-inner {
          max-width: 1200px; margin: 0 auto;
          display: grid; grid-template-columns: 1fr 1fr; gap: 64px;
          align-items: center;
        }
        .audiences-section .section-label { color: var(--warm); }
        .audiences-section .section-title { color: #fff; }
        .audiences-section .section-sub { color: rgba(255,255,255,0.6); }
        .audience-tags { display: flex; flex-wrap: wrap; gap: 10px; }
        .audience-tag {
          padding: 12px 22px; border: 1px solid rgba(255,255,255,0.15);
          border-radius: 8px; color: rgba(255,255,255,0.8);
          font-size: 14px; font-weight: 500;
          transition: border-color 0.2s, background 0.2s;
        }
        .audience-tag:hover {
          border-color: var(--warm); background: rgba(200,164,92,0.08);
          color: var(--warm);
        }
        .audiences-img {
          width: 100%; height: 400px; object-fit: cover; border-radius: 16px;
        }

        .cta-band {
          background: linear-gradient(135deg, var(--warm) 0%, #b8943f 100%);
          padding: 72px 32px; text-align: center;
        }
        .cta-band h2 {
          font-family: 'Playfair Display', serif;
          font-size: clamp(28px, 4vw, 40px); font-weight: 600;
          color: var(--charcoal); margin-bottom: 14px; letter-spacing: -0.5px;
        }
        .cta-band p {
          color: rgba(26,26,26,0.7); font-size: 16px; margin-bottom: 32px;
        }
        .btn-dark {
          display: inline-flex; align-items: center; gap: 8px;
          padding: 16px 36px; background: var(--charcoal); color: #fff;
          font-size: 15px; font-weight: 700; border-radius: 8px;
          text-decoration: none; letter-spacing: 0.5px;
          transition: transform 0.2s, box-shadow 0.2s;
        }
        .btn-dark:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 28px rgba(0,0,0,0.25);
        }

        footer {
          background: var(--charcoal); color: rgba(255,255,255,0.65);
          padding: 64px 32px 32px;
        }
        .footer-inner {
          max-width: 1200px; margin: 0 auto;
          display: grid; grid-template-columns: 2fr 1fr 1fr; gap: 48px;
        }
        .footer-brand {
          margin-bottom: 18px;
        }
        .footer-brand img {
          height: 64px; width: auto; border-radius: 8px;
        }
        footer p { font-size: 14px; line-height: 1.7; }
        footer h4 {
          color: #fff; font-size: 13px; font-weight: 700;
          letter-spacing: 1.5px; text-transform: uppercase; margin-bottom: 18px;
        }
        footer a {
          color: rgba(255,255,255,0.65); text-decoration: none;
          font-size: 14px; display: block; margin-bottom: 10px;
          transition: color 0.2s;
        }
        footer a:hover { color: var(--warm); }
        .footer-copy {
          max-width: 1200px; margin: 40px auto 0;
          padding-top: 24px; border-top: 1px solid rgba(255,255,255,0.1);
          font-size: 13px; text-align: center; color: rgba(255,255,255,0.35);
        }

        @media (max-width: 768px) {
          .nav-links { display: none; }
          .burger { display: flex; }
          .section { padding: 64px 20px; }
          .audiences-inner { grid-template-columns: 1fr; gap: 36px; }
          .footer-inner { grid-template-columns: 1fr; gap: 32px; }
          .properties-grid { grid-template-columns: 1fr; }
        }
      `}</style>

      {/* NAV */}
      <nav className={`nav ${scrolled ? "scrolled" : ""}`}>
        <a href="#" className="nav-logo"><img src={LOGO_SRC} alt="CHJB Short Stays Ltd" /></a>
        <div className="nav-links">
          <a href="#properties">Properties</a>
          <a href="#why-us">Why Book Direct</a>
          <a href="#who">Who We Help</a>
          <a href="#contact">Contact</a>
          <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer" className="nav-cta">
            Book Now
          </a>
        </div>
        <button
          className={`burger ${menuOpen ? "open" : ""}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Menu"
        >
          <span /><span /><span />
        </button>
      </nav>

      {/* MOBILE MENU */}
      <div className={`mobile-menu ${menuOpen ? "open" : ""}`}>
        <a href="#properties" onClick={() => setMenuOpen(false)}>Properties</a>
        <a href="#why-us" onClick={() => setMenuOpen(false)}>Why Book Direct</a>
        <a href="#who" onClick={() => setMenuOpen(false)}>Who We Help</a>
        <a href="#contact" onClick={() => setMenuOpen(false)}>Contact</a>
        <a
          href={BOOKING_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-primary"
          onClick={() => setMenuOpen(false)}
        >
          Book Now
        </a>
      </div>

      {/* POPUP */}
      {showPopup && (
        <div className="popup-overlay" onClick={() => setShowPopup(false)}>
          <div className="popup-card" onClick={(e) => e.stopPropagation()}>
            <button className="popup-close" onClick={() => setShowPopup(false)}>✕</button>
            <div className="popup-icon">%</div>
            <h2>Book Direct & Save 15%</h2>
            <p>
              Skip the Airbnb and Booking.com fees. Book directly with CHJB Short Stays
              for the best rate — guaranteed.
            </p>
            <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer" className="btn-primary" onClick={() => setShowPopup(false)}>
              Check Availability →
            </a>
            <button className="popup-skip" onClick={() => setShowPopup(false)}>
              Maybe later
            </button>
          </div>
        </div>
      )}

      {/* HERO */}
      <section className="hero">
        <div className="hero-inner">
          <div className="hero-content">
            <div className="hero-badge">Doncaster Serviced Accommodation</div>
            <h1>
              Your <em>home away</em> from home in Doncaster
            </h1>
            <p>
              Fully furnished short-stay apartments for contractors, business travellers,
              families, and visitors. Book direct and save up to 15%.
            </p>
            <div className="hero-buttons">
              <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer" className="btn-primary">
                Check Availability →
              </a>
              <a href={WHATSAPP} target="_blank" rel="noopener noreferrer" className="btn-secondary" style={{ border: "1.5px solid var(--border)", color: "var(--charcoal)" }}>
                WhatsApp Us
              </a>
            </div>
          </div>
          <div className="hero-images">
            <img src="https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&q=80" alt="Living room" />
            <img src="https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&q=80" alt="Bedroom" />
            <img src="https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&q=80" alt="Kitchen" />
          </div>
        </div>
      </section>

      {/* USPs */}
      <section className="section" id="why-us">
        <FadeIn>
          <div className="section-label">Why Book Direct</div>
          <div className="section-title">Better rates. Better experience.</div>
          <div className="section-sub">
            Skip the platform fees. Book directly with us for the best price,
            direct communication, and a smoother stay.
          </div>
        </FadeIn>
        <div className="usps-grid">
          {USPS.map((u, i) => (
            <FadeIn key={i} delay={i * 0.1}>
              <div className="usp-card">
                <div className="usp-icon">{u.icon}</div>
                <h3>{u.title}</h3>
                <p>{u.text}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* PROPERTIES */}
      <section className="section" id="properties" style={{ background: "#fff", maxWidth: "100%", padding: "96px 32px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <FadeIn>
            <div className="section-label">Our Properties</div>
            <div className="section-title">Handpicked stays across Doncaster</div>
            <div className="section-sub">
              Each property is professionally cleaned, fully equipped, and ready for
              your arrival. Check live availability on our booking page.
            </div>
          </FadeIn>
          <div className="properties-grid">
            {PROPERTIES.map((p, i) => (
              <FadeIn key={p.id} delay={i * 0.12}>
                <div className="prop-card">
                  <div className="prop-img-wrap">
                    <Carousel images={p.images} alt={p.name} />
                    <div className="prop-price-tag">{p.price}</div>
                  </div>
                  <div className="prop-body">
                    <div className="prop-tagline">{p.tagline}</div>
                    <h3>{p.name}</h3>
                    <p>{p.description}</p>
                    <div className="prop-features">
                      {p.features.map((f) => (
                        <span key={f} className="prop-feat">{f}</span>
                      ))}
                    </div>
                    <a
                      href={BOOKING_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="prop-book"
                    >
                      Check Availability
                    </a>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* WHO WE HELP */}
      <section className="audiences-section" id="who">
        <div className="audiences-inner">
          <div>
            <FadeIn>
              <div className="section-label">Who We Help</div>
              <div className="section-title">Whatever brings you to Doncaster</div>
              <div className="section-sub">
                From a 2-night contractor stay to a 6-month relocation, we've got
                a comfortable, hassle-free base ready for you.
              </div>
              <div className="audience-tags">
                {AUDIENCES.map((a) => (
                  <div key={a} className="audience-tag">{a}</div>
                ))}
              </div>
            </FadeIn>
          </div>
          <FadeIn delay={0.15}>
            <img
              src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80"
              alt="Comfortable living space"
              className="audiences-img"
            />
          </FadeIn>
        </div>
      </section>

      {/* CTA BAND */}
      <section className="cta-band">
        <h2>Ready to book your Doncaster stay?</h2>
        <p>Check live availability and secure the best direct rate instantly.</p>
        <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer" className="btn-dark">
          Book Direct & Save 15% →
        </a>
      </section>

      {/* FOOTER */}
      <footer id="contact">
        <div className="footer-inner">
          <div>
            <div className="footer-brand"><img src={LOGO_SRC} alt="CHJB Short Stays Ltd" /></div>
            <p>
              CHJB Short Stays Ltd — quality serviced accommodation in Doncaster.
              Fully furnished apartments for short and long-term stays.
            </p>
          </div>
          <div>
            <h4>Quick Links</h4>
            <a href="#properties">Properties</a>
            <a href="#why-us">Why Book Direct</a>
            <a href="#who">Who We Help</a>
            <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer">Book Now</a>
          </div>
          <div>
            <h4>Contact</h4>
            <a href={`tel:${PHONE}`}>{PHONE}</a>
            <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
            <a href={WHATSAPP} target="_blank" rel="noopener noreferrer">WhatsApp</a>
          </div>
        </div>
        <div className="footer-copy">
          © {new Date().getFullYear()} CHJB Short Stays Ltd. Registered in England & Wales. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
