import React from 'react'
import { assets, footer_data } from '../assets/assets'

const Footer = () => {
  return (
    <div className='px-6 md:px-16 lg:px-24 xl:px-32 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 relative overflow-hidden'>
        <div className='absolute top-0 left-0 w-full h-full overflow-hidden'>
          <div className='absolute top-10 left-10 w-32 h-32 bg-gradient-to-br from-blue-200/30 to-purple-200/30 rounded-full blur-2xl'></div>
          <div className='absolute bottom-10 right-10 w-40 h-40 bg-gradient-to-br from-purple-200/30 to-pink-200/30 rounded-full blur-3xl'></div>
        </div>

        <div className='relative z-10'>
          <div className='flex flex-col md:flex-row items-start justify-between py-16 gap-12 border-b border-gradient-to-r from-blue-200 to-purple-200'>
              <div className='md:w-1/2'>
                  <div className='mb-6 group cursor-pointer w-fit'>
                    <div className='flex items-center gap-3'>
                      <div className='relative'>
                        <div className='w-12 h-12 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 rounded-lg flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 relative overflow-hidden'>
                          <div className='text-white font-bold text-xl relative z-10'>B</div>
                          <div className='absolute inset-0 bg-gradient-to-br from-white/20 to-transparent'></div>
                          <div className='absolute bottom-1 right-1 w-2 h-2 bg-white/30 rounded-full'></div>
                        </div>
                        <div className='absolute -top-1 -right-1 w-3 h-3 bg-gradient-to-br from-pink-400 to-purple-400 rounded-full animate-pulse'></div>
                      </div>
                      
                      <div className='flex flex-col'>
                        <h2 className='title-font text-3xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent group-hover:from-blue-700 group-hover:via-purple-700 group-hover:to-pink-700 transition-all duration-300'>
                          Blogify
                        </h2>
                        <div className='w-full h-0.5 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 rounded-full transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300'></div>
                      </div>
                    </div>
                  </div>
                  <p className='max-w-md text-slate-600 leading-relaxed text-base'>
                    Empowering creators to share their stories and connect with audiences worldwide. Join our community of passionate writers and readers building the future of digital storytelling.
                  </p>
                  
                  {/* Social Media Icons */}
                  <div className='flex gap-4 mt-8'>
                    <div className='w-10 h-10 rounded-full bg-gradient-to-r from-blue-400 to-purple-400 flex items-center justify-center cursor-pointer hover:scale-110 transition-transform duration-300'>
                      <svg className='w-5 h-5 text-white' fill='currentColor' viewBox='0 0 24 24'>
                        <path d='M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z'/>
                      </svg>
                    </div>
                    <div className='w-10 h-10 rounded-full bg-gradient-to-r from-purple-400 to-pink-400 flex items-center justify-center cursor-pointer hover:scale-110 transition-transform duration-300'>
                      <svg className='w-5 h-5 text-white' fill='currentColor' viewBox='0 0 24 24'>
                        <path d='M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z'/>
                      </svg>
                    </div>
                    <div className='w-10 h-10 rounded-full bg-gradient-to-r from-pink-400 to-blue-400 flex items-center justify-center cursor-pointer hover:scale-110 transition-transform duration-300'>
                      <svg className='w-5 h-5 text-white' fill='currentColor' viewBox='0 0 24 24'>
                        <path d='M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z'/>
                      </svg>
                    </div>
                  </div>
              </div>
          
          <div className='flex flex-wrap justify-between w-full md:w-1/2 gap-8'>
              {footer_data.map((section, index) => (
                  <div key={index} className='flex flex-col space-y-3 min-w-[140px]'>
                      <h3 className='title-font text-lg font-semibold text-slate-800 mb-4'>{section.title}</h3>
                      <ul className='space-y-3'>
                          {section.links.map((link, i) => (
                              <li key={i}>
                                  <a href='#' className='text-slate-600 hover:text-blue-600 cursor-pointer transition-colors duration-200 text-sm font-medium'>{link}</a>
                              </li>))}
                      </ul>
                  </div>
              ))}
          </div>
          </div>

          <div className='py-8 text-center'>
            <p className='text-slate-500 text-sm'>
              © 2025 Blogify. Crafted with ❤️ for creators everywhere.
            </p>
            <div className='flex justify-center gap-6 mt-4 text-xs text-slate-400'>
              <a href='#' className='hover:text-blue-600 transition-colors duration-200'>Privacy Policy</a>
              <a href='#' className='hover:text-blue-600 transition-colors duration-200'>Terms of Service</a>
              <a href='#' className='hover:text-blue-600 transition-colors duration-200'>Cookie Policy</a>
            </div>
          </div>
        </div>
    </div>
  )
}

export default Footer