import React, { useState } from 'react'
import { useAppContext } from '../../context/AppContext'
import toast from 'react-hot-toast';

const Login = () => {

    const {axios, setToken, navigate} = useAppContext();

    const [email, setEmail] =useState('')
    const [password, setPassword] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const {data} = await axios.post('/api/admin/login', {email, password})

            if (data.success){
                setToken(data.token)
                localStorage.setItem('token', data.token)
                axios.defaults.headers.common['Authorization'] = data.token;
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message)
        }
    }
  return (
    <div className='min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/30'>
        {/* Navigation Header */}
        <div className='relative z-20 flex justify-between items-center p-6'>
          {/* Back Button */}
          <button 
            onClick={() => navigate('/')}
            className='flex items-center gap-2 text-slate-600 hover:text-slate-800 transition-colors duration-200 group'
          >
            <div className='p-2 rounded-lg bg-white/80 hover:bg-white transition-all duration-200 shadow-sm group-hover:shadow-md'>
              <svg className='w-5 h-5' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M10 19l-7-7m0 0l7-7m-7 7h18' />
              </svg>
            </div>
            <span className='text-sm font-medium'>Back to Blog</span>
          </button>
          
          {/* Logo */}
          <div 
            onClick={() => navigate('/')} 
            className='cursor-pointer transition-transform duration-300 hover:scale-105 group'
          >
            <div className='flex items-center gap-3'>
              <div className='relative'>
                <div className='w-8 h-8 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 rounded-lg flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 relative overflow-hidden'>
                  <div className='text-white font-bold text-sm relative z-10'>Q</div>
                  <div className='absolute inset-0 bg-gradient-to-br from-white/20 to-transparent'></div>
                </div>
              </div>
              <h1 className='title-font text-lg font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent group-hover:from-blue-700 group-hover:via-purple-700 group-hover:to-pink-700 transition-all duration-300'>
                QuickBlog
              </h1>
            </div>
          </div>
        </div>

        <div className='flex items-center justify-center p-6 -mt-16'>
          {/* Background decorative elements */}
          <div className='absolute inset-0 overflow-hidden'>
            <div className='absolute top-20 left-20 w-32 h-32 bg-gradient-to-br from-blue-200/30 to-purple-200/30 rounded-full blur-2xl'></div>
            <div className='absolute bottom-20 right-20 w-40 h-40 bg-gradient-to-br from-purple-200/30 to-pink-200/30 rounded-full blur-3xl'></div>
            <div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-gradient-to-br from-blue-100/20 to-purple-100/20 rounded-full blur-3xl'></div>
          </div>

        <div className='hydrangea-card w-full max-w-md p-8 relative z-10'>
            {/* Header with icon */}
            <div className='text-center mb-8'>
                <div className='w-16 h-16 mx-auto mb-6 bg-gradient-to-r from-blue-400 to-purple-400 rounded-2xl flex items-center justify-center transform rotate-12'>
                    <svg className='w-8 h-8 text-white transform -rotate-12' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                        <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z' />
                    </svg>
                </div>
                
                <h1 className='title-font text-3xl font-bold mb-2'>
                    <span className='bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent'>Admin</span>{' '}
                    <span className='text-slate-700'>Portal</span>
                </h1>
                <p className='text-slate-600'>Enter your credentials to access the admin dashboard</p>
            </div>

            <form onSubmit={handleSubmit} className='space-y-6'>
                <div className='space-y-2'>
                    <label className='text-sm font-medium text-slate-700'>Email Address</label>
                    <div className='relative'>
                        <input 
                            onChange={e=>setEmail(e.target.value)} 
                            value={email} 
                            type='email' 
                            required 
                            placeholder='Enter your email'
                            className='w-full px-4 py-3 bg-white/80 border border-blue-200/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-transparent transition-all duration-300'
                        />
                        <div className='absolute right-3 top-1/2 transform -translate-y-1/2'>
                            <svg className='w-5 h-5 text-slate-400' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207' />
                            </svg>
                        </div>
                    </div>
                </div>

                <div className='space-y-2'>
                    <label className='text-sm font-medium text-slate-700'>Password</label>
                    <div className='relative'>
                        <input 
                            onChange={e=>setPassword(e.target.value)} 
                            value={password} 
                            type='password' 
                            required 
                            placeholder='Enter your password'
                            className='w-full px-4 py-3 bg-white/80 border border-blue-200/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-transparent transition-all duration-300'
                        />
                        <div className='absolute right-3 top-1/2 transform -translate-y-1/2'>
                            <svg className='w-5 h-5 text-slate-400' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M15 12a3 3 0 11-6 0 3 3 0 016 0z' />
                                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z' />
                            </svg>
                        </div>
                    </div>
                </div>

                <button 
                    className='hydrangea-btn-primary w-full py-3 rounded-xl font-semibold text-white transition-all duration-300' 
                    type="submit"
                >
                    Access Dashboard
                </button>
            </form>

            <div className='mt-6 text-center'>
                <p className='text-xs text-slate-500'>
                    🔒 Secure admin access • Protected by enterprise-grade security
                </p>
            </div>
        </div>
        </div>
    </div>
  )
}

export default Login