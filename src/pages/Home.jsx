import React from 'react'
import Hero from '../components/Hero'
import BestSelling from './BestSelling'
import DAddProduct from './Dashboard/DAddProduct'
import ProductDetails from './ProductDetails'
import AddProduct from './Dashboard/AddProduct'

const Home = () => {
  return (
    <div className='min-h-screen bg-zinc-900'>
      <Hero/>
      <BestSelling/>
      <AddProduct/>
    </div>
  )
}

export default Home
