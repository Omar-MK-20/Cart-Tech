import { GetAllResponseI, GetSingleResponseI, CategoryI } from "@/interfaces";
import { RequestError } from "./error.service";

class CategoriesServices
{
    private baseUrl: string = process.env.NEXT_PUBLIC_BASE_URL ?? "";
    private endpoint: string = "categories";

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

    public async getAll(): Promise<GetAllResponseI<CategoryI> | RequestError>
    {
        const url = `${this.baseUrl}${this.endpoint}`;
        return await this.request<GetAllResponseI<CategoryI>>(url);
    }

    public async getSingle(categoryId: string): Promise<GetSingleResponseI<CategoryI> | RequestError>
    {
        const url = `${this.baseUrl}${this.endpoint}/${categoryId}`;
        return await this.request<GetSingleResponseI<CategoryI>>(url);
    }
}

export const categoriesServices = new CategoriesServices();
