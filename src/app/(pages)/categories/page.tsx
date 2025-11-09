import Container from '@/components/category&brand/Container'
import { CategoryI } from '@/interfaces'
import { categoriesServices } from '@/services/categories'
import React from 'react'

async function CategoriesPage() {


  const categories: CategoryI[] = (await categoriesServices.getAll()).data


  return (
    <div className='pt-15'>

      <Container list={categories} name={"Categories"}/>

    </div>
  )
}

export default CategoriesPage