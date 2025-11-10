"use client";

import Loading from '@/app/loading';
import NotFound from '@/app/not-found';
import ProductContainer from '@/components/product/ProductContainer';
import { ProductI } from '@/interfaces';
import { productService } from '@/services/product';
import { useSearchParams } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';

function ProductPage()
{

  const searchParams = useSearchParams();
  const categoryId = searchParams.get("category[in]");
  const brandId = searchParams.get("brand");

  const [products, setProducts] = useState<ProductI[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);


  const filteredProducts = useMemo(() =>
  {
    return products.filter(product =>
    {
      const matchesBrand = !brandId || product.brand._id === brandId;
      const matchesCategory = !categoryId || product.category._id === categoryId;
      return matchesBrand && matchesCategory;
    });
  }, [products, brandId, categoryId]);


  async function getProducts() 
  {
    setIsLoading(true);
    try 
    {
      const res = await productService.getAll();
      setProducts(res.data);
    }
    catch (error) 
    {
      console.error("error in the product page", error);
      throw Error();
    }
    finally 
    {
      setIsLoading(false);
    }
  }




  useEffect(() =>
  {
    getProducts();
  }, []);

  return (
    <div className='pt-10'>
      {isLoading ? (
        <Loading />
      ) : !products.length ? (
        <NotFound />
      ) : (
        // Choose one of the transition containers above
        <ProductContainer products={filteredProducts} />
      )}
    </div>
  );
}

export default ProductPage;