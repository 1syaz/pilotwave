import { NextAuthOptions } from "next-auth/";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider, { GoogleProfile } from "next-auth/providers/google";
import connectDB from "./connectDB";
import { User } from "@/models/user";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials.password) {
          throw new Error("Missing email or password");
        }

        try {
          await connectDB();
          const user = await User.findOne({ email: credentials.email });

          if (!user) {
            throw new Error(
              "User not found. Please check the email and try again."
            );
          }

          const isValid = await user.isPasswordCorrect(credentials.password);

          if (!isValid) {
            throw new Error("Invalid credentials");
          }

          return {
            id: user._id.toString(),
            email: user.email,
            name: user.fullname,
            profileImage: user.profileImage,
          };
        } catch (error) {
          throw error;
        }
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],

  callbacks: {
    async signIn({ account, profile }) {
      if (account?.provider === "google") {
        connectDB();

        const user = await User.findOne({ email: profile?.email });

        if (!user) {
          try {
            const user = await User.create({
              googleId: profile?.sub,
              fullname: profile?.name,
              email: profile?.email,
              profileImage: (profile as GoogleProfile).picture,
              connectedAccounts: [],
            });

            console.log("Created user:", user);
            console.log("ConnectedAccounts array:", user.connectedAccounts);

            if (
              !user.connectedAccounts ||
              !Array.isArray(user.connectedAccounts)
            ) {
              console.warn("ConnectedAccounts not initialized properly");
            }
          } catch (error) {
            console.log(error);
            throw new Error("Something went wrong while creating User.");
          }
        }
      }
      return true;
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.name = user.name;
        token.email = user.email;
      }

      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
      }

      return session;
    },
  },
  pages: {
    signIn: "/login",
    error: "/login",
  },
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60,
  },
  secret: process.env.NEXTAUTH_SECRET,
};
