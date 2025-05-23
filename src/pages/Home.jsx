import React from 'react'
import Hero from '../components/Hero'
import BestSelling from './BestSelling'
import ProductDetails from './ProductDetails'
import AddProduct from './Dashboard/AddProduct'
import WhatsAppFloatingButton from '../components/WhatsAppFloatingButton'

const Home = () => {
  return (
    <div className='min-h-screen bg-zinc-900'>
      <Hero/>
      <BestSelling/>
      <WhatsAppFloatingButton/>
    </div>
  )
}

export default Home
