import { GetAllResponseI, GetSingleResponseI, ProductI } from "@/interfaces";

class ProductServices {
    private baseUrl: string = process.env.NEXT_PUBLIC_BASE_URL ? process.env.NEXT_PUBLIC_BASE_URL : "";

    private endpoint: string = "products"

    public async getAll(): Promise<GetAllResponseI<ProductI>> {
        const response: GetAllResponseI<ProductI> = await
            fetch(this.baseUrl + this.endpoint,
                { method: "get" })
                .then((res) => res.json())

        return response
    }

    public async getSingle(productId: string | string[]): Promise<GetSingleResponseI<ProductI>> {
        const response: GetSingleResponseI<ProductI> = await
            fetch(this.baseUrl + this.endpoint + "/" + productId,
                { method: "get" })
                .then((res) => res.json())


        return response
    }

    public async getByCategory(categoryId: string | string[]): Promise<GetAllResponseI<ProductI>> {
        const response: GetAllResponseI<ProductI> = await
            fetch(this.baseUrl + this.endpoint + "?" + "category[in]=" + categoryId,
                { method: "get"})
                .then( (res) => res.json())

        return response
    }
}


export const productService = new ProductServices()