import { BrowserRouter } from 'react-router-dom'
import { Navbar } from './components/Navbar'
import { AppRoutes } from './routes/AppRoutes'

function App() {
  return (
    <BrowserRouter>
      <div className="app-shell">
        <Navbar />
        <main className="main-content"><AppRoutes /></main>
        <footer className="site-footer"><span>Food Explorer</span></footer>
      </div>
    </BrowserRouter>
  )
}

export default App
