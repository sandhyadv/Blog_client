import toast from 'react-hot-toast';
import { assets } from '../../assets/assets';
import { useAppContext } from '../../context/AppContext';

const CommentTableItem = ({ comment, fetchComments }) => {

  const { blog, createdAt, _id } = comment;
  const BlogData = new Date(createdAt);

  const { axios } = useAppContext()

  const approvedComment = async () => {
    try {
      const { data } = await axios.post('/api/admin/approve-comment', { id: _id })
      if (data.success) {
        toast.success(data.message)
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

   const deleteComment = async () => {
    try {
      const confirm = window.confirm('Are you sure you want to delete this comment?');
      if (!confirm) return;

      const { data } = await axios.post('/api/admin/delete-comment', { id: _id })
      if (data.success) {
        toast.success(data.message)
        fetchComments()
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  return (
    <tr className='hover:bg-blue-50/30 transition-colors duration-200'>
      <td className='py-6 px-6'>
        <div className='space-y-3'>
          <div className='flex items-start justify-between'>
            <div className='flex-1'>
              <div className='flex items-center gap-2 mb-2'>
                <div className='w-2 h-2 bg-blue-400 rounded-full'></div>
                <span className='text-sm font-semibold text-slate-800 truncate max-w-md'>{blog.title}</span>
              </div>
              
              <div className='bg-gradient-to-r from-blue-50 to-purple-50 p-4 rounded-xl border border-blue-100'>
                <div className='flex items-center gap-2 mb-2'>
                  <div className='w-8 h-8 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full flex items-center justify-center text-white font-semibold text-sm'>
                    {comment.name.charAt(0).toUpperCase()}
                  </div>
                  <span className='text-sm font-medium text-slate-700'>{comment.name}</span>
                </div>
                <p className='text-sm text-slate-600 leading-relaxed'>{comment.content}</p>
              </div>
            </div>
          </div>
        </div>
      </td>

      <td className='py-6 px-6 max-sm:hidden'>
        <span className='text-sm text-slate-600'>{BlogData.toLocaleDateString()}</span>
      </td>

      <td className='py-6 px-6'>
        <div className='flex items-center gap-2'>
          {!comment.isApproved ? (
            <button
              onClick={approvedComment}
              className='hydrangea-btn-primary p-2 rounded-lg text-white hover:scale-110 transition-all duration-200'
              title="Approve Comment"
            >
              <img src={assets.tick_icon} className='w-4 h-4' alt="Approve" />
            </button>
          ) : (
            <span className='inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700 border border-green-200'>
              <div className='w-2 h-2 rounded-full bg-green-400 mr-2'></div>
              Approved
            </span>
          )}
          <button
            onClick={deleteComment}
            className='p-2 rounded-lg bg-red-100 text-red-600 hover:bg-red-200 border border-red-200 transition-all duration-200 hover:scale-110'
            title="Delete Comment"
          >
            <img src={assets.bin_icon} alt="Delete" className='w-4 h-4' />
          </button>
        </div>
      </td>
    </tr>
  )
}

export default CommentTableItem