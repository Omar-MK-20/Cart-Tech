import { GetAllResponseI, GetSingleResponseI, BrandI } from "@/interfaces";
import { RequestError } from "./error.service";

class BrandServices
{
    private baseUrl: string = process.env.NEXT_PUBLIC_BASE_URL ?? "";
    private endpoint: string = "brands";

    private async request<T>(url: string): Promise<T | RequestError>
    {
        try
        {
            const res = await fetch(url, { method: "GET" });
            const data = await res.json();

            if (!res.ok)
            {
                const message =
                    data?.message ||
                    data?.statusMsg ||
                    data?.errors?.msg ||
                    "Something went wrong";

                return new RequestError(message, res.status, data);
            }

            return data as T;
        } catch (err: unknown)
        {
            if (err instanceof Error)
            {
                return new RequestError(err.message);
            }

            return new RequestError("Network error");
        }
    }

    public async getAll(): Promise<GetAllResponseI<BrandI> | RequestError>
    {
        const url = `${this.baseUrl}${this.endpoint}`;
        return await this.request<GetAllResponseI<BrandI>>(url);
    }

    public async getSingle(brandId: string): Promise<GetSingleResponseI<BrandI> | RequestError>
    {
        const url = `${this.baseUrl}${this.endpoint}/${brandId}`;
        return await this.request<GetSingleResponseI<BrandI>>(url);
    }
}

export const brandService = new BrandServices();
