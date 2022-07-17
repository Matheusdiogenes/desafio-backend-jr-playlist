import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function main() {
  await prisma.user.create({
    data: {
      email: process.env.EMAIL_ADMIN!,
      name: 'admin',
      password: process.env.PASSWORD_ADMIN!,
      role: 'ADMIN'
    },
  })
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })