import { assets } from '../assets/assets';
import { useAppContext } from '../context/AppContext';

const Navbar = () => {

  const { navigate, token } = useAppContext()

  return (
    <div className='flex justify-between items-center gap-4 px-8 py-4 glass-effect shadow-lg'>
      <img 
        onClick={() => navigate('/')} 
        src={assets.logo} 
        alt="Logo" 
        className='w-36 sm:w-48 cursor-pointer transition-transform duration-300 hover:scale-105' 
      />
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