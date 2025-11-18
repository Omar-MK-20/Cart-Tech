import Error from '@/app/error';
import Container from '@/components/category&brand/Container';
import { CategoryI } from '@/interfaces';
import { categoriesServices } from '@/services/categories.service';
import { RequestError } from '@/services/error.service';

async function CategoriesPage()
{
  let categories: CategoryI[];

  const res = await categoriesServices.getAll();
  if (res instanceof RequestError)
  {
    return <Error error={res} reset={window.history.back} />;
  }
  else 
  {
    categories = res.data;
  }

  return (
    <div className='pt-15'>

      <Container list={categories} name={"Categories"} />

    </div>
  );
}

export default CategoriesPage;