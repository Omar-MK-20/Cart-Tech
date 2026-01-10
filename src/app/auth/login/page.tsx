"use client";

import { SignInBodyI } from '@/interfaces/auth.interface';
import { loginSchema } from '@/server/auth/loginSchema';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from 'react-hook-form';
import { signIn } from 'next-auth/react';

import { Button } from "@/components/ui/button";
import
{
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import
{
  Field,
  FieldError,
  FieldGroup,
  FieldLabel
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Controller } from "react-hook-form";
import { useRouter } from 'next/navigation';




function LoginPage()
{
  const router = useRouter();

  const form = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "mohammed+1@gmail.com",
      password: "Mohamed@123"
    },
    mode: 'onChange'
  });


  async function onSubmit(values: SignInBodyI)
  {
    console.log(values);

    try
    {
      const response = await signIn("credentials", {
        email: values.email,
        password: values.password,
        redirect: false
      });

      // alert(JSON.stringify(response?.error));
      console.log({ response });

      if (response?.ok)
      {
        router.push("/products");
      }
    }
    catch (error)
    {
      console.log({ error });
    }
  }

  return (
    <div className='flex justify-center text-center'>
      <Card className="w-full sm:max-w-md">
        <CardHeader>
          <CardTitle>Login</CardTitle>
          <CardDescription>
            Login to dive through our products, and experience the eliteness.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form id="form-rhf-demo" onSubmit={form.handleSubmit(onSubmit)}>
            <FieldGroup>
              <Controller
                name="email"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="form-rhf-email">
                      Email
                    </FieldLabel>
                    <Input
                      {...field}
                      type='email'
                      id="form-rhf-email"
                      aria-invalid={fieldState.invalid}
                      placeholder="email@example.com"
                      autoComplete="email"
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
              <Controller
                name="password"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="form-rhf-password">
                      Password
                    </FieldLabel>
                    <Input
                      {...field}
                      type='password'
                      id='form-rhf-password'
                      aria-invalid={fieldState.invalid}
                      placeholder='********'
                      autoComplete='current-password'
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
            </FieldGroup>
          </form>
        </CardContent>
        <CardFooter>
          <Field orientation="horizontal">
            <Button type="button" variant="outline" onClick={() => form.reset()}>
              Reset
            </Button>
            <Button type="submit" form="form-rhf-demo">
              Login
            </Button>
          </Field>
        </CardFooter>
      </Card>


    </div>
  );
}

export default LoginPage;