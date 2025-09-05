import { NextRequest, NextResponse } from 'next/server'; import { getUser } from '@/lib/session';
export async function middleware(req: NextRequest) {
  const p=req.nextUrl.pathname; if(p.startsWith('/login')||p.startsWith('/api/auth')) return NextResponse.next();
  const user=await getUser(req); if(!user){const u=req.nextUrl.clone(); u.pathname='/login'; return NextResponse.redirect(u);} return NextResponse.next(); }
export const config={ matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'] };
