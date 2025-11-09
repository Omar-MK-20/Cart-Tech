import { GetAllResponseI, GetSingleResponseI, CategoryI } from "@/interfaces";

class CategoriesServices {
    private baseUrl: string = process.env.NEXT_PUBLIC_BASE_URL ? process.env.NEXT_PUBLIC_BASE_URL : "";

    private endpoint: string = "categories/"

    public async getAll(): Promise<GetAllResponseI<CategoryI>> {
        const response: GetAllResponseI<CategoryI> = await
            fetch(this.baseUrl + this.endpoint,
                { method: "get" })
                .then((res) => res.json())

        return response
    }

    public async getSingle(categoryId: string): Promise<GetSingleResponseI<CategoryI>> {
        const response: GetSingleResponseI<CategoryI> = await
            fetch(this.baseUrl + this.endpoint + categoryId,
                { method: "get" })
                .then((res) => res.json())

        return response
    }
}


export const categoriesServices = new CategoriesServices()