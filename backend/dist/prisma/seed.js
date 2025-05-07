"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
async function main() {
    const user = await prisma.user.upsert({
        where: { id: 1 },
        update: {},
        create: { name: 'Test User' },
    });
    await prisma.item.create({
        data: {
            name: 'Vintage Camera',
            description: 'Classic Nikon F2 film camera in working condition.',
            startPrice: 100,
            endsAt: new Date(Date.now() + 1000 * 60 * 5),
            bids: {
                create: [
                    {
                        amount: 120,
                        userId: user.id,
                    },
                ],
            },
        },
    });
    console.log('✅ Seed data created');
}
main()
    .catch((e) => {
    console.error(e);
    process.exit(1);
})
    .finally(() => prisma.$disconnect());
//# sourceMappingURL=seed.js.map