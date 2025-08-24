import React from 'react'
import { NavLink } from 'react-router-dom'
import { assets } from '../../assets/assets'

const Sidebar = () => {
  return (
    <div className='flex flex-col min-h-full w-64 glass-effect border-r border-blue-100/50 py-4 pr-4'>
        {/* Sidebar Header */}
        <div className='mb-6 pl-4'>
          <h2 className='title-font text-lg font-semibold text-slate-800'>Admin Panel</h2>
          <div className='w-8 h-0.5 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full mt-1 opacity-60'></div>
        </div>

        {/* Navigation Links */}
        <nav className='space-y-1.5 pl-4'>
          <NavLink 
            end={true} 
            to='/admin'
          > 
            {({isActive}) => (
              <div className={`flex items-center gap-3 py-3 px-4 rounded-xl transition-all duration-300 font-medium ${
                isActive 
                  ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg scale-[1.02]" 
                  : "text-slate-600 hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 hover:text-blue-600 hover:scale-[1.02]"
              }`}>
                <div className={`p-1.5 rounded-lg ${isActive ? 'bg-white/20' : 'bg-blue-100'}`}>
                  <img src={assets.home_icon} alt='Home' className='w-4 h-4'/>
                </div>
                <p className='text-sm'>Dashboard</p>
              </div>
            )}
          </NavLink>

          <NavLink 
            to='/admin/addBlog'
          > 
            {({isActive}) => (
              <div className={`flex items-center gap-3 py-3 px-4 rounded-xl transition-all duration-300 font-medium ${
                isActive 
                  ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg scale-[1.02]" 
                  : "text-slate-600 hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 hover:text-blue-600 hover:scale-[1.02]"
              }`}>
                <div className={`p-1.5 rounded-lg ${isActive ? 'bg-white/20' : 'bg-green-100'}`}>
                  <img src={assets.add_icon} alt='Add Blog' className='w-4 h-4'/>
                </div>
                <p className='text-sm'>Add Blog</p>
              </div>
            )}
          </NavLink>

          <NavLink 
            to='/admin/listBlog'
          > 
            {({isActive}) => (
              <div className={`flex items-center gap-3 py-3 px-4 rounded-xl transition-all duration-300 font-medium ${
                isActive 
                  ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg scale-[1.02]" 
                  : "text-slate-600 hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 hover:text-blue-600 hover:scale-[1.02]"
              }`}>
                <div className={`p-1.5 rounded-lg ${isActive ? 'bg-white/20' : 'bg-orange-100'}`}>
                  <img src={assets.list_icon} alt='List Blogs' className='w-4 h-4'/>
                </div>
                <p className='text-sm'>Blog Lists</p>
              </div>
            )}
          </NavLink>

          <NavLink 
            to='/admin/comments'
          > 
            {({isActive}) => (
              <div className={`flex items-center gap-3 py-3 px-4 rounded-xl transition-all duration-300 font-medium ${
                isActive 
                  ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg scale-[1.02]" 
                  : "text-slate-600 hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 hover:text-blue-600 hover:scale-[1.02]"
              }`}>
                <div className={`p-1.5 rounded-lg ${isActive ? 'bg-white/20' : 'bg-pink-100'}`}>
                  <img src={assets.comment_icon} alt='Comments' className='w-4 h-4'/>
                </div>
                <p className='text-sm'>Comments</p>
              </div>
            )}
          </NavLink>
        </nav>

        {/* Sidebar Footer */}
        <div className='mt-auto pt-4 pl-4'>
          <div className='p-3 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl border border-blue-100'>
            <div className='flex items-center gap-2 mb-1'>
              <div className='w-2 h-2 bg-green-400 rounded-full animate-pulse'></div>
              <span className='text-xs font-medium text-slate-700'>System Online</span>
            </div>
            <p className='text-xs text-slate-500'>All services running</p>
          </div>
        </div>
    </div>
  )
}

export default Sidebar