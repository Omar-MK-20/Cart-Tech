import * as z from "zod";

const signupSchema = z.object({
    name: z.string().nonempty("Name is required"),
    email: z.email("Invalid Email").nonempty("Email is required"),
    password: z.string().min(8, "Min length 8 characters").nonempty("Password is required").regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@.#$!%*?&])[A-Za-z\d@.#$!%*?&]{8,15}$/, "Require uppercase letters, lowercase letters, numbers, and special characters"),
    rePassword: z.string().nonempty("Confirm Password"),
    phone: z.string().nonempty("Phone number is required").regex(/^(?:\+20|0020|0)?1[0125][0-9]{8}$/, "Invalid Egyptian Phone number")
}).refine((schema) => schema.password == schema.rePassword, { error: "Passwords don't match", path: ["rePassword"] });

export { signupSchema };