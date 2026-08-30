import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Search from './components/Search/Search'
import LoginForm from './components/LoginForm/Login'
import Home from './components/Home/Home'
import Profile from './components/Profile/Profile'
import UserDetails from './components/UserDetails/UserDetails'
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute'
import NotFound from './components/NotFound/NotFound'
import Sidebar from './components/Sidebar/Sidebar'
import './App.css'

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginForm />} />
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Sidebar />
              <div className="page-content">
                  <Home />
              </div>
            </ProtectedRoute>
          }
        />

        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Sidebar />
              <div className="page-content">
                <Profile />
              </div>
            </ProtectedRoute>
          }
        />
        <Route
          path="/search/:searchInput"
          element={
            <ProtectedRoute>
              <Sidebar />
              <div className="page-content">
                <Search />
              </div>
            </ProtectedRoute>
          }
        />
        <Route
          path="/users/:userId"
          element={
            <ProtectedRoute>
              <Sidebar />
              <div className="page-content">
                <UserDetails />
              </div>
            </ProtectedRoute>
          }
        />

       <Route
            path="*"
            element={<NotFound />}
        />

      </Routes>
    </BrowserRouter>
  )
}

export default App