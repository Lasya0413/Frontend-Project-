
import {useEffect, useState} from 'react'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Search from './components/Search/Search'
import LoginForm from './components/LoginForm/Login'
import Home from './components/Home/Home'
import Profile from './components/Profile/Profile'
import UserDetails from './components/UserDetails/UserDetails'
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute'
import NotFound from './components/NotFound/NotFound'
import Sidebar from './components/Sidebar/Sidebar'
import ForgetPassword from './components/ForgetPassword/ForgetPassword'
import Signup from './components/Signup/Signup'
import './App.css'

const App = () => {
  const [darkMode, setDarkMode] = useState(
    () => localStorage.getItem('darkMode') === 'true',
  )

  useEffect(() => {
    localStorage.setItem('darkMode', darkMode)
  }, [darkMode])

  const toggleDarkMode = () => {
    setDarkMode(previousMode => !previousMode)
  }

  return (
    <div className={darkMode ? 'app dark-mode' : 'app'}>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginForm />} />
          <Route path="/signup" element={<Signup />} />
          <Route
            path="/forgot-password"
            element={<ForgetPassword />}
          />

          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Sidebar
                  darkMode={darkMode}
                  toggleDarkMode={toggleDarkMode}
                />
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
                <Sidebar
                  darkMode={darkMode}
                  toggleDarkMode={toggleDarkMode}
                />
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
                <Sidebar
                  darkMode={darkMode}
                  toggleDarkMode={toggleDarkMode}
                />
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
                <Sidebar
                  darkMode={darkMode}
                  toggleDarkMode={toggleDarkMode}
                />
                <div className="page-content">
                  <UserDetails />
                </div>
              </ProtectedRoute>
            }
          />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App