import { assets } from '../assets/assets';
import { useAppContext } from '../context/AppContext';

const Navbar = () => {

  const { navigate, token, user, logout, isAuthenticated, isAdmin } = useAppContext()

  return (
    <div className='flex justify-between items-center gap-4 px-8 py-4 glass-effect shadow-lg'>
      <div 
        onClick={() => navigate('/')} 
        className='cursor-pointer transition-transform duration-300 hover:scale-105 group'
      >
        <div className='flex items-center gap-3'>
          {/* Custom Unique Logo Icon */}
          <div className='relative'>
            <div className='w-10 h-10 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 rounded-lg flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 relative overflow-hidden'>
              {/* Letter Q with modern design */}
              <div className='text-white font-bold text-lg relative z-10'>Q</div>
              {/* Decorative elements */}
              <div className='absolute inset-0 bg-gradient-to-br from-white/20 to-transparent'></div>
              <div className='absolute bottom-1 right-1 w-2 h-2 bg-white/30 rounded-full'></div>
            </div>
            {/* Floating indicator dot */}
            <div className='absolute -top-1 -right-1 w-3 h-3 bg-gradient-to-br from-pink-400 to-purple-400 rounded-full animate-pulse'></div>
          </div>
          
          {/* QuickBlog Text */}
          <div className='flex flex-col'>
            <h1 className='title-font text-2xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent group-hover:from-blue-700 group-hover:via-purple-700 group-hover:to-pink-700 transition-all duration-300'>
              QuickBlog
            </h1>
            <div className='w-full h-0.5 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 rounded-full transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300'></div>
          </div>
        </div>
      </div>
      <div className='flex items-center gap-4'>
        {isAuthenticated ? (
          <>
            {/* User Profile */}
            <div className='hidden sm:flex items-center gap-3'>
              <div className='flex items-center gap-2 text-slate-700'>
                <div className='w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center'>
                  <span className='text-white text-sm font-semibold'>
                    {user?.name?.charAt(0)?.toUpperCase() || 'U'}
                  </span>
                </div>
                <div className='flex flex-col'>
                  <span className='text-sm font-medium text-slate-800'>
                    {user?.name || 'User'}
                  </span>
                  <span className='text-xs text-slate-500 capitalize'>
                    {user?.role || 'user'}
                  </span>
                </div>
              </div>
            </div>

            {/* Dashboard Button (only for admins) */}
            {isAdmin && (
              <button 
                onClick={() => navigate('/admin')} 
                className='hydrangea-btn-secondary flex items-center gap-2 text-sm font-medium px-4 py-2 rounded-lg transition-all duration-300 hover:scale-105'
              >
                <svg className='w-4 h-4' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z' />
                </svg>
                <span className='hidden sm:inline'>Dashboard</span>
              </button>
            )}

            {/* Logout Button */}
            <button 
              onClick={logout} 
              className='hydrangea-btn-primary flex items-center gap-2 text-sm font-medium px-4 py-2 rounded-lg transition-all duration-300 hover:scale-105 group'
            >
              <svg className='w-4 h-4' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1' />
              </svg>
              <span className='hidden sm:inline'>Logout</span>
            </button>
          </>
        ) : (
          <>
            {/* Login Button */}
            <button 
              onClick={() => navigate('/login')} 
              className='hydrangea-btn-secondary flex items-center gap-2 text-sm font-medium px-4 py-2 rounded-lg transition-all duration-300 hover:scale-105'
            >
              <svg className='w-4 h-4' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1' />
              </svg>
              <span className='hidden sm:inline'>Login</span>
            </button>

            {/* Signup Button */}
            <button 
              onClick={() => navigate('/signup')} 
              className='hydrangea-btn-primary flex items-center gap-2 text-sm font-medium px-4 py-2 rounded-lg transition-all duration-300 hover:scale-105'
            >
              <svg className='w-4 h-4' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z' />
              </svg>
              <span className='hidden sm:inline'>Sign Up</span>
            </button>

            {/* Admin Login (separate button) */}
            <button 
              onClick={() => navigate('/admin')} 
              className='text-xs text-slate-500 hover:text-slate-700 transition-colors duration-200 px-2 py-1 rounded'
            >
              Admin
            </button>
          </>
        )}
      </div>
    </div>
  )
}

export default Navbar