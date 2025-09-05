import { NextRequest, NextResponse } from 'next/server'; import { jwtVerify, SignJWT } from 'jose';
const KEY='dpd_session'; const secret=new TextEncoder().encode(process.env.JWT_SECRET||'dev');
export async function setSession(res:NextResponse,email:string,role:string|null){ const t=await new SignJWT({email,role}).setProtectedHeader({alg:'HS256'}).setIssuedAt().setExpirationTime('12h').sign(secret); res.cookies.set(KEY,t,{httpOnly:true,path:'/'}); return res; }
export async function getUser(req:NextRequest){ const t=req.cookies.get(KEY)?.value; if(!t) return null; try{ const {payload}=await jwtVerify(t,secret); return {email:String(payload.email),role:(payload as any).role||null}; }catch{ return null; } }
export async function requireAuth(req:NextRequest){ const u=await getUser(req); if(!u) throw new Error('Unauthorized'); return u; }
