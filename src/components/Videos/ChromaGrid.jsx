import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import './ChromaGrid.css';

export const ChromaGrid = ({
  items,
  className = '',
  radius = 300,
  columns = 3,
  rows = 2,
  damping = 0.45,
  fadeOut = 0.6,
  ease = 'power3.out'
}) => {
  const rootRef = useRef(null);
  const fadeRef = useRef(null);
  const setX = useRef(null);
  const setY = useRef(null);
  const pos = useRef({ x: 0, y: 0 });

  const demo = [
    {
    title: "Masthya Narayan Recreation Center",
    subtitle: "Ad Project | 4K UHD",
    handle: "0:46 Sec",
    image: "/assets/photos/MNRC.png",
    url: "https://www.facebook.com/share/v/1AhTYNQswD/",
    borderColor: "#0ff",
    gradient: "linear-gradient(145deg, #00ffff22, #000)"
  },
  {
    title: "Nhega Jatra",
    subtitle: "Personal Project | 1080 HD",
    handle: "1:02 Min",
    image: "/assets/photos/JTR.png",
    url: "https://www.facebook.com/share/v/1K1qAMQyLY/",
    borderColor: "#0ff",
    gradient: "linear-gradient(145deg, #00ffff22, #000)"
  },
  {
    title: "SwastiShree Gurukul",
    subtitle: "Commercial | 1080 HD",
    handle: "0:34 Sec",
    image: "/assets/photos/SS.png",
    url: "https://www.tiktok.com/@matshyanarayanrecreation/video/7254529750226504961",
    borderColor: "#0ff",
    gradient: "linear-gradient(145deg, #00ffff22, #000)"
  },
  {
    title: "Machchhegaun Mela",
    subtitle: "Personal | 1080 HD",
    handle: "0:30 Sec",
    image: "/assets/photos/mela.png",
    url: "https://www.tiktok.com/@matshyanarayanrecreation/video/7259313392286960914",
    borderColor: "#0ff",
    gradient: "linear-gradient(145deg, #00ffff22, #000)"
  },
  {
    title: "Anil Gurung's Project",
    subtitle: "Personal | 1080 HD",
    handle: "0:45 Sec",
    image: "/assets/photos/AG.png",
    url: "https://www.instagram.com/reel/C1wr59Ht2Yh/",
    borderColor: "#0ff",
    gradient: "linear-gradient(145deg, #00ffff22, #000)"
  },
  {
    title: "City Care Clinic With Manual Therapy",
    subtitle: "Dental promotional Video",
    handle: "0:43 Sec",
    image: "/assets/photos/dental.png",
    url: "https://www.facebook.com/share/v/18KYUNaRCe/",
    borderColor: "#0ff",
    gradient: "linear-gradient(145deg, #00ffff22, #000)"
  },
  {
    title: "City Care Clinic With Manual Therapy",
    subtitle: "Dr. Sani Sipai",
    handle: "0:33 Sec",
    image: "/assets/photos/sani.png",
    url: "https://www.facebook.com/share/v/17hKFMTdY9/",
    borderColor: "#0ff",
    gradient: "linear-gradient(145deg, #00ffff22, #000)"
  },
  {
    title: "City Care Clinic With Manual Therapy",
    subtitle: "Dr. Niranjan Shah's Interview",
    handle: "0:56 Sec",
    image: "/assets/photos/niranjan.png",
    url: "https://www.facebook.com/share/v/17oaBsyWos/",
    borderColor: "#0ff",
    gradient: "linear-gradient(145deg, #00ffff22, #000)"
  }
  ];
  const data = items?.length ? items : demo;

  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    setX.current = gsap.quickSetter(el, '--x', 'px');
    setY.current = gsap.quickSetter(el, '--y', 'px');
    const { width, height } = el.getBoundingClientRect();
    pos.current = { x: width / 2, y: height / 2 };
    setX.current(pos.current.x);
    setY.current(pos.current.y);
  }, []);

  const moveTo = (x, y) => {
    gsap.to(pos.current, {
      x,
      y,
      duration: damping,
      ease,
      onUpdate: () => {
        setX.current?.(pos.current.x);
        setY.current?.(pos.current.y);
      },
      overwrite: true
    });
  };

  const handleMove = e => {
    const r = rootRef.current.getBoundingClientRect();
    moveTo(e.clientX - r.left, e.clientY - r.top);
    gsap.to(fadeRef.current, { opacity: 0, duration: 0.25, overwrite: true });
  };

  const handleLeave = () => {
    gsap.to(fadeRef.current, {
      opacity: 1,
      duration: fadeOut,
      overwrite: true
    });
  };

  const handleCardClick = url => {
    if (url) {
      window.open(url, '_blank', 'noopener,noreferrer');
    }
  };

  const handleCardMove = e => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    card.style.setProperty('--mouse-x', `${x}px`);
    card.style.setProperty('--mouse-y', `${y}px`);
  };

  return (
    <div
      ref={rootRef}
      className={`chroma-grid ${className}`}
      style={{
        '--r': `${radius}px`,
        '--cols': columns,
        '--rows': rows
      }}
      onPointerMove={handleMove}
      onPointerLeave={handleLeave}
    >
      {data.map((c, i) => (
        <article
          key={i}
          className="chroma-card"
          onMouseMove={handleCardMove}
          onClick={() => handleCardClick(c.url)}
          style={{
            '--card-border': c.borderColor || 'transparent',
            '--card-gradient': c.gradient,
            cursor: c.url ? 'pointer' : 'default'
          }}
        >
          <div className="chroma-img-wrapper">
            <img src={c.image} alt={c.title} loading="lazy" />
          </div>
          <footer className="chroma-info">
            <h3 className="name">{c.title}</h3>
            {c.handle && <span className="handle">{c.handle}</span>}
            <p className="role">{c.subtitle}</p>
            {c.location && <span className="location">{c.location}</span>}
          </footer>
        </article>
      ))}
      <div className="chroma-overlay" />
      <div ref={fadeRef} className="chroma-fade" />
    </div>
  );
};

export default ChromaGrid;
