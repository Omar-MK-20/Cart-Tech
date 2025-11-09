"use client"

import { ProductI } from '@/interfaces'
import { Grid, List } from 'lucide-react'
import { useState } from 'react'
import { Button } from '../ui'
import { ProductCard } from './ProductCard'

function ProductContainer({products} : {products:ProductI[]}) {

    const [viewMode, setViewMode] = useState<"grid" | "list">("grid")





    return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-4">Products</h1>
        <p className="text-muted-foreground">
          Discover amazing products from our collection
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-4 mb-8">
        <div className="flex items-center gap-2">
          <div className="flex items-center border rounded-md">
            <Button
              variant={viewMode === "grid" ? "default" : "ghost"}
              size="sm"
              onClick={() => setViewMode("grid")}
              className="rounded-r-none"
            >
              <Grid className="h-4 w-4" />
            </Button>
            <Button
              variant={viewMode === "list" ? "default" : "ghost"}
              size="sm"
              onClick={() => setViewMode("list")}
              className="rounded-l-none"
            >
              <List className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Products Grid */}
      {/* {loading ? (
        <div className="flex justify-center items-center min-h-[200px]">
          <LoadingSpinner />
        </div>
      ) : ( */}
        <div
          className={`grid gap-6 relative ${
            viewMode === "grid"
              ? "grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5"
              : "grid-cols-1"
          }`}
        >
          {products.map((product) => (
            <ProductCard key={product._id} product={product} viewMode={viewMode} />
          ))}
        </div>
    </div>
  )
}

export default ProductContainer