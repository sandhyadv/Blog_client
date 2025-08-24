import { useRef } from 'react'
import { assets } from '../assets/assets'
import { useAppContext } from '../context/AppContext'

const Header = () => {

  const {setInput, input} = useAppContext()
  const inputRef = useRef()

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    setInput(inputRef.current.value)
  }

  const onClear = () => {
    setInput('')
    inputRef.current.value = ''
  }

  return (
    <div className='mx-8 sm:mx-16 xl:mx-24 mt-8 relative hydrangea-bg-pattern min-h-[600px] rounded-3xl overflow-hidden'>
        <div className='text-center pt-24 pb-16 px-6 relative z-10'>
            <div className='inline-flex items-center gap-3 text-lg sm:text-xl font-semibold mb-6 glass-effect px-6 py-3 rounded-full'>
              <img src={assets.star_icon} alt="Star Icon" className='w-5 h-5 hydrangea-pulse' />
              <p className='bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent'>
                AI-Powered Blog Platform
              </p>
            </div>

           <h1 className='title-font text-4xl sm:text-7xl sm:leading-tight font-bold mb-6 bg-gradient-to-r from-blue-700 via-purple-600 to-pink-500 bg-clip-text text-transparent hydrangea-float'>
             Your Creative <br/>
             <span className='bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent'>Blogging</span>{' '}
             Journey
           </h1>

           <p className='text-lg sm:text-xl text-slate-600 mb-8 max-w-2xl mx-auto leading-relaxed'>
             Create stunning content, build your audience, and share your stories with the world through our innovative platform.
           </p>

           <form onSubmit={onSubmitHandler} className='mt-8 flex flex-col sm:flex-row items-center justify-center gap-4 max-w-2xl mx-auto'>
            <div className='relative w-full sm:flex-1'>
              <input 
                ref={inputRef} 
                type="text" 
                placeholder='Discover amazing blogs...' 
                className='w-full px-6 py-4 glass-effect border-2 border-white/20 rounded-2xl focus:outline-none focus:border-blue-300 transition-all duration-300 text-slate-700 placeholder-slate-500' 
                required 
              />
            </div>
            <button 
              type='submit' 
              className='hydrangea-btn-primary px-8 py-4 rounded-2xl font-semibold text-white shadow-lg transition-all duration-300'
            >
              Search
            </button>
           </form>

           {input && (
             <div className='mt-6'>
               <button 
                 onClick={onClear} 
                 className='glass-effect border border-white/30 font-medium text-sm py-2 px-4 rounded-full hover:bg-white/20 transition-all duration-200 text-slate-600'
               >
                 Clear Search ✕
               </button>
             </div>
           )}
        </div>

        {/* Decorative elements */}
        <div className='absolute top-10 left-10 w-20 h-20 bg-gradient-to-br from-blue-200 to-purple-200 rounded-full opacity-60 blur-xl'></div>
        <div className='absolute top-32 right-16 w-32 h-32 bg-gradient-to-br from-purple-200 to-pink-200 rounded-full opacity-50 blur-2xl'></div>
        <div className='absolute bottom-20 left-1/4 w-24 h-24 bg-gradient-to-br from-blue-300 to-purple-300 rounded-full opacity-40 blur-xl'></div>
    </div>
  )
}

export default Header