import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAppContext } from '../../context/AppContext';
import toast from 'react-hot-toast';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isRedirecting, setIsRedirecting] = useState(false);

  const { login, isLoading } = useAppContext();
  const location = useLocation();
  const navigate = useNavigate();

  // Show welcome message and pre-fill email if coming from signup
  useEffect(() => {
    if (location.state?.fromSignup) {
      toast.success('Welcome! Please sign in with your new account.');
      
      // Pre-fill email if provided
      if (location.state?.email) {
        setFormData(prev => ({
          ...prev,
          email: location.state.email
        }));
      }
    }
  }, [location]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      toast.error('Please enter both email and password');
      return;
    }
    
    const result = await login(formData);
    if (result.success) {
      // Set redirecting state to show success button
      setIsRedirecting(true);
      
      // Show success message
      toast.success('Login successful! Welcome back!');
      
      // Get the redirect location from state (for protected routes) or default to home
      const from = location.state?.from?.pathname || '/';
      
      // Clear the location state to prevent issues on subsequent navigations
      window.history.replaceState({}, document.title);
      
      // Navigate to main page or intended destination
      setTimeout(() => {
        navigate(from, { replace: true });
      }, 1000); // Brief delay to show success message
    }
  };

  return (
    <div className='min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/30 flex items-center justify-center px-4'>
      <div className='hydrangea-bg-pattern absolute inset-0 opacity-5'></div>
      
      <div className='w-full max-w-md relative z-10'>
        {/* Header */}
        <div className='text-center mb-8'>
          <div className='inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 rounded-2xl mb-4 shadow-lg'>
            <svg className='w-8 h-8 text-white' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
              <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z' />
            </svg>
          </div>
          <h2 className='title-font text-3xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-2'>
            Welcome Back
          </h2>
          <p className='text-slate-600'>Sign in to your account to continue</p>
          
          {/* Decorative elements */}
          <div className='flex items-center justify-center gap-3 mt-4'>
            <div className='w-8 h-0.5 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full opacity-60'></div>
            <div className='w-2 h-2 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full animate-pulse'></div>
            <div className='w-8 h-0.5 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full opacity-60'></div>
          </div>
        </div>

        {/* Login Form */}
        <div className='glass-effect p-8 rounded-2xl'>
          <form onSubmit={handleSubmit} className='space-y-6'>
            {/* Email Field */}
            <div>
              <label className='block text-sm font-medium text-slate-700 mb-2'>
                Email Address
              </label>
              <div className='relative'>
                <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                  <svg className='w-5 h-5 text-slate-400' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207' />
                  </svg>
                </div>
                <input
                  type='email'
                  name='email'
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className='glass-effect w-full pl-10 pr-3 py-3 border border-blue-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 transition-all duration-200'
                  placeholder='Enter your email'
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label className='block text-sm font-medium text-slate-700 mb-2'>
                Password
              </label>
              <div className='relative'>
                <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                  <svg className='w-5 h-5 text-slate-400' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z' />
                  </svg>
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  name='password'
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className='glass-effect w-full pl-10 pr-12 py-3 border border-blue-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 transition-all duration-200'
                  placeholder='Enter your password'
                />
                <button
                  type='button'
                  onClick={() => setShowPassword(!showPassword)}
                  className='absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600 transition-colors duration-200'
                >
                  {showPassword ? (
                    <svg className='w-5 h-5' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                      <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21' />
                    </svg>
                  ) : (
                    <svg className='w-5 h-5' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                      <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M15 12a3 3 0 11-6 0 3 3 0 016 0z' />
                      <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z' />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type='submit'
              disabled={isLoading || isRedirecting || !formData.email || !formData.password}
              className={`w-full py-3 disabled:cursor-not-allowed transition-all duration-200 ${
                isRedirecting 
                  ? 'bg-green-500 hover:bg-green-600 text-white' 
                  : 'hydrangea-btn-primary disabled:opacity-50'
              }`}
            >
              {isLoading ? (
                <div className='flex items-center justify-center gap-2'>
                  <div className='w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin'></div>
                  Signing In...
                </div>
              ) : isRedirecting ? (
                <div className='flex items-center justify-center gap-2'>
                  <svg className='w-4 h-4 text-white' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M5 13l4 4L19 7' />
                  </svg>
                  Redirecting...
                </div>
              ) : (
                'Sign In'
              )}
            </button>
          </form>

          {/* Footer */}
          <div className='mt-8 text-center'>
            <p className='text-slate-600'>
              Don't have an account?{' '}
              <Link 
                to='/signup' 
                className='text-blue-600 hover:text-blue-700 font-medium transition-colors duration-200 underline-offset-4 hover:underline'
              >
                Sign up here
              </Link>
            </p>
            
            <div className='mt-4 pt-4 border-t border-blue-100'>
              <Link 
                to='/' 
                className='text-sm text-slate-500 hover:text-slate-700 transition-colors duration-200 flex items-center justify-center gap-1'
              >
                <svg className='w-4 h-4' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M10 19l-7-7m0 0l7-7m-7 7h18' />
                </svg>
                Back to Home
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom decorative elements */}
        <div className='flex items-center justify-center mt-8 gap-2 opacity-60'>
          <div className='w-2 h-2 bg-blue-400 rounded-full animate-pulse'></div>
          <div className='w-2 h-2 bg-purple-400 rounded-full animate-pulse' style={{animationDelay: '0.5s'}}></div>
          <div className='w-2 h-2 bg-pink-400 rounded-full animate-pulse' style={{animationDelay: '1s'}}></div>
        </div>
      </div>
    </div>
  );
};

export default Login;