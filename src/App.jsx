import {Routes, Route, Link} from 'react-router-dom'
import SearchPage from './pages/SearchPage';
import './App.css'

function App() {
  return (
    <div className="App">
      <nav className="navbar">
        <h1>🎬 Movie Watchlist</h1>
        <div className="nav-links">
          <Link to = "/">Search</Link>
          <Link to = "/watchlist">My Watchlist</Link>
        </div>
      </nav>

      <Routes>
        <Route path = "/" element = {<SearchPage />} />
        <Route path = "/watchlist" element = {<div>Watchlist Page</div>} />
        <Route path = "/movie/:id" element = {<div>Movie Details Page</div>} />
        <Route path="*" element={<div>404 Not Found</div>} />
      </Routes>

    </div>
  )
}

export default App;