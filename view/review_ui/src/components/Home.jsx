import React from 'react'
import Footer from './Footer'
import Hero from './Hero'
import Navbar from './Navbar'

function Home() {
  return (
    <div >
        <Hero/>
        <div className='bg-purple-500/90'>
        <Footer/>
        </div>
    </div>
  )
}

export default Home