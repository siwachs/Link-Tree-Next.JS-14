import { withAuth } from "next-auth/middleware";

export default withAuth(function middleware(req) {}, {
  callbacks: {
    authorized: ({ token }) => !!token,
  },
  pages: { signIn: "/signin" },
});

export const config = { matcher: ["/account", "/analytics"] };

// Next Auth does not work with Edge Function so we can not use getServerSession of next Auth
