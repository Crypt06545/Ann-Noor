import React from 'react'
import Hero from '../components/Hero'
import BestSelling from './BestSelling'
import DAddProduct from './Dashboard/DAddProduct'
import ProductDetails from './ProductDetails'

const Home = () => {
  return (
    <div className='min-h-screen bg-zinc-900'>
      <Hero/>
      <BestSelling/>
      <DAddProduct/>
      <ProductDetails/>
    </div>
  )
}

export default Home
