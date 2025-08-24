import React, { useEffect, useState } from 'react'
import { assets, dashboard_data } from '../assets/assets'
import BlogTableItem from '../components/admin/BlogTableItem'
import { useAppContext } from '../context/AppContext'
import toast from 'react-hot-toast'

const Dashboard = () => {

    const [dashboardData, setDashboardData] = useState({
        blogs: 0,
        comments: 0,
        drafts: 0,
        recentBlogs: []
    })

    const {axios} = useAppContext()

    const fetchDashboard = async () => {
        try {
            const {data} = await axios.get('/api/admin/dashboard')
            data.success ? setDashboardData(data.dashboardData) : toast.error(data.message)

        } catch (error) {
            toast.error(error.message)
        }
    }

    useEffect(() => {
        fetchDashboard()
    }, [])
    return (
        <div className='flex-1 p-6 h-full overflow-auto'>
            {/* Compact Header */}
            <div className='mb-6'>
                <h1 className='title-font text-2xl font-bold text-slate-800'>Dashboard</h1>
                <div className='w-8 h-0.5 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full mt-2'></div>
            </div>

            {/* Compact Stats Cards */}
            <div className='grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6'>
                <div className='glass-effect p-4 rounded-xl hover:scale-[1.02] transition-all cursor-pointer'>
                    <div className='flex items-center gap-3'>
                        <div className='p-2 bg-blue-100 rounded-lg'>
                            <img src={assets.dashboard_icon_1} alt="" className='w-5 h-5' />
                        </div>
                        <div>
                            <p className='text-lg font-bold text-slate-800'>{dashboardData.blogs}</p>
                            <p className='text-xs text-slate-500 font-medium'>Blogs</p>
                        </div>
                    </div>
                </div>

                <div className='glass-effect p-4 rounded-xl hover:scale-[1.02] transition-all cursor-pointer'>
                    <div className='flex items-center gap-3'>
                        <div className='p-2 bg-green-100 rounded-lg'>
                            <img src={assets.dashboard_icon_2} alt="" className='w-5 h-5' />
                        </div>
                        <div>
                            <p className='text-lg font-bold text-slate-800'>{dashboardData.comments}</p>
                            <p className='text-xs text-slate-500 font-medium'>Comments</p>
                        </div>
                    </div>
                </div>

                <div className='glass-effect p-4 rounded-xl hover:scale-[1.02] transition-all cursor-pointer'>
                    <div className='flex items-center gap-3'>
                        <div className='p-2 bg-orange-100 rounded-lg'>
                            <img src={assets.dashboard_icon_2} alt="" className='w-5 h-5' />
                        </div>
                        <div>
                            <p className='text-lg font-bold text-slate-800'>{dashboardData.drafts}</p>
                            <p className='text-xs text-slate-500 font-medium'>Drafts</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Compact Recent Blogs */}
            <div className='glass-effect p-5 rounded-xl'>
                <div className='flex items-center gap-3 mb-4'>
                    <div className='p-2 bg-purple-100 rounded-lg'>
                        <img src={assets.dashboard_icon_4} alt="" className='w-4 h-4' />
                    </div>
                    <h2 className='font-semibold text-slate-800'>Latest Blogs</h2>
                </div>

                <div className='overflow-x-auto'>
                    <table className='w-full text-sm'>
                        <thead>
                            <tr className='border-b border-blue-100/50'>
                                <th className='text-left py-3 px-4 text-xs font-semibold text-slate-600 uppercase'>#</th>
                                <th className='text-left py-3 px-4 text-xs font-semibold text-slate-600 uppercase'>Blog Title</th>
                                <th className='text-left py-3 px-4 text-xs font-semibold text-slate-600 uppercase max-sm:hidden'>Date</th>
                                <th className='text-left py-3 px-4 text-xs font-semibold text-slate-600 uppercase max-sm:hidden'>Status</th>
                                <th className='text-left py-3 px-4 text-xs font-semibold text-slate-600 uppercase'>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {dashboardData.recentBlogs.map((blog, index) => {
                                return <BlogTableItem key={blog._id} blog={blog} fetchBlogs={fetchDashboard} index={index + 1} />
                            })}
                        </tbody>
                    </table>

                    {dashboardData.recentBlogs.length === 0 && (
                        <div className='text-center py-8'>
                            <div className='w-12 h-12 mx-auto mb-3 bg-blue-100 rounded-full flex items-center justify-center'>
                                <svg className='w-6 h-6 text-blue-400' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z' />
                                </svg>
                            </div>
                            <p className='text-sm text-slate-500'>No recent blogs</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Dashboard