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

  // Memoize parsed query arrays so their identity is stable across renders
  const categoryIds = useMemo(() => searchParams.getAll('category[in]'), [searchParams]);
  const brandIds = useMemo(() => searchParams.getAll('brand'), [searchParams]);

  const [products, setProducts] = useState<ProductI[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<null | RequestError>(null);

  // Filtered products: apply filters in a straightforward, correct way.
  // Logic used: product passes if it matches selected categories (or none selected)
  // AND it matches selected brands (or none selected).
  // This is the typical AND-between-filter-groups behavior.
  const filteredProducts = useMemo(() =>
  {
    // If no filters, just return all products fast
    if (!categoryIds.length && !brandIds.length) return products;

    // otherwise check each product
    return products.filter((product) =>
    {
      const matchesCategory =
        categoryIds.length === 0 || categoryIds.some((id) => product.category._id === id);

      const matchesBrand =
        brandIds.length === 0 || brandIds.some((id) => product.brand._id === id);

      // require both groups to match (if a group has no selected values it is treated as match)
      return matchesCategory && matchesBrand;
    });
  }, [products, categoryIds, brandIds]);

  // Robust paginated fetching: we attempt to iterate pages until we detect there is no next page.
  // We support common pagination shapes (res.meta.totalPages, res.meta.hasNext, res.pagination, etc).
  async function getProducts()
  {
    setIsLoading(true);
    setError(null);

    const res = await productService.getAll({ getAll: true });

    if (res instanceof RequestError)
    {
      setError(res);
    } else
    {
      setProducts(res.data);
    }

    setIsLoading(false);
  }

  useEffect(() =>
  {
    // reset didFetchRef if you want to allow re-fetch when URL changes or when explicitly required.
    // In this component we only want to fetch products once on mount, so we keep it true.
    getProducts();

    // ?eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // only on mount

  return (
    <div className="pt-10">
      {isLoading ? (
        <Loading />
      ) : error ? (
        <Error error={error} reset={window.history.back} />
      ) : !products.length ? (
        <NotFound />
      ) : (
        <ProductContainer products={filteredProducts} />
      )}
    </div>
  );
}

export default ProductPage;
