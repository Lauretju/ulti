

export default function Header() {
  return (
    <header className="header bg-light" style={{ padding: '1rem 0' }}>
      <div
        className="container-xl"
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '1rem',
          paddingLeft: '1rem', // Añadir un pequeño margen a la izquierda
        }}
      >
        <a href="index.html" style={{ flexShrink: 0 }}>
          <img
            src="/img/casita.png"
            alt="imagen logo"
            style={{
              maxHeight: '30px', // Misma altura que los íconos
              width: 'auto',
              display: 'block',
            }}
          />
        </a>

        <div className="social-icons" style={{ display: 'flex', gap: '0.75rem' }}>
          <a href="https://www.instagram.com/gossip.cake_/" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
            <img
              src="/img/ig.png"
              alt="Instagram"
              style={{
                maxHeight: '30px',
                width: 'auto',
                display: 'block',
              }}
            />
          </a>
          <a href="https://www.tiktok.com/@gossip.cake_?lang=es" target="_blank" rel="noopener noreferrer" aria-label="TikTok">
            <img
              src="/img/tiktok.png"
              alt="TikTok"
              style={{
                maxHeight: '30px',
                width: 'auto',
                display: 'block',
              }}
            />
          </a>
        </div>

        {/* Espacio flexible para empujar nav a la derecha */}
        <div style={{ flexGrow: 1 }}></div>

        <nav>
          <ul
            style={{
              listStyle: 'none',
              display: 'flex',
              gap: '1rem',
              margin: 0,
              padding: 0,
            }}
          >
            {/* Navegación vacía */}
          </ul>
        </nav>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .container-xl {
            padding: 0 1rem;
          }
          .social-icons img {
            max-height: 28px !important;
          }
          a[aria-label="Instagram"],
          a[aria-label="TikTok"] {
            padding: 0.25rem;
          }
        }

        @media (max-width: 480px) {
          .social-icons img {
            max-height: 24px !important;
          }
        }
      `}</style>
    </header>
  );
}
