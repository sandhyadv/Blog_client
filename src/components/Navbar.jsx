import { assets } from '../assets/assets';
import { useAppContext } from '../context/AppContext';

const Navbar = () => {

  const { navigate, token } = useAppContext()

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
      <button 
        onClick={() => navigate('/admin')} 
        className='hydrangea-btn-primary flex items-center gap-3 rounded-full text-sm font-medium text-white px-8 py-3 transition-all duration-300 hover:scale-105'
      >
        <span>{token ? 'Dashboard' : 'Login'}</span>
        <img src={assets.arrow} alt="Arrow" className='w-4 sm:w-5 transition-transform duration-300 group-hover:translate-x-1' />
      </button>
    </div>
  )
}

export default Navbar