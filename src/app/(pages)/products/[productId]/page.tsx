import ProductContainer from '@/components/product/ProductContainer'
import { ProductI } from '@/interfaces'
import { productService } from '@/services/product'
import { useParams } from 'next/navigation'
import React from 'react'

async function ProductPage() {


    const productId = useParams().productId

    const products: ProductI[] = (await productService.getAll()).data



    return (

        <div className='pt-10'>
            <ProductContainer products={products} />
        </div>
    )
}

export default ProductPage