'use server'

import { registerSchema } from "@/validations/user";
import { prisma } from "@/lib/prisma";
import * as bcypt from 'bcryptjs';
import { signIn } from '@/auth';
import { redirect } from "next/navigation";
import { ZodError } from "zod";


type ActionState = {
    success: boolean,
    errors: Record<string, string[]>
}


// バリデーションエラー処理
    // 背景
    // Zodでは、.refine()で定義されたエラー（今回だと confirmPassword の一致）は formErrors に入ります。
    // 処理内容
    // formErrors がある場合、それを confirmPassword に割り当てて返却（UIでエラー表示しやすくするため）
function handleValidationError(error: ZodError): ActionState {
    const { fieldErrors, formErrors } = error.flatten();
    const castedFieldErrors = fieldErrors as Record<string, string[]>;
    // zodの仕様でパスワード一致確認のエラーは formErrorsで渡ってくる
    // formErrorsがある場合は、confirmPasswordフィールドにエラーを追加
    if (formErrors.length > 0) {
        return { success: false, errors: { ...fieldErrors, confirmPassword: formErrors}}
    }
    return { success: false, errors: castedFieldErrors };
}
    
// カスタムエラー処理
function handleError(customErrors: Record<string, string[]>): ActionState {
    return { success: false, errors: customErrors };
}


export async function createUser(
    prevState: ActionState ,
    formData: FormData
): Promise<ActionState> {

    // フォームから渡ってきた情報の取得
    // const name = formData.get('name') as string;
    // const email = formData.get('email') as string;
    const rawFormData = Object.fromEntries(
        ["name", "email", "password", "confirmPassword"].map((field) => [
            field,
            formData.get(field) as string,
        ])
    ) as Record<string, string>;


    // バリデーション
    // /validations/user.ts registerSchemaを使う
    const validationResult = registerSchema.safeParse(rawFormData);
    if(!validationResult.success) {
        return handleValidationError(validationResult.error);
    }

    // DBにメールアドレスが被っていないか確認
    const existingUser = await prisma.user.findUnique({
        where: { email: rawFormData.email } 
    })
    if(existingUser) {
        return handleError({ email: ['このメールアドレスはすでに使用されています']});
    }

    // DBに登録
    const hashedPassword = await bcypt.hash(rawFormData.password, 12);
    await prisma.user.create({
        data: {
            name: rawFormData.name,
            email: rawFormData.email,
            password: hashedPassword,
        }
    })
    

    // dashboardにリダイレクト
    await signIn('credentials', {
      ...Object.fromEntries(formData),
      redirect: false
    });

    redirect('/dashboard')

}