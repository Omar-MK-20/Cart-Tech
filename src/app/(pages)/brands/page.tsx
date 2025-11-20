import Error from '@/app/error';
import Container from '@/components/category&brand/Container';
import { BrandI } from '@/interfaces';
import { brandService } from '@/services/brand.service';
import { RequestError } from '@/services/error.service';

async function BrandsPage()
{
  let brands: BrandI[];

  const res = await brandService.getAll();
  if (res instanceof RequestError)
  {
    return <Error error={res} reset={window.history.back} />;
  }
  else
  {
    brands = res.data;
  }

  return (
    <div>

      <Container list={brands} name={"Brands"} />

    </div>
  );
}

export default BrandsPage;