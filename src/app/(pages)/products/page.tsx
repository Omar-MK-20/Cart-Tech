import ProductContainer from '@/components/product/ProductContainer'
import { ProductI } from '@/interfaces'
import { productService } from '@/services/product'
import { error } from 'console'
import React from 'react'

async function ProductPage() {

  const products: ProductI[] = (await productService.getAll()).data



  return (

    <div className='pt-10'>
      <ProductContainer products={products} />
    </div>
  )
}

export default ProductPage