import { GetAllResponseI, GetSingleResponseI, BrandI } from "@/interfaces";

class BrandServices
{
    private baseUrl: string = process.env.NEXT_PUBLIC_BASE_URL ?? "";
    private endpoint: string = "brands";

    private async request<T>(url: string): Promise<T>
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

                throw new Error(message);
            }

            return data as T;
        } catch (err: unknown)
        {
            if (err instanceof Error)
            {
                throw new Error(err.message);
            }

            // fallback for non-Error exceptions
            throw new Error("Network error");
        }
    }

    
    public async getAll(): Promise<GetAllResponseI<BrandI>>
    {
        const url = `${this.baseUrl}${this.endpoint}`;
        return await this.request<GetAllResponseI<BrandI>>(url);
    }

    public async getSingle(brandId: string): Promise<GetSingleResponseI<BrandI>>
    {
        const url = `${this.baseUrl}${this.endpoint}/${brandId}`;
        return await this.request<GetSingleResponseI<BrandI>>(url);
    }
}

export const brandService = new BrandServices();
