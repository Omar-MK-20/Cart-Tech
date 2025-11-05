import { BrandI, GetAllResponseI, GetSingleResponseI } from "@/interfaces";


class BrandServices {
    private baseUrl: string = process.env.BASE_URL ? process.env.BASE_URL : "";
    private endpoint: string = "brands";

    public async getAll(): Promise<GetAllResponseI<BrandI>> {
        const response: GetAllResponseI<BrandI> = await
            fetch(this.baseUrl + this.endpoint,
                { method: "get" })
                .then((res) => res.json())

        return response
    }

    public async getSingle(productId: string): Promise<GetSingleResponseI<BrandI>> {
        const response: GetSingleResponseI<BrandI> = await
            fetch(this.baseUrl + this.endpoint + productId,
                { method: "get" })
                .then((res) => res.json())

        return response
    }
}


export const brandService = new BrandServices()