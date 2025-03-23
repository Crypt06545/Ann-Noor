import React from 'react'
import Hero from '../components/Hero'
import BestSelling from './BestSelling'

const Home = () => {
  return (
    <div className='min-h-screen bg-zinc-900'>
      <Hero/>
      <BestSelling/>
    </div>
  )
}

export default Home
