import { authService } from "@/services/auth.service";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";


const handler = NextAuth({
    providers: [

        CredentialsProvider({
            // The name to display on the sign in form (e.g. "Sign in with...")
            name: "Credentials",
            // `credentials` is used to generate a form on the sign in page.
            // You can specify which fields should be submitted, by adding keys to the `credentials` object.
            // e.g. domain, username, password, 2FA token, etc.
            // You can pass any HTML attribute to the <input> tag through the object.
            credentials: {
                email: { label: "Email", type: "text", placeholder: "email@example.com", autocomplete: "email" },
                password: { label: "Password", type: "password", placeholder: "********", autocomplete: "current-password" }
            },
            async authorize(credentials, req)
            {

                const email = credentials?.email ?? "";
                const password = credentials?.password ?? "";

                const response = await authService.signin({ email, password });
                // console.log({ response });

                if (response.message != "success")
                {
                    return null;
                }

                const user = {
                    id: response.user.email,
                    name: response.user.name,
                    email: response.user.email,
                    role: response.user.role,
                    token: response.token
                };

                console.log({ AuthUser: user });

                return user;
            }
        })

    ],
    callbacks: {
        async jwt({ token, account, user, profile, session, trigger })
        {
            console.log({ jwt: { token, account, user, profile, session, trigger } });
            if (user)
            {
                token.accessToken = user.token;
            }
            return token;
        },
        async session({ session, token, user, trigger, newSession })
        {
            console.log({ session: { session, token, user, trigger, newSession } });
            session.accessToken = token.accessToken;

            return session;
        },
    }
    ,
    pages: {
        signIn: "/auth/login"
    }
});

export { handler as GET, handler as POST };