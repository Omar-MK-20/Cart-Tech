import { BrandI, CategoryI } from "@/interfaces";
import { brandService } from "@/services/brand.service";
import { categoriesServices } from "@/services/categories.service";
import { RequestError } from "@/services/error.service";

let categories: CategoryI[];
let brands: BrandI[];

export const catRes = await categoriesServices.getAll();

export const brandRes = await brandService.getAll();

if (!(catRes instanceof RequestError) && !(brandRes instanceof RequestError))
{
    categories = catRes.data;
    brands = brandRes.data;
}
else
{
    categories = [];
    brands = [];
}

export { categories, brands };

// console.log(brands2