import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAppContext } from '../../context/AppContext';
import toast from 'react-hot-toast';

const Signup = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { axios } = useAppContext();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validation
    if (!formData.name || !formData.email || !formData.password || !formData.confirmPassword) {
      toast.error('Please fill in all fields');
      return;
    }
    
    if (formData.password !== formData.confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    if (formData.password.length < 6) {
      toast.error('Password must be at least 6 characters long');
      return;
    }
    
    try {
      setIsLoading(true);
      
      // Make direct API call for signup (without auto-login)
      const { data } = await axios.post('/api/auth/signup', {
        name: formData.name,
        email: formData.email,
        password: formData.password
      });
      
      if (data.success) {
        // Clear form fields
        setFormData({
          name: '',
          email: '',
          password: '',
          confirmPassword: ''
        });
        
        // Show success message
        toast.success('Account created successfully! Please login to continue.');
        
        // Redirect to login page after a brief delay
        setTimeout(() => {
          navigate('/login', { 
            state: { 
              fromSignup: true,
              email: formData.email // Pre-fill email for convenience
            } 
          });
        }, 1500);
      } else {
        toast.error(data.message || 'Failed to create account');
      }
    } catch (error) {
      const message = error.response?.data?.message || 'Failed to create account. Please try again.';
      toast.error(message);
    } finally {
      setIsLoading(false);
    }
  };

  const passwordsMatch = formData.password && formData.confirmPassword && formData.password === formData.confirmPassword;
  const passwordsDontMatch = formData.password && formData.confirmPassword && formData.password !== formData.confirmPassword;

  return (
    <div className='min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/30 flex items-center justify-center px-4 py-8'>
      <div className='hydrangea-bg-pattern absolute inset-0 opacity-5'></div>
      
      <div className='w-full max-w-md relative z-10'>
        {/* Header */}
        <div className='text-center mb-8'>
          <div className='inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 rounded-2xl mb-4 shadow-lg'>
            <svg className='w-8 h-8 text-white' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
              <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z' />
            </svg>
          </div>
          <h2 className='title-font text-3xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-2'>
            Join Our Community
          </h2>
          <p className='text-slate-600'>Create your account to get started</p>
          
          {/* Decorative elements */}
          <div className='flex items-center justify-center gap-3 mt-4'>
            <div className='w-8 h-0.5 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full opacity-60'></div>
            <div className='w-2 h-2 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full animate-pulse'></div>
            <div className='w-8 h-0.5 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full opacity-60'></div>
          </div>
        </div>

        {/* Signup Form */}
        <div className='glass-effect p-8 rounded-2xl'>
          <form onSubmit={handleSubmit} className='space-y-6'>
            {/* Name Field */}
            <div>
              <label className='block text-sm font-medium text-slate-700 mb-2'>
                Full Name
              </label>
              <div className='relative'>
                <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                  <svg className='w-5 h-5 text-slate-400' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z' />
                  </svg>
                </div>
                <input
                  type='text'
                  name='name'
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className='glass-effect w-full pl-10 pr-3 py-3 border border-blue-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 transition-all duration-200'
                  placeholder='Enter your full name'
                />
              </div>
            </div>

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
                  minLength={6}
                  className='glass-effect w-full pl-10 pr-12 py-3 border border-blue-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 transition-all duration-200'
                  placeholder='Create a password (min. 6 characters)'
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

            {/* Confirm Password Field */}
            <div>
              <label className='block text-sm font-medium text-slate-700 mb-2'>
                Confirm Password
              </label>
              <div className='relative'>
                <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                  <svg className='w-5 h-5 text-slate-400' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z' />
                  </svg>
                </div>
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  name='confirmPassword'
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                  className={`glass-effect w-full pl-10 pr-12 py-3 border rounded-xl focus:outline-none focus:ring-2 transition-all duration-200 ${
                    passwordsDontMatch 
                      ? 'border-red-300 focus:ring-red-500/20 focus:border-red-400' 
                      : passwordsMatch 
                        ? 'border-green-300 focus:ring-green-500/20 focus:border-green-400'
                        : 'border-blue-100 focus:ring-blue-500/20 focus:border-blue-400'
                  }`}
                  placeholder='Confirm your password'
                />
                <button
                  type='button'
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className='absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600 transition-colors duration-200'
                >
                  {showConfirmPassword ? (
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
              {passwordsDontMatch && (
                <p className='text-red-500 text-sm mt-1'>Passwords do not match</p>
              )}
              {passwordsMatch && (
                <p className='text-green-500 text-sm mt-1'>Passwords match ✓</p>
              )}
            </div>

            {/* Submit Button */}
            <button
              type='submit'
              disabled={isLoading || !formData.name || !formData.email || !formData.password || !formData.confirmPassword || passwordsDontMatch}
              className='hydrangea-btn-primary w-full py-3 disabled:opacity-50 disabled:cursor-not-allowed'
            >
              {isLoading ? (
                <div className='flex items-center justify-center gap-2'>
                  <div className='w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin'></div>
                  Creating Account...
                </div>
              ) : (
                'Create Account'
              )}
            </button>
          </form>

          {/* Footer */}
          <div className='mt-8 text-center'>
            <p className='text-slate-600'>
              Already have an account?{' '}
              <Link 
                to='/login' 
                className='text-blue-600 hover:text-blue-700 font-medium transition-colors duration-200 underline-offset-4 hover:underline'
              >
                Sign in here
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

export default Signup;