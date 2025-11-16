import { AuthResponseI, SignInBodyI, SignUpBodyI } from "@/interfaces/auth.interface";


class AuthServices
{
    private baseUrl: string = process.env.NEXT_PUBLIC_BASE_URL ?? "";
    private endpoint: string = "auth";

    private async request<T>(url: string, options: RequestInit = {}): Promise<T>
    {
        try
        {
            const res = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                ...options,
            });
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

    public async signin(credentials: SignInBodyI): Promise<AuthResponseI>
    {
        const url = `${this.baseUrl}${this.endpoint}/signin`;
        return await this.request<AuthResponseI>(url, {
            body: JSON.stringify(credentials),
        });
    }

    public async signup(userData: SignUpBodyI): Promise<AuthResponseI>
    {
        const url = `${this.baseUrl}${this.endpoint}/signup`;
        return await this.request<AuthResponseI>(url, {
            body: JSON.stringify(userData),
        });
    }
}

export const authService = new AuthServices();