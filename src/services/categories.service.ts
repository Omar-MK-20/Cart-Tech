import { GetAllResponseI, GetSingleResponseI, CategoryI } from "@/interfaces";

class CategoriesServices
{
    private baseUrl: string = process.env.NEXT_PUBLIC_BASE_URL ?? "";
    private endpoint: string = "categories";

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


    public async getAll(): Promise<GetAllResponseI<CategoryI>>
    {
        const url = `${this.baseUrl}${this.endpoint}`;
        return await this.request<GetAllResponseI<CategoryI>>(url);
    }

    public async getSingle(categoryId: string): Promise<GetSingleResponseI<CategoryI>>
    {
        const url = `${this.baseUrl}${this.endpoint}/${categoryId}`;
        return await this.request<GetSingleResponseI<CategoryI>>(url);
    }
}

export const categoriesServices = new CategoriesServices();
