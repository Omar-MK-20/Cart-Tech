import ProductContainer from '@/components/product/ProductContainer'
import { ProductI } from '@/interfaces'
import { productServices } from '@/services/product'
import { error } from 'console'
import React from 'react'

async function ProductPage() {

  const products: ProductI[] = (await productServices.getAll()).data

  console.log(products)


  return (

    <div className='pt-10'>
      <ProductContainer products={products} />
    </div>
  )
}

export default ProductPage