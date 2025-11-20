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
  const minPrice = useMemo(() => Number(searchParams.get('price[gte]') ?? 0), [searchParams]);
  const popularParam = searchParams.get("popular");
  // possible values: "true" | "false" | null




  const [products, setProducts] = useState<ProductI[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<null | RequestError>(null);

  // Filtered products: apply filters in a straightforward, correct way.
  // Logic used: product passes if it matches selected categories (or none selected)
  // AND it matches selected brands (or none selected).
  // This is the typical AND-between-filter-groups behavior.
  const filteredProducts = useMemo(() =>
  {
    const hasPopularFilter = popularParam === "true" || popularParam === "false";

    // Fast return if no filters active
    if (!categoryIds.length && !brandIds.length && !minPrice && !hasPopularFilter)
    {
      return products;
    }

    return products.filter((product) =>
    {
      const matchesCategory = categoryIds.length === 0 || categoryIds.some((id) => product.category._id === id);

      const matchesBrand = brandIds.length === 0 || brandIds.some((id) => product.brand._id === id);

      const matchesPrice = minPrice === 0 || product.price >= minPrice;

      // Popular filter:
      let matchesPopular = true;
      if (popularParam === "true") matchesPopular = product.sold > 1000;
      if (popularParam === "false") matchesPopular = product.sold <= 1000;

      return (matchesCategory && matchesBrand && matchesPrice && matchesPopular);
    });
  }, [products, categoryIds, brandIds, minPrice, popularParam]);

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
    <div>
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
