import './App.css'

const menuPages = Array.from({ length: 20 }, (_, index) => {
  const pageNumber = index + 1
  const paddedPage = String(pageNumber).padStart(2, '0')

  return {
    number: pageNumber,
    src: `/menu/page-${paddedPage}.jpg`,
    alt: `Pagina ${pageNumber} del menu de Masaya Mia`,
  }
})

function App() {
  const currentYear = new Date().getFullYear()

  return (
    <main className="app-shell">
      <header className="topbar">
        <a className="brand" href="#menu" aria-label="Ir al menu">
          <span aria-hidden="true">MM</span>
          Masaya Mia
        </a>
        <a className="jump-link" href="#menu">
          Ver menu
        </a>
      </header>

      <section className="menu-viewer" id="menu" aria-label="Menu completo">
        <div className="viewer-heading">
          <p>Menu digital</p>
          <h2>Menu</h2>
        </div>

        <div className="pages">
          {menuPages.map((page) => (
            <article className="menu-page" key={page.src}>
              <img
                src={page.src}
                alt={page.alt}
                width="1323"
                height="1871"
                loading={page.number === 1 ? 'eager' : 'lazy'}
                decoding="async"
                fetchPriority={page.number === 1 ? 'high' : 'auto'}
              />
              <span>Pagina {page.number}</span>
            </article>
          ))}
        </div>
      </section>

      <footer className="site-footer">
        <p>© {currentYear} masayamianic. Todos los derechos reservados.</p>
      </footer>
    </main>
  )
}

export default App
