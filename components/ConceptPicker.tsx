"use client";
import { useEffect, useRef, useState } from 'react';
type Item={id:string;term:string;fsn?:string;active?:boolean};
export default function ConceptPicker({value,onChange}:{value?:{id?:string;term?:string};onChange:(v:{id?:string;term?:string})=>void}){
  const [q,setQ]=useState(''); const [items,setItems]=useState<Item[]>([]); const [open,setOpen]=useState(false); const ac=useRef<AbortController|null>(null);
  useEffect(()=>{ if(value?.id||value?.term){ setQ(value.id&&value.term?`${value.id} | ${value.term}`:(value.term||value.id||'')); } },[value?.id,value?.term]);
  useEffect(()=>{ if(q.length<2){ setItems([]); return; } const t=setTimeout(async()=>{ try{ ac.current?.abort(); const ctrl=new AbortController(); ac.current=ctrl; const r=await fetch(`/api/snomed/search?term=${encodeURIComponent(q)}&limit=12`,{cache:'no-store',signal:ctrl.signal}); const j=await r.json(); setItems(j.items||[]); setOpen(true);}catch{} },250); return()=>clearTimeout(t); },[q]);
  return(<div className='relative'><input className='border rounded px-3 py-2 w-full' placeholder='Type to search SNOMED…' value={q} onChange={e=>setQ(e.target.value)} onFocus={()=>q.length>=2&&setOpen(true)}/>{open&&items.length>0&&(<div className='absolute z-10 mt-1 w-full bg-white border rounded shadow max-h-72 overflow-auto'>{items.map(it=>(<button key={it.id+it.term} className='w-full text-left px-3 py-2 hover:bg-gray-50' onClick={()=>{ const disp=it.fsn||it.term; onChange({id:it.id,term:disp}); setQ(`${it.id} | ${disp}`); setOpen(false);}}><div className='text-sm font-medium'>{it.term}</div><div className='text-xs text-gray-500'>{it.id}{it.fsn?` | ${it.fsn}`:''}</div></button>))}</div>)}</div>);
}
