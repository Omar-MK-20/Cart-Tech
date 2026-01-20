"use client";

import { Button, Input } from "@/components/ui";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { SignUpBodyI } from "@/interfaces/auth.interface";
import { signupSchema } from "@/server/auth/signupSchema";
import { authService } from "@/services/auth.service";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { Controller, useForm } from "react-hook-form";






function LoginPage()
{
  const router = useRouter();


  const form = useForm({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      name: "Omar MK",
      email: "omarMK@email.com",
      password: "OmarMK@123",
      rePassword: "OmarMK@123",
      phone: "01010700701"
    },
    mode: 'onChange'
  });


  async function onSubmit(values: SignUpBodyI)
  {
    console.log(values);

    // try
    // {
    //   const response = await authService.signup(values);

    //   // alert(JSON.stringify(response?.error));
    //   console.log({ response });

    //   if (response)
    //   {
    //     router.push("/products");
    //   }
    // }
    // catch (error)
    // {
    //   console.log({ error });
    // }
  }

  return (
    <div className='flex justify-center text-center'>
      <Card className="w-full sm:max-w-md">
        <CardHeader>
          <CardTitle>Signup</CardTitle>
          <CardDescription>
            Join us to dive through our products, and experience the eliteness.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form id="form-rhf-demo" onSubmit={form.handleSubmit(onSubmit)}>
            <FieldGroup>
              <Controller
                name="name"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="form-rhf-name">
                      Name
                    </FieldLabel>
                    <Input
                      {...field}
                      type='text'
                      id="form-rhf-name"
                      aria-invalid={fieldState.invalid}
                      placeholder="Username"
                      autoComplete="username"
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
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
                      autoComplete='new-password'
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
              <Controller
                name="rePassword"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="form-rhf-rePassword">
                      Confirm Password
                    </FieldLabel>
                    <Input
                      {...field}
                      type='password'
                      id='form-rhf-rePassword'
                      aria-invalid={fieldState.invalid}
                      placeholder='********'
                      autoComplete='new-password'
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
              <Controller
                name="phone"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="form-rhf-phone">
                      Phone Number
                    </FieldLabel>
                    <Input
                      {...field}
                      type='tel'
                      id='form-rhf-phone'
                      aria-invalid={fieldState.invalid}
                      placeholder='01023456789'
                      autoComplete='tel'
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
              Signup
            </Button>
          </Field>
        </CardFooter>
      </Card>


    </div>
  );
}

export default LoginPage;