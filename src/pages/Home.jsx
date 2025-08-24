import React from 'react'
import Navbar from '../components/Navbar'
import Header from '../components/Header'
import BlogList from '../components/BlogList'
import NewsLetter from '../components/NewsLetter'
import Footer from '../components/Footer'

const Home = () => {
  return (
   <div className='min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/30'>
     <Navbar />
     <Header/>
     <BlogList />
     <NewsLetter />
     <Footer />
   </div>
  )
}

export default Home