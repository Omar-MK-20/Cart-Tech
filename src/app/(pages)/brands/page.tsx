import Container from '@/components/category&brand/Container'
import { brandService } from '@/services/brand'
import React from 'react'

async function BrandsPage() {

  const brands = (await brandService.getAll()).data


  return (
    <div className='pt-15'>

      <Container list={brands} name={"Brands"}/>

    </div>
  )
}

export default BrandsPage