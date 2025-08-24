import toast from 'react-hot-toast';
import { assets } from '../../assets/assets';
import { useAppContext } from '../../context/AppContext';

const BlogTableItem = ({ blog, fetchBlogs, index }) => {

  const { title, createdAt } = blog;
  const BlogDate = new Date(createdAt)

  const { axios } = useAppContext();

  const deleteBlog = async () => {
    const confirm = window.confirm('Are you sure do u want to delete this blog?')
    if (!confirm) return;

    try {
      const { data } = await axios.post('/api/blog/delete', { id: blog._id })
      if (data.success) {
        toast.success(data.message)
        await fetchBlogs()
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  const togglePublish = async () => {
    try {
      const { data } = await axios.post('/api/blog/toggle-publish', { id: blog._id })
      if (data.success) {
        toast.success(data.message)
        await fetchBlogs()
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }
  return (
    <tr className='hover:bg-blue-50/30 transition-colors duration-200'>
      <td className='py-3 px-4 text-sm text-slate-700'>{index}</td>
      <td className='py-3 px-4'>
        <p className='text-sm font-medium text-slate-800 truncate max-w-xs'>{title}</p>
      </td>
      <td className='py-3 px-4 max-sm:hidden text-sm text-slate-600'>
        {BlogDate.toDateString()}
      </td>
      <td className='py-3 px-4 max-sm:hidden'>
        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
          blog.isPublished 
            ? 'bg-green-100 text-green-600' 
            : 'bg-orange-100 text-orange-600'
        }`}>
          <div className={`w-1.5 h-1.5 rounded-full mr-1.5 ${blog.isPublished ? 'bg-green-500' : 'bg-orange-500'}`}></div>
          {blog.isPublished ? 'Live' : 'Draft'}
        </span>
      </td>
      <td className='py-3 px-4'>
        <div className='flex items-center gap-2'>
          <button 
            onClick={togglePublish} 
            className={`px-3 py-1 rounded-lg text-xs font-medium transition-all duration-200 ${
              blog.isPublished
                ? 'bg-orange-100 text-orange-600 hover:bg-orange-200'
                : 'bg-blue-100 text-blue-600 hover:bg-blue-200'
            }`}
          >
            {blog.isPublished ? 'Hide' : 'Publish'}
          </button>
          <button
            onClick={deleteBlog}
            className='p-1.5 rounded-lg bg-red-100 text-red-600 hover:bg-red-200 hover:scale-105 transition-all duration-200 group'
            title="Delete Blog"
          >
            <img src={assets.delete_icon} className='w-3.5 h-3.5 group-hover:brightness-110' alt="Delete" />
          </button>
        </div>
      </td>
    </tr>
  )
}

export default BlogTableItem