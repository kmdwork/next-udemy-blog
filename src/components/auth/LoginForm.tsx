'use client';
 
import { authenticate } from '@/lib/actions/authenticate';
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

 
export default function LoginForm() {
  const [errorMessage, formAction] = useActionState(
    authenticate,
    undefined,
  );
//   const [state, formAction] = useActionState(
//     action: (prevState: any, formData: FormData) => Promise<any>,
//     initialState: any
//   );
// authenticate はサーバー関数（'use server'）で、(prevState, formData) を引数に取る関数。
// undefined は初期状態。最初は errorMessage にエラーがないので undefined。



  return (
    <Card className="w-full max-w-md mx-auto">
        <CardHeader className=" mt-5">
            <CardTitle className="line-clamp-2">ログイン</CardTitle>
        </CardHeader>
        <CardContent>
            <form action={formAction} className=' space-y-4'>
                <div className='space-y-2'>
                    <Label htmlFor='email'>メールアドレス</Label>
                    <Input id='email' type='email' name='email' required />
                </div>
                <div className='space-y-2'>
                    <Label htmlFor='password'>パスワード</Label>
                    <Input id='password' type='password' name='password' required />
                </div>
                <Button type='submit' className='w-full'>ログイン</Button>
                <div
                    className="flex h-8 items-end space-x-1"
                    >
                    {errorMessage && (
                        <div className="text-red-500">
                            <p className="text-sm text-red-500">{errorMessage}</p>
                        </div>
                    )}
                </div>            
            </form>
        </CardContent>
    </Card>

  )
}