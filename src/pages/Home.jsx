import React from 'react'
import Hero from '../components/Hero'
import BestSelling from './BestSelling'
import ProductDetails from './ProductDetails'
import AddProduct from './Dashboard/AddProduct'
import CheckoutPage from './Shipping'

const Home = () => {
  return (
    <div className='min-h-screen bg-zinc-900'>
      <Hero/>
      <BestSelling/>
      <AddProduct/>
      <CheckoutPage/>
    </div>
  )
}

export default Home
