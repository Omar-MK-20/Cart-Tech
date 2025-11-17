"use client";

import Loading from '@/app/loading';
import NotFound from '@/app/not-found';
import ProductContainer from '@/components/product/ProductContainer';
import { ProductI } from '@/interfaces';
import { RequestError } from '@/services/error.service';
import { productService } from '@/services/product.service';
import { useSearchParams } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';
import Error from './error';

function ProductPage()
{

  const searchParams = useSearchParams();
  const categoryId = searchParams.getAll("category[in]");
  const brandId = searchParams.getAll("brand");

  const [products, setProducts] = useState<ProductI[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<null | RequestError>(null);


  const filteredProducts = useMemo(() =>
  {
    return products.filter(product =>
    {
      console.log(brandId.length != 0);
      console.log(categoryId.length != 0);
      console.log(categoryId.length != 0 && brandId.length != 0);
      if (categoryId.length != 0 && brandId.length != 0)
      {
        return true;
      }
      else
      {
        let matchCategory: boolean = false;
        for (let i = 0; i < categoryId.length; i++)
        {
          if (product.category._id === categoryId[i])
          {
            matchCategory = true;
            continue;
          }
          else
          {
            continue;
          }
        }

        let matchBrand: boolean = false;
        for (let i = 0; i < brandId.length; i++)
        {
          if (product.brand._id === brandId[i])
          {
            matchBrand = true;
            continue;
          }
          else
          {
            continue;
          }
        }

        return matchCategory || matchBrand;
      }
    });
  }, [products, brandId, categoryId]);



  console.log(filteredProducts);

  // const matchesBrand = !brandId || product.brand._id === brandId;
  // const matchesCategory = !categoryId || product.category._id === categoryId;
  // return matchesBrand && matchesCategory;



  async function getProducts() 
  {
    setIsLoading(true);
    const res = await productService.getAll();
    if (!(res instanceof RequestError))
    {
      console.log(res);
      setProducts(res.data);
      setIsLoading(false);
    }
    else
    {
      setError(res);
      setIsLoading(false);
    }
  }




  useEffect(() =>
  {
    getProducts();
  }, []);

  return (
    <div className='pt-10'>
      {isLoading ?
        (<Loading />)
        :
        error
          ?
          <Error error={error} reset={window.history.back} />
          :
          !products.length
            ?
            (<NotFound />)
            :
            (
              // Choose one of the transition containers above
              <ProductContainer products={filteredProducts} />
            )}
    </div>
  );
}

export default ProductPage;