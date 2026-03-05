import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/request';

// This is a simple middleware to redirect unauthenticated users
// In a real app, we might use Firebase Admin SDK for session verification,
// but for now, we'll rely on client-side checks and basic path filtering.

export function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;

    // We can't easily check Firebase Auth server-side without a Session Cookie
    // For now, we'll let the client handle redirects for /admin and /account
    // but we'll prepare the structure here.

    return NextResponse.next();
}

export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - api (API routes)
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         */
        '/((?!api|_next/static|_next/image|favicon.ico).*)',
    ],
};
