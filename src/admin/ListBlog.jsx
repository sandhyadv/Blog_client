import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import BlogTableItem from '../components/admin/BlogTableItem';
import { useAppContext } from '../context/AppContext';

const ListBlog = () => {
    const [blogs, setBlogs] = useState([]);

    const { axios } = useAppContext()

    const fetchBlogs = async () => {
        try {
            const { data } = await axios.get('/api/admin/blogs')
            if (data.success) {
                setBlogs(data.blogs)
            } else {
                toast.error(data.message)

            }
        } catch (error) {
            toast.error(error.message)
        }
    }

    useEffect(() => {
        fetchBlogs()
    }, [])

    return (
        <div className='flex-1 p-6 flex flex-col overflow-hidden'>
            {/* Fixed Header - No Scroll */}
            <div className='mb-6 flex-shrink-0'>
                <h1 className='title-font text-2xl font-bold text-slate-800 mb-2'>All Blogs</h1>
                <p className='text-slate-600'>Manage and monitor all your blog posts</p>
                <div className='w-8 h-0.5 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full mt-2 opacity-60'></div>
            </div>

            {/* Fixed Stats Overview - No Scroll */}
            <div className='grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6 flex-shrink-0'>
                <div className='glass-effect p-4 rounded-xl'>
                    <div className='flex items-center gap-3'>
                        <div className='p-2 bg-gradient-to-br from-blue-100 to-blue-200 rounded-lg'>
                            <svg className='w-5 h-5 text-blue-600' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z' />
                            </svg>
                        </div>
                        <div>
                            <p className='text-lg font-bold text-slate-800'>{blogs.length}</p>
                            <p className='text-sm text-slate-500'>Total Blogs</p>
                        </div>
                    </div>
                </div>

                <div className='glass-effect p-4 rounded-xl'>
                    <div className='flex items-center gap-3'>
                        <div className='p-2 bg-gradient-to-br from-green-100 to-green-200 rounded-lg'>
                            <svg className='w-5 h-5 text-green-600' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M5 13l4 4L19 7' />
                            </svg>
                        </div>
                        <div>
                            <p className='text-lg font-bold text-slate-800'>{blogs.filter(blog => blog.isPublished).length}</p>
                            <p className='text-sm text-slate-500'>Published</p>
                        </div>
                    </div>
                </div>

                <div className='glass-effect p-4 rounded-xl'>
                    <div className='flex items-center gap-3'>
                        <div className='p-2 bg-gradient-to-br from-orange-100 to-orange-200 rounded-lg'>
                            <svg className='w-5 h-5 text-orange-600' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z' />
                            </svg>
                        </div>
                        <div>
                            <p className='text-lg font-bold text-slate-800'>{blogs.filter(blog => !blog.isPublished).length}</p>
                            <p className='text-sm text-slate-500'>Drafts</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Table Container - ONLY THIS SCROLLS */}
            <div className='flex-1 min-h-0 hydrangea-card'>
                {/* Fixed Table Header */}
                <div className='p-5 pb-3 flex-shrink-0'>
                    <div className='flex items-center gap-3'>
                        <div className='p-2 bg-gradient-to-br from-blue-100 to-blue-200 rounded-lg'>
                            <svg className='w-5 h-5 text-blue-600' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10' />
                            </svg>
                        </div>
                        <div>
                            <h2 className='title-font text-lg font-semibold text-slate-800'>Blog Posts</h2>
                            <p className='text-xs text-slate-500'>Manage all your blog content</p>
                        </div>
                    </div>
                </div>

                {/* ONLY TABLE SCROLLS - Nothing Else */}
                <div className='px-5 pb-5'>
                    <div className='max-h-96 overflow-y-auto overflow-x-hidden border border-blue-100 rounded-lg'>
                        <table className='w-full'>
                            <thead className='sticky top-0 bg-white/95 backdrop-blur-sm z-10'>
                                <tr className='border-b border-blue-100'>
                                    <th className='text-left py-3 px-4 text-xs font-semibold text-slate-600 uppercase tracking-wider'>#</th>
                                    <th className='text-left py-3 px-4 text-xs font-semibold text-slate-600 uppercase tracking-wider'>Blog Title</th>
                                    <th className='text-left py-3 px-4 text-xs font-semibold text-slate-600 uppercase tracking-wider max-sm:hidden'>Date</th>
                                    <th className='text-left py-3 px-4 text-xs font-semibold text-slate-600 uppercase tracking-wider max-sm:hidden'>Status</th>
                                    <th className='text-left py-3 px-4 text-xs font-semibold text-slate-600 uppercase tracking-wider'>Actions</th>
                                </tr>
                            </thead>
                            <tbody className='divide-y divide-blue-50 bg-white'>
                                {blogs.map((blog, index) => {
                                    return <BlogTableItem key={blog._id} blog={blog} fetchBlogs={fetchBlogs} index={index + 1} />
                                })}
                            </tbody>
                        </table>

                        {/* Empty State - Inside Scrollable Area */}
                        {blogs.length === 0 && (
                            <div className='text-center py-12 bg-white'>
                                <div className='w-12 h-12 mx-auto mb-3 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full flex items-center justify-center'>
                                    <svg className='w-6 h-6 text-blue-400' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                                        <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z' />
                                    </svg>
                                </div>
                                <h3 className='title-font text-base font-semibold text-slate-700 mb-2'>No blogs found</h3>
                                <p className='text-sm text-slate-500 mb-4'>Start creating amazing content for your audience</p>
                                <button className='bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg text-white text-sm font-medium transition-all duration-300'>
                                    Create Your First Blog
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ListBlog