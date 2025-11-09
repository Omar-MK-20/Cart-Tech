"use client"

import Loading from '@/app/loading'
import NotFound from '@/app/not-found'
import ProductContainer from '@/components/product/ProductContainer'
import { GetAllResponseI, ProductI } from '@/interfaces'
import { productService } from '@/services/product'
import { useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'

function ProductPage() {

  const searchParams = useSearchParams();
  const categoryId = searchParams.get("category[in]");


  const [products, setProducts] = useState<ProductI[] | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(true)

  async function getProducts() {
    setIsLoading(true);
    let res: GetAllResponseI<ProductI>
    if(categoryId)
    {
      res = await productService.getByCategory(categoryId)
    }
    else
    {
      res = await productService.getAll();
    }
    setProducts(res.data);
    setIsLoading(false);
  }





  useEffect(() => {
    getProducts();
  }, [categoryId])

  return (

    <div className='pt-10'>
      {isLoading
        ?
        <Loading />
        :
        !products
          ?
          <NotFound/>
          :
          <ProductContainer products={products} />}
    </div>
  )
}

export default ProductPage