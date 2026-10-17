import { NextAuthOptions, DefaultSession } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { ConnectDB } from "./db";
import User from "@/models/user.model";

declare module "next-auth" {
    interface Session {
        user: {
            id: string;
            username?: string;
        } & DefaultSession["user"];
    }
}

export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                username: { label: "username", type: "text" },
                password: { label: "password", type: "password" },
            },

            async authorize(credentials) {
                if (!credentials?.username || !credentials?.password) {
                    throw new Error("Please enter both username and password");
                }

                try {
                    await ConnectDB();
                    const auth = await User.findOne({ username: credentials.username });

                    if (!auth) {
                        throw new Error("Invalid username or password");
                    }

                    // 1. Verify using bcrypt
                    let isPasswordCorrect = await bcrypt.compare(
                        credentials.password,
                        auth.password
                    );

                    // 2. Seamless Migration: If password was stored in plain text,
                    // verify and auto-hash it in the database immediately
                    if (!isPasswordCorrect && auth.password === credentials.password) {
                        isPasswordCorrect = true;
                        auth.password = await bcrypt.hash(credentials.password, 12);
                        await auth.save();
                    }

                    if (!isPasswordCorrect) {
                        throw new Error("Invalid username or password");
                    }

                    return {
                        id: auth._id.toString(),
                        username: auth.username,
                    };
                } catch (error) {
                    console.error("Auth error:", error);
                    throw error;
                }
            },
        }),
    ],

    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id;
            }
            return token;
        },
        async session({ session, token }) {
            if (session.user) {
                session.user.id = token.id as string;
            }
            return session;
        }
    },

    pages: {
        signIn: "/admin-panel/login",
        error: "/admin-panel/login"
    },
    session: {
        strategy: "jwt",
        maxAge: 30 * 24 * 60 * 60 // 30 days
    },
    secret: process.env.NEXTAUTH_SECRET,
}