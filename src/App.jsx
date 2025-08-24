import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Blog from './pages/Blog'
import Layout from './admin/Layout'
import Dashboard from './admin/Dashboard'
import AddBlog from './admin/AddBlog'
import ListBlog from './admin/ListBlog'
import Comments from './admin/Comments'
import AdminLogin from './components/admin/Login'
import 'quill/dist/quill.snow.css'
import {Toaster} from 'react-hot-toast'
import { useAppContext } from './context/AppContext'

const App = () => {

  const {token} = useAppContext()
  return (
    <div>
      <Toaster/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/blog/:id" element={<Blog />} />
        
        <Route path="/admin" element={token ? <Layout /> : <AdminLogin/>}>
          <Route index element={<Dashboard />} />
          <Route path="addBlog" element={<AddBlog />} />   
          <Route path="listBlog" element={<ListBlog />} />
          <Route path="comments" element={<Comments />} />
        </Route>
        
        <Route path="*" element={
          <div className='min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/30 flex items-center justify-center'>
            <div className='text-center'>
              <h1 className='text-4xl font-bold text-slate-800 mb-4'>404 - Page Not Found</h1>
              <p className='text-slate-600 mb-8'>The page you're looking for doesn't exist.</p>
              <button 
                onClick={() => window.location.href = '/'}
                className='hydrangea-btn-primary px-6 py-3'
              >
                Go Home
              </button>
            </div>
          </div>
        } />
      </Routes>
    </div>
  )
}

export default App