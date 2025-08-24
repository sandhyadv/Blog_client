import Quill from 'quill';
import { useEffect, useRef, useState } from 'react';
import { assets, blogCategories } from '../assets/assets';
import { useAppContext } from '../context/AppContext';
import toast from 'react-hot-toast';
import { parse } from 'marked'

const AddBlog = () => {

  const { axios } = useAppContext()
  const [isAdding, setIsAdding] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const editorRef = useRef(null)
  const quillRef = useRef(null)

  const [image, setImage] = useState(false);
  const [title, setTitle] = useState('');
  const [subTitle, setSubTitle] = useState('');
  const [category, setCategory] = useState('Startup');
  const [isPublished, setIsPublished] = useState(false);

  const onSubmitHeader = async (e) => {
    try {
      e.preventDefault();
      setIsAdding(true)

      const blog = {
        title, subTitle, description: quillRef.current.root.innerHTML,
        category, isPublished
      }

      const formData = new FormData()
      formData.append('blog', JSON.stringify(blog))
      formData.append('image', image)

      const { data } = await axios.post('/api/blog/add', formData);

      if (data.success) {
        toast.success(data.message);
        setImage(false)
        setTitle('')
        quillRef.current.root.innerHTML = ''
        setCategory('StartUp')
      } else {
        toast.error(data.message)

      }
    } catch (error) {
      toast.error(error.message)
    } finally {
      setIsAdding(false)
    }
    e.preventDefault();
  }

  const generateContent = async () => {
    if (!title) return toast.error('Please enter a title')
    try {
      setIsLoading(true)
      const response = await axios.post('/api/blog/generate', { prompt: title })
      const { success, content, message } = response.data
      
      if (success) {
        quillRef.current.root.innerHTML = parse(content)
      } else {
        toast.error(message)
      }
    } catch (error) {
      toast.error(error.message)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    if (!quillRef.current && editorRef.current) {
      quillRef.current = new Quill(editorRef.current, { theme: 'snow' })
    }

  }, [])

  return (
    <div className='flex-1 p-6 h-full overflow-auto'>
      {/* Compact Header */}
      <div className='mb-6'>
        <h1 className='title-font text-2xl font-bold text-slate-800'>Create New Blog</h1>
        <p className='text-sm text-slate-500'>Share your thoughts and ideas with the world</p>
        <div className='w-8 h-0.5 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full mt-2'></div>
      </div>

      <form onSubmit={onSubmitHeader} className='max-w-5xl'>
        <div className='glass-effect p-5 rounded-xl space-y-5'>
          
          {/* Compact Thumbnail Upload */}
          <div className='space-y-2'>
            <label className='text-sm font-semibold text-slate-700'>Blog Thumbnail</label>
            <label htmlFor='image' className='block'>
              <div className='relative group cursor-pointer overflow-hidden rounded-xl'>
                {!image ? (
                  <div className='w-full max-w-sm h-32 border-2 border-dashed border-blue-300 rounded-xl bg-gradient-to-br from-blue-50 to-purple-50 group-hover:from-blue-100 group-hover:to-purple-100 group-hover:border-blue-400 transition-all duration-300 flex flex-col items-center justify-center'>
                    <div className='p-3 bg-white rounded-full shadow-lg group-hover:shadow-xl group-hover:scale-110 transition-all duration-300 mb-2'>
                      <svg className='w-6 h-6 text-blue-500' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                        <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12' />
                      </svg>
                    </div>
                    <p className='text-sm font-medium text-blue-600 group-hover:text-blue-700 transition-colors'>Upload Image</p>
                    <p className='text-xs text-slate-400 mt-1'>Click to browse</p>
                  </div>
                ) : (
                  <div className='relative w-full max-w-sm h-32 rounded-xl overflow-hidden group'>
                    <img 
                      src={URL.createObjectURL(image)} 
                      alt='Thumbnail' 
                      className='w-full h-full object-cover group-hover:scale-105 transition-transform duration-300' 
                    />
                    <div className='absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center'>
                      <div className='opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-white rounded-full p-2 shadow-lg'>
                        <svg className='w-5 h-5 text-blue-600' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                          <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12' />
                        </svg>
                      </div>
                    </div>
                    <div className='absolute top-2 right-2 bg-green-500 text-white text-xs px-2 py-1 rounded-full font-medium'>
                      ✓ Uploaded
                    </div>
                  </div>
                )}
              </div>
          <input onChange={(e) => setImage(e.target.files[0])} type='file' id='image' hidden required />
        </label>
          </div>

          {/* Compact Title and Subtitle */}
          <div className='grid grid-cols-1 lg:grid-cols-2 gap-4'>
            <div className='space-y-2'>
              <label className='text-sm font-semibold text-slate-700'>Blog Title</label>
              <input 
                type='text' 
                placeholder='Enter an engaging title...' 
                required 
                className='w-full px-3 py-2 bg-white/80 border border-blue-200/50 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-300 focus:border-transparent transition-all duration-300'
                onChange={(e) => setTitle(e.target.value)} 
                value={title} 
              />
            </div>

            <div className='space-y-2'>
              <label className='text-sm font-semibold text-slate-700'>Sub Title</label>
              <input 
                type='text' 
                placeholder='Add a compelling subtitle...' 
                required 
                className='w-full px-3 py-2 bg-white/80 border border-blue-200/50 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-300 focus:border-transparent transition-all duration-300'
                onChange={(e) => setSubTitle(e.target.value)} 
                value={subTitle} 
              />
            </div>
          </div>

          {/* Compact Content Editor */}
          <div className='space-y-2'>
            <div className='flex items-center justify-between'>
              <label className='text-sm font-semibold text-slate-700'>Blog Content</label>
              <div className='flex items-center gap-2 text-xs text-slate-500'>
                <svg className='w-3 h-3' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M13 10V3L4 14h7v7l9-11h-7z' />
                </svg>
                <span>AI Assistant</span>
              </div>
            </div>
            
            <div className='relative bg-gradient-to-br from-white to-blue-50/30 rounded-xl border border-blue-200/50 shadow-sm overflow-hidden'>
              <div className='min-h-[250px] p-4'>
                <div ref={editorRef} className='prose prose-sm max-w-none'></div>
              </div>
              
          {isLoading && (
                <div className='absolute inset-0 bg-white/95 backdrop-blur-sm flex items-center justify-center'>
                  <div className='flex flex-col items-center gap-3'>
                    <div className='relative'>
                      <div className='w-8 h-8 rounded-full border-2 border-blue-200 border-t-blue-500 animate-spin'></div>
                      <div className='absolute inset-0 w-8 h-8 rounded-full border-2 border-purple-200 border-t-purple-500 animate-spin animation-delay-150'></div>
                    </div>
                    <div className='text-center'>
                      <span className='text-slate-700 text-sm font-medium'>AI is crafting your content...</span>
                      <p className='text-xs text-slate-500 mt-1'>This may take a moment</p>
                    </div>
                  </div>
                </div>
              )}
              
              <div className='p-3 border-t border-blue-100/70 bg-gradient-to-r from-blue-50/50 to-purple-50/50 backdrop-blur-sm'>
                <div className='flex items-center justify-between'>
                  <div className='flex items-center gap-2 text-xs text-slate-500'>
                    <div className='w-2 h-2 bg-green-400 rounded-full animate-pulse'></div>
                    <span>AI Assistant Ready</span>
                  </div>
                  <button 
                    disabled={isLoading} 
                    type='button' 
                    onClick={generateContent} 
                    className='group bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white px-4 py-1.5 rounded-lg text-sm font-medium transition-all duration-300 flex items-center gap-2 shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed'
                  >
                    <svg className='w-3 h-3 group-hover:rotate-12 transition-transform duration-300' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                      <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M13 10V3L4 14h7v7l9-11h-7z' />
                    </svg>
                    Generate Content
                  </button>
                </div>
              </div>
            </div>
        </div>

          {/* Compact Category and Settings */}
          <div className='grid grid-cols-1 lg:grid-cols-2 gap-4'>
            <div className='space-y-2'>
              <label className='text-sm font-semibold text-slate-700'>Category</label>
              <select 
                onChange={e => setCategory(e.target.value)} 
                name="category" 
                className='w-full px-3 py-2 bg-white/80 border border-blue-200/50 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-300 focus:border-transparent transition-all duration-300'
              >
                <option value="">Select a category</option>
          {blogCategories.map((item, index) => {
            return <option key={index} value={item}>{item}</option>
          })}
        </select>
        </div>

            <div className='space-y-2'>
              <label className='text-sm font-semibold text-slate-700'>Publishing Options</label>
              <div className='flex items-center gap-3 p-3 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border border-blue-100'>
                <div className='flex items-center gap-2'>
                  <input 
                    type='checkbox' 
                    checked={isPublished} 
                    className='w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500' 
                    onChange={e => setIsPublished(e.target.checked)} 
                  />
                  <span className='text-slate-700 text-sm font-medium'>Publish now</span>
                </div>
                <div className='ml-auto'>
                  <div className={`w-2 h-2 rounded-full ${isPublished ? 'bg-green-500' : 'bg-orange-400'}`}></div>
                </div>
              </div>
            </div>
      </div>

          {/* Compact Submit Button */}
          <div className='flex justify-end pt-4'>
            <button 
              disabled={isAdding} 
              type='submit' 
              className='bg-blue-600 hover:bg-blue-700 px-6 py-2 rounded-lg text-white text-sm font-medium transition-all duration-300 flex items-center gap-2 disabled:opacity-50'
            >
              {isAdding ? (
                <>
                  <div className='w-4 h-4 rounded-full border-2 border-white/30 border-t-white animate-spin'></div>
                  Creating...
                </>
              ) : (
                <>
                  <svg className='w-4 h-4' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M12 4v16m8-8H4' />
                  </svg>
                  Create Blog
                </>
              )}
            </button>
          </div>
        </div>
    </form>
    </div>
  )
}

export default AddBlog