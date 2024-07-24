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
            pwd_hash: await bcrypt.hash('admin1234', rounds),
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
            pwd_hash: await bcrypt.hash('merchant1234', rounds),
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
            pwd_hash: await bcrypt.hash('user1234', rounds),
            role: "User",
        },
    })

    const manufacturer = await prisma.manufacturer.upsert({
        where: {
            id: 1,
        },
        update: {},
        create: {
            name: 'Toyota',
            description: 'Toyota Motor Corporation is a Japanese multinational automotive manufacturer headquartered in Toyota, Aichi, Japan.',
        },
    })

    const seller = await prisma.seller.upsert({
        where: {
            id: 1,
        },
        update: {},
        create: {
            user_id: 2,
            name: 'Toyota Parts',
            description: 'An authorizedd reseller of Toyota parts.',
        },
    })

    const car1 = await prisma.car.upsert({
        where: {
            id: 1,
        },
        update: {},
        create: {
            manufacturer_id: 1,
            model: 'Corolla',
            year: 2021,
        },
    })

    const car2 = await prisma.car.upsert({
        where: {
            id: 2,
        },
        update: {},
        create: {
            manufacturer_id: 1,
            model: 'Camry',
            year: 2019,
        },
    })

    const part1 = await prisma.detail.upsert({
        where: {
            id: 1,
        },
        update: {},
        create: {
            manufacturer_id: 1,
            car_id: 1,
            seller_id: 1,
            name: 'Engine',
            notes: 'A powerful engine for your car.',
        },
    })

    const part2 = await prisma.detail.upsert({
        where: {
            id: 2,
        },
        update: {},
        create: {
            manufacturer_id: 1,
            car_id: 2,
            seller_id: 1,
            name: 'Brake Pads',
            notes: 'High quality brake pads for your car.',
        },
    })

    const part3 = await prisma.detail.upsert({
        where: {
            id: 3,
        },
        update: {},
        create: {
            manufacturer_id: 1,
            car_id: 1,
            seller_id: 1,
            name: 'Transmission',
            notes: 'A reliable transmission for your car.',
        },
    })

    console.info('Seeding completed');
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
