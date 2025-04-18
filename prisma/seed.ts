import { PrismaClient } from "@prisma/client";
import * as bcypt from 'bcryptjs'

const prisma = new PrismaClient();

async function main() {
    //クリーンアップ
    await prisma.post.deleteMany()
    await prisma.user.deleteMany()

    const hashedPassword = await bcypt.hash('password123', 12)

    //ダミー画像
    const dummyImages = [
        'https://picsum.photos/seed/post1/600/400',
        'https://picsum.photos/seed/post2/600/400'
    ]


    //ユーザー作成
    const user = await prisma.user.create({
        data: {
            email: 'test@example.com',
            name: 'Test User',
            password: hashedPassword,
            posts: {
                create: [
                    {
                        title: 'はじめてのブログ投稿',
                        content: 'これは初めてのブログ投稿です。',
                        topImage: dummyImages[0],
                        published: true
                    },{
                        title: '2番目のブログ投稿',
                        content: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aut, animi quod. Rerum possimus ex reprehenderit minima consequuntur animi quas reiciendis officia dicta. Numquam eligendi culpa placeat! Fugiat repellendus magni sit.',
                        topImage: dummyImages[1],
                        published: true
                    }
                ]
            }
        }
    })

    console.log( { user } );
    
}

main()
    .catch((e) => {
        console.log(e)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })