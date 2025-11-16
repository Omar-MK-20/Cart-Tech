import Container from '@/components/category&brand/Container';
import { BrandI } from '@/interfaces';
import { brandService } from '@/services/brand.service';

async function BrandsPage()
{

  const brands: BrandI[] = (await brandService.getAll()).data;


  return (
    <div className='pt-15'>

      <Container list={brands} name={"Brands"} />

    </div>
  );
}

export default BrandsPage;