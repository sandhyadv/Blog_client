import { motion } from "motion/react";
import { useEffect, useState } from 'react';
import { blogCategories } from '../assets/assets';
import { useAppContext } from '../context/AppContext';
import BlogCard from './BlogCard';

const BlogList = () => {

  const [menu, setMenu] = useState("All")
  const { blogs, input } = useAppContext()

  const filteredBlogs = () => {
  if (input === '') return blogs;
  return blogs.filter(
    blog =>
      blog.title.toLowerCase().includes(input.toLowerCase()) ||
      blog.category.toLowerCase().includes(input.toLowerCase()) 
  );
};

  return (
    <div className='py-4 px-8 sm:px-16 xl:px-24'>
      {/* Section Title */}
      <div className='text-center mb-4'>
        <h2 className='title-font text-4xl sm:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-700 via-purple-600 to-pink-500 bg-clip-text text-transparent'>
          Discover Stories
        </h2>
        <p className='text-lg text-slate-600 max-w-2xl mx-auto'>
          Explore our curated collection of articles, insights, and creative content from passionate writers
        </p>
      </div>

      {/* Category Filter */}
      <div className="flex flex-wrap justify-center gap-3 sm:gap-6 mb-16">
        {blogCategories.map((item) => (
          <div key={item} className='relative'>
            <button 
              onClick={() => setMenu(item)} 
              className={`px-6 py-3 rounded-full font-medium text-sm transition-all duration-300 relative overflow-hidden ${
                menu === item 
                  ? 'text-white shadow-lg transform scale-105' 
                  : 'text-slate-600 hover:text-blue-600 glass-effect hover:scale-105'
              }`}
            >
              <span className='relative z-10'>{item}</span>
              {menu === item && (
                <motion.div
                  layoutId='category-bg'
                  transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                  className='absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full'
                />
              )}
            </button>
          </div>
        ))}
      </div>

      {/* Blog Grid */}
      <motion.div 
        className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8'
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {filteredBlogs()
          .filter((blog) => menu === "All" ? true : blog.category === menu)
          .map((blog, index) => (
            <motion.div
              key={blog._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <BlogCard blog={blog} />
            </motion.div>
          ))}
      </motion.div>

      {/* Empty State */}
      {filteredBlogs().filter((blog) => menu === "All" ? true : blog.category === menu).length === 0 && (
        <div className='text-center py-16'>
          <div className='w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full flex items-center justify-center'>
            <svg className='w-12 h-12 text-blue-400' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
              <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z' />
            </svg>
          </div>
          <h3 className='title-font text-2xl font-semibold text-slate-700 mb-2'>No blogs found</h3>
          <p className='text-slate-500'>Try adjusting your search or selecting a different category</p>
        </div>
      )}
    </div>
  )
}

export default BlogList
