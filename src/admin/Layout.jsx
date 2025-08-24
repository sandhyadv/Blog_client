import { Outlet } from 'react-router-dom'
import { assets } from '../assets/assets'
import Sidebar from '../components/admin/Sidebar'
import { useAppContext } from '../context/AppContext'

const Layout = () => {

  const { axios, setToken, navigate } = useAppContext()

  const logout = () => {
    localStorage.removeItem('token')
    axios.defaults.headers.common['Authorization'] = null;
    setToken(null)
    navigate('/')
  }

  return (
    <div className='min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/30'>
      {/* Flush Navbar */}
      <div className='flex justify-between items-center gap-4 px-8 py-4 glass-effect shadow-lg'>
        <img 
          onClick={() => navigate('/')} 
          src={assets.logo} 
          alt="Logo" 
          className='w-36 sm:w-48 cursor-pointer transition-transform duration-300 hover:scale-105' 
        />
        
        <div className='flex items-center gap-4'>
          <div className='flex items-center gap-3'>
            <div className='w-8 h-8 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full flex items-center justify-center'>
              <svg className='w-4 h-4 text-white' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z' />
              </svg>
            </div>
            <span className='text-slate-700 font-medium hidden sm:inline'>Admin</span>
          </div>
          
          <button 
            onClick={logout} 
            className='hydrangea-btn-secondary text-sm px-6 py-2.5 rounded-full font-medium text-white transition-all duration-300 hover:scale-105'
          >
            Logout
          </button>
        </div>
      </div>

      {/* Main Content - Flush Layout */}
      <div className='flex h-[calc(100vh-80px)]'>
        <Sidebar />
        <div className='flex-1 overflow-auto'>
          <Outlet />
        </div>
      </div>
    </div>
  )
}

export default Layout