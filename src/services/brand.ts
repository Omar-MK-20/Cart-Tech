import { GetAllResponseI, GetSingleResponseI, BrandI } from "@/interfaces";

class BrandServices {
    private baseUrl: string = process.env.BASE_URL ? process.env.BASE_URL : "";

    private endpoint: string = "brands"

    public async getAll(): Promise<GetAllResponseI<BrandI>> {
        const response: GetAllResponseI<BrandI> = await
            fetch(this.baseUrl + this.endpoint,
                { method: "get" })
                .then((res) => res.json())

        return response
    }

    public async getSingle(brandId: string): Promise<GetSingleResponseI<BrandI>> {
        const response: GetSingleResponseI<BrandI> = await
            fetch(this.baseUrl + this.endpoint + brandId,
                { method: "get" })
                .then((res) => res.json())

        return response
    }
}


export const brandService = new BrandServices()