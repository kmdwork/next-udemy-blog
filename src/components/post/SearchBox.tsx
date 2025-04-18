'use client'

import { Input } from '@/components/ui/input'
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react'


export default function SearchBox() {
    const [search , setSaerch] = useState('');
    const [debouncedSearch, setDebouncedSearch] = useState('');
    const router = useRouter();


    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedSearch(search)
        }, 1000)

        return () => clearTimeout(timer)

    }, [search])

    useEffect(() => {
        if(debouncedSearch.trim()) {
            router.push(`/?search=${debouncedSearch.trim()}`)
        } else {
            router.push('/')
        }
        return 
    }, [debouncedSearch, router])


  return (
    <>
        <Input 
            placeholder="記事を検索..." 
            className="w-[200px] lg:w-[300px] bg-white" 
            value={search}
            onChange={(e) => setSaerch(e.target.value)}
        />
    </>
  )
}
