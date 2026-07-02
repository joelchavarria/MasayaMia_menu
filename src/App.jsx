import './App.css'
import { menuPages } from './menuPages'

function App() {
  const currentYear = new Date().getFullYear()

  return (
    <main className="app-shell">
      <header className="topbar">
        <a className="brand" href="#menu" aria-label="Ir al menu">
          <img src="/brand/icon-96.png" width="42" height="42" alt="" />
          Masaya Mia
        </a>
      </header>

      <section className="menu-viewer" id="menu" aria-label="Menu completo">
        <div className="menu-title">Menu digital</div>

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
