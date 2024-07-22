import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
    const admin = await prisma.user.upsert({
        where: {
            id: 1,
        },
        update: {},
        create: {
            username: 'admin',
            email: 'admin@email.com',
            pwd_hash: 'admin',
            role: "Admin",
        },
    })

    const merchant = await prisma.user.upsert({
        where: {
            id: 2,
        },
        update: {},
        create: {
            username: 'merchant',
            email: 'merchant@email.com',
            pwd_hash: 'merchant',
            role: "Seller",
        },
    })

    const user = await prisma.user.upsert({
        where: {
            id: 3,
        },
        update: {},
        create: {
            username: 'user',
            email: 'user@email.com',
            pwd_hash: 'user',
            role: "User",
        },
    })

    console.info(`Seeded users
Admin: ${admin.email}
Merchant: ${merchant.email}
User: ${user.email}
`);
}

main()
    .then(async () => {
        await prisma.$disconnect();
    })
    .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
    });