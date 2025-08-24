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
      <div className='flex justify-between items-center gap-4 px-8 py-4 glass-effect shadow-lg'>
        <div 
          onClick={() => navigate('/')} 
          className='cursor-pointer transition-transform duration-300 hover:scale-105 group'
        >
          <div className='flex items-center gap-3'>
            <div className='relative'>
              <div className='w-10 h-10 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 rounded-lg flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 relative overflow-hidden'>
                <div className='text-white font-bold text-lg relative z-10'>B</div>
                <div className='absolute inset-0 bg-gradient-to-br from-white/20 to-transparent'></div>
                <div className='absolute bottom-1 right-1 w-2 h-2 bg-white/30 rounded-full'></div>
              </div>
              <div className='absolute -top-1 -right-1 w-3 h-3 bg-gradient-to-br from-pink-400 to-purple-400 rounded-full animate-pulse'></div>
            </div>
            
            <div className='flex flex-col'>
              <h1 className='title-font text-2xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent group-hover:from-blue-700 group-hover:via-purple-700 group-hover:to-pink-700 transition-all duration-300'>
                Blogify
              </h1>
              <div className='w-full h-0.5 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 rounded-full transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300'></div>
            </div>
          </div>
        </div>
        
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