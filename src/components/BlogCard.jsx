import React from 'react'
import { useNavigate } from 'react-router-dom'

const BlogCard = ({ blog }) => {

  const { title, description, category, image, _id } = blog;
  const navigate = useNavigate();
  
  return (
    <div 
      onClick={() => navigate(`/blog/${_id}`)} 
      className='hydrangea-card w-full rounded-2xl overflow-hidden cursor-pointer group'
    >
      <div className='relative overflow-hidden'>
        <img 
          src={image} 
          alt={title} 
          className='aspect-video w-full object-cover transition-transform duration-500 group-hover:scale-110' 
        />
        <div className='absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300'></div>
      </div>
      
      <div className='p-6'>
        <div className='flex items-center justify-between mb-4'>
          <span className='px-4 py-2 bg-gradient-to-r from-blue-100 to-purple-100 text-blue-700 rounded-full text-sm font-medium border border-blue-200/50'>
            {category}
          </span>
          <div className='w-2 h-2 bg-gradient-to-r from-pink-400 to-purple-400 rounded-full'></div>
        </div>

        <h5 className='title-font text-xl font-semibold text-slate-800 mb-3 leading-tight group-hover:text-blue-700 transition-colors duration-300'>
          {title}
        </h5>
        
        <p 
          className='text-sm text-slate-600 leading-relaxed line-clamp-3' 
          dangerouslySetInnerHTML={{ "__html": description.slice(0, 120) + "..." }}
        ></p>
        
        <div className='mt-4 flex items-center justify-between'>
          <span className='text-xs text-slate-500 font-medium'>Read more</span>
          <div className='w-6 h-6 rounded-full bg-gradient-to-r from-blue-400 to-purple-400 flex items-center justify-center group-hover:scale-110 transition-transform duration-300'>
            <svg className='w-3 h-3 text-white' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
              <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M9 5l7 7-7 7' />
            </svg>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BlogCard