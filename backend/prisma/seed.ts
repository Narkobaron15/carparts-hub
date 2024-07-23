import { PrismaClient } from "@prisma/client";
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();
const rounds = 10;

async function main() {
    const admin = await prisma.user.upsert({
        where: {
            id: 1,
        },
        update: {},
        create: {
            username: 'admin',
            email: 'admin@email.com',
            pwd_hash: await bcrypt.hash('admin', rounds),
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
            pwd_hash: await bcrypt.hash('merchant', rounds),
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
            pwd_hash: await bcrypt.hash('user', rounds),
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
