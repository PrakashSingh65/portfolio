import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { NextRequest, NextResponse } from "next/server";

export interface AuthSuccess {
  session: {
    user: {
      id: string;
      username?: string;
    };
  };
  errorResponse: null;
}

export interface AuthFailure {
  session: null;
  errorResponse: NextResponse;
}

export type AuthResult = AuthSuccess | AuthFailure;

/**
 * Validates the caller's NextAuth session for API routes.
 * 
 * Usage example:
 * ```ts
 * export async function POST(req: NextRequest) {
 *   const { session, errorResponse } = await requireAuth();
 *   if (errorResponse) return errorResponse;
 * 
 *   // Proceed with authenticated action...
 * }
 * ```
 */
export async function requireAuth(): Promise<AuthResult> {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    return {
      session: null,
      errorResponse: NextResponse.json(
        { error: "Unauthorized: Access is restricted to authenticated administrators." },
        { status: 401 }
      ),
    };
  }

  return {
    session: session as AuthSuccess["session"],
    errorResponse: null,
  };
}

/**
 * Higher-order function wrapper to automatically protect API handlers.
 * 
 * Usage example:
 * ```ts
 * export const POST = withAuth(async (req) => {
 *   // Your mutation code
 * });
 * ```
 */
export function withAuth<TContext = unknown>(
  handler: (
    req: NextRequest,
    context: TContext,
    session: AuthSuccess["session"]
  ) => Promise<NextResponse | Response>
) {
  return async (req: NextRequest, context: TContext) => {
    const auth = await requireAuth();
    if (auth.errorResponse) {
      return auth.errorResponse;
    }
    return handler(req, context, auth.session);
  };
}
