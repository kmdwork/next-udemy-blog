'use client';
 
import { useActionState } from 'react';
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { createUser } from '@/lib/actions/createUser';



export default function RegisterForm() {
    const [state, formAction] = useActionState(createUser, {
        success: false,
        errors: {}
    })
  return (
    <Card className="w-full max-w-md mx-auto">
        <CardHeader className=" mt-5">
            <CardTitle className="line-clamp-2">登録</CardTitle>
        </CardHeader>
        <CardContent>
            <form action={formAction} className=' space-y-4'>
                <div className='space-y-2'>
                    <Label htmlFor='name'>名前</Label>
                    <Input id='name' type='name' name='name' required />
                    {state.errors.name && (
                        <div className="text-red-500">
                            <p className="text-sm text-red-500">{state.errors.name.join(',')}</p>
                        </div>
                    )}
                </div>

                <div className='space-y-2'>
                    <Label htmlFor='email'>メールアドレス</Label>
                    <Input id='email' type='email' name='email' required />
                    {state.errors.email && (
                        <div className="text-red-500">
                            <p className="text-sm text-red-500">{state.errors.email.join(',')}</p>
                        </div>
                    )}
                </div>
                <div className='space-y-2'>
                    <Label htmlFor='password'>パスワード</Label>
                    <Input id='password' type='password' name='password' required />
                    {state.errors.password && (
                        <div className="text-red-500">
                            <p className="text-sm text-red-500">{state.errors.password.join(',')}</p>
                        </div>
                    )}
                </div>
                <div className='space-y-2'>
                    <Label htmlFor='confirmPassword'>パスワード(確認)</Label>
                    <Input id='confirmPassword' type='password' name='confirmPassword' required />
                    {state.errors.confirmPassword && (
                        <div className="text-red-500">
                            <p className="text-sm text-red-500">{state.errors.confirmPassword.join(',')}</p>
                        </div>
                    )}
                </div>

                <Button type='submit' className='w-full'>登録</Button>
            </form>
        </CardContent>
    </Card>
  )
}
