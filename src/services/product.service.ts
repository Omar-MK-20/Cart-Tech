import { GetAllResponseI, GetSingleResponseI, ProductI } from "@/interfaces";
import { RequestError } from "./error.service";

type GetAllOptions = {
    page?: number;
    getAll?: boolean; // if true, fetch all pages by following metadata.nextPage
    signal?: AbortSignal;
};

class ProductServices
{
    private baseUrl: string = process.env.NEXT_PUBLIC_BASE_URL ?? "";
    private endpoint: string = "products";

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

    /**
     * getAll:
     * - if options.all === true -> will iterate pages following metadata.nextPage and return combined data
     * - otherwise fetches a single page (default page = 1)
     */
    public async getAll(options?: GetAllOptions): Promise<GetAllResponseI<ProductI> | RequestError>
    {
        const page = options?.page ?? 1;

        const buildUrl = (p: number) =>
        {
            // append page as query param
            const sep = this.baseUrl.endsWith("/") ? "" : "/";
            const endpointPath = `${this.baseUrl}${sep}${this.endpoint}`;
            const url = new URL(endpointPath);
            url.searchParams.set("page", String(p));
            return url.toString();
        };

        // If caller doesn't want all pages, just fetch the requested page
        if (!options?.getAll)
        {
            const url = buildUrl(page);
            return (await this.request<GetAllResponseI<ProductI>>(url)) as GetAllResponseI<ProductI> | RequestError;
        }

        // Fetch all pages
        let currentPage = page;
        let allData: ProductI[] = [];
        let firstResponseMeta: GetAllResponseI<ProductI> | null = null;

        // Safety cap
        const MAX_PAGES = 200;

        for (let i = 0; i < MAX_PAGES; i++)
        {
            const url = buildUrl(currentPage);
            const res = await this.request<GetAllResponseI<ProductI>>(url);

            if (res instanceof RequestError) return res;

            // store meta from first call to allow returning correct results/numberOfPages
            if (!firstResponseMeta) firstResponseMeta = res;

            if (!Array.isArray(res.data)) break;

            allData = allData.concat(res.data);

            // If metadata says there's a nextPage, follow it. Otherwise break.
            const nextPage = res.metadata?.nextPage;
            if (typeof nextPage === "number" && nextPage > currentPage)
            {
                currentPage = nextPage;
                continue;
            }

            // If metadata doesn't include nextPage but currentPage < numberOfPages, increment
            if (res.metadata && typeof res.metadata.numberOfPages === "number")
            {
                if (res.metadata.currentPage < res.metadata.numberOfPages)
                {
                    currentPage = res.metadata.currentPage + 1;
                    continue;
                }
            }

            // no more pages
            break;
        }

        // Build a consolidated response using the original metadata (if available)
        const consolidated: GetAllResponseI<ProductI> = {
            results: firstResponseMeta?.results ?? allData.length,
            metadata: {
                currentPage: firstResponseMeta?.metadata?.currentPage ?? 1,
                numberOfPages: firstResponseMeta?.metadata?.numberOfPages ?? 1,
                limit: firstResponseMeta?.metadata?.limit ?? allData.length,
                // no nextPage in consolidated response because we have all data
            },
            data: allData,
        };

        return consolidated;
    }

    public async getSingle(productId: string | string[]): Promise<GetSingleResponseI<ProductI> | RequestError>
    {
        const sep = this.baseUrl.endsWith("/") ? "" : "/";
        const url = `${this.baseUrl}${sep}${this.endpoint}/${productId}`;
        return await this.request<GetSingleResponseI<ProductI>>(url);
    }
}

export const productService = new ProductServices();
