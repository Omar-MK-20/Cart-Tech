import * as z from "zod";

const loginSchema = z.object({
    email: z.email("Invalid Email").nonempty("Email is required"),
    password: z.string().min(8, "Min length 8 characters").nonempty("Password is required")
});

export { loginSchema };