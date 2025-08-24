import React from 'react'

const NewsLetter = () => {
  return (
    <div className='mx-8 sm:mx-16 xl:mx-24 my-24'>
      <div className='hydrangea-bg-pattern rounded-3xl p-8 text-center relative overflow-hidden'>
        {/* Background decorative elements */}
        <div className='absolute top-0 left-0 w-full h-full'>
          <div className='absolute top-8 left-8 w-20 h-20 bg-gradient-to-br from-white/40 to-blue-200/40 rounded-full blur-xl'></div>
          <div className='absolute bottom-8 right-8 w-32 h-32 bg-gradient-to-br from-purple-200/40 to-pink-200/40 rounded-full blur-2xl'></div>
          <div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-40 h-40 bg-gradient-to-br from-blue-100/30 to-purple-100/30 rounded-full blur-3xl'></div>
        </div>

        <div className='relative z-10 max-w-3xl mx-auto'>
          {/* Newsletter Icon */}
          <div className='w-16 h-16 mx-auto mb-6 bg-gradient-to-r from-blue-400 to-purple-400 rounded-2xl flex items-center justify-center transform rotate-12 hydrangea-float'>
            <svg className='w-8 h-8 text-white transform -rotate-12' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
              <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M3 8l7.89 7.89a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z' />
            </svg>
          </div>

          <h2 className='title-font text-3xl font-bold mb-4 bg-gradient-to-r from-blue-700 via-purple-600 to-pink-500 bg-clip-text text-transparent'>
            Never Miss a Story
          </h2>
          
          <p className='text-md text-slate-600 mb-4 leading-relaxed max-w-2xl mx-auto'>
            Join our community of readers and get the latest articles, insights, and creative content delivered directly to your inbox
          </p>

          <form className='flex flex-col sm:flex-row items-center justify-center gap-4 max-w-xl mx-auto'>
            <div className='relative w-full sm:flex-1'>
              <input 
                type="email" 
                placeholder='Enter your email address...' 
                className='w-full px-6 py-3 glass-effect border-2 border-white/30 rounded-2xl focus:outline-none focus:border-blue-300 transition-all duration-300 text-slate-700 placeholder-slate-500'
                required
              />
              <div className='absolute right-4 top-1/2 transform -translate-y-1/2'>
                <svg className='w-5 h-5 text-slate-400' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207' />
                </svg>
              </div>
            </div>
            
            <button 
              type="submit" 
              className='hydrangea-btn-primary px-8 py-3 rounded-2xl font-semibold text-white shadow-lg transition-all duration-300 whitespace-nowrap'
            >
              Subscribe Now
            </button>
          </form>

          <p className='text-sm text-slate-500 mt-4'>
            ✨ Join 10,000+ readers • 📧 Weekly updates • 🔒 No spam, unsubscribe anytime
          </p>
        </div>
      </div>
    </div>
  )
}

export default NewsLetter