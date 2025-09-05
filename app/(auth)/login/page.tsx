"use client";
import { useState } from 'react';
export default function Login(){
  const [email,setEmail]=useState(''); const [password,setPassword]=useState(''); const [err,setErr]=useState(null as any);
  const onSubmit=async(e:React.FormEvent)=>{e.preventDefault(); setErr(null);
    const r=await fetch('/api/auth/login',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({email,password})});
    if(r.ok) window.location.href='/substances'; else setErr((await r.json()).message||'Login failed'); };
  return(<div className='min-h-screen grid place-items-center bg-gray-50'>
    <form onSubmit={onSubmit} className='bg-white p-6 rounded-xl shadow w-full max-w-sm space-y-4'>
      <h1 className='text-xl font-semibold'>Sign in</h1>
      <input className='w-full border rounded px-3 py-2' placeholder='Email' value={email} onChange={e=>setEmail(e.target.value)} />
      <input className='w-full border rounded px-3 py-2' placeholder='Password' type='password' value={password} onChange={e=>setPassword(e.target.value)} />
      {err&&<p className='text-sm text-red-600'>{String(err)}</p>}
      <button className='w-full border rounded px-3 py-2'>Login</button>
    </form>
  </div>);
}