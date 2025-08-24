import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import CommentTableItem from '../components/admin/CommentTableItem'
import { useAppContext } from '../context/AppContext'

const Comments = () => {
  const [comments, setComments] = useState([])
  const [filter, setFilter] = useState('Not Approved')

  const {axios} = useAppContext();

  const fetchComments = async () => {
    try {
      const {data} = await axios.get('/api/admin/comments')
      data.success ? setComments(data.comments) : toast.error()
    } catch (error) {
      toast.error(error.message)
    }
  }

  useEffect(() => {
    fetchComments()
  }, [])

  return (
    <div className='flex-1 p-6 h-full overflow-auto'>
      {/* Header */}
      <div className='mb-8'>
        <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4'>
          <div>
            <h1 className='title-font text-2xl font-bold text-slate-800 mb-2'>Comments Management</h1>
            <p className='text-slate-600'>Review and moderate user comments</p>
            <div className='w-12 h-1 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full mt-3'></div>
          </div>
          
          {/* Filter Buttons */}
          <div className='flex gap-3'>
            <button 
              onClick={() => setFilter('Approved')} 
              className={`px-6 py-3 rounded-xl font-medium text-sm transition-all duration-300 ${
                filter === 'Approved' 
                  ? 'hydrangea-btn-primary text-white shadow-lg' 
                  : 'glass-effect text-slate-600 hover:text-blue-600 hover:scale-105'
              }`}
            >
              ✓ Approved
            </button>

            <button 
              onClick={() => setFilter('Not Approved')} 
              className={`px-6 py-3 rounded-xl font-medium text-sm transition-all duration-300 ${
                filter === 'Not Approved' 
                  ? 'hydrangea-btn-secondary text-white shadow-lg' 
                  : 'glass-effect text-slate-600 hover:text-pink-600 hover:scale-105'
              }`}
            >
              ⏳ Pending
            </button>
          </div>
        </div>
      </div>

      {/* Comments Table */}
      <div className='hydrangea-card p-6'>
        <div className='flex items-center gap-4 mb-6'>
          <div className='p-3 bg-gradient-to-br from-pink-100 to-pink-200 rounded-xl'>
            <svg className='w-6 h-6 text-pink-600' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
              <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z' />
            </svg>
          </div>
          <div>
            <h2 className='title-font text-xl font-semibold text-slate-800'>
              {filter === 'Approved' ? 'Approved Comments' : 'Pending Approval'}
            </h2>
            <p className='text-sm text-slate-500'>
              {comments.filter((comment) => {
                if(filter === "Approved") return comment.isApproved === true;
                return comment.isApproved === false;
              }).length} comments
            </p>
          </div>
        </div>

        <div className='overflow-x-auto'>
          <table className='w-full'>
            <thead>
              <tr className='border-b border-blue-100'>
                <th className='text-left py-4 px-6 text-sm font-semibold text-slate-600 uppercase tracking-wider'>Blog Title & Comment</th>
                <th className='text-left py-4 px-6 text-sm font-semibold text-slate-600 uppercase tracking-wider max-sm:hidden'>Date</th>
                <th className='text-left py-4 px-6 text-sm font-semibold text-slate-600 uppercase tracking-wider'>Actions</th>
              </tr>
            </thead>
            <tbody className='divide-y divide-blue-50'>
              {comments.filter((comment) => {
                if(filter === "Approved") return comment.isApproved === true;
                return comment.isApproved === false;
              }).map((comment, index) => 
                <CommentTableItem 
                  key={comment._id} 
                  comment={comment} 
                  index={index + 1} 
                  fetchComments={fetchComments}
                />
              )}
            </tbody>
          </table>

          {/* Empty State */}
          {comments.filter((comment) => {
            if(filter === "Approved") return comment.isApproved === true;
            return comment.isApproved === false;
          }).length === 0 && (
            <div className='text-center py-12'>
              <div className='w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-pink-100 to-purple-100 rounded-full flex items-center justify-center'>
                <svg className='w-8 h-8 text-pink-400' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z' />
                </svg>
              </div>
              <h3 className='title-font text-lg font-semibold text-slate-700 mb-2'>
                No {filter.toLowerCase()} comments
              </h3>
              <p className='text-slate-500'>
                {filter === 'Approved' 
                  ? 'No approved comments to display yet'
                  : 'No comments awaiting approval'
                }
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Comments