/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import 'dotenv/config';
import * as bcrypt from 'bcrypt';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '../src/generated/prisma/client';
import { UserType } from '../src/generated/prisma/enums';

/**
 * Usuários fixos de demonstração usados pelo front no fluxo "Escolher Perfil"
 * (sem login/autenticação real). Os IDs são fixos para que o front possa
 * referenciá-los como constante.
 */
const DEMO_USERS = [
  {
    id: '00000000-0000-0000-0000-000000000001',
    email: 'usuario.demo@passaadiante.local',
    name: 'Usuário Demonstração',
    type: UserType.RECEIVER,
  },
  {
    id: '00000000-0000-0000-0000-000000000002',
    email: 'admin.demo@passaadiante.local',
    name: 'Admin Demonstração',
    type: UserType.ADMIN,
  },
];

const DEMO_PASSWORD = 'passaadiante-demo';

async function main() {
  const adapter = new PrismaPg({
    connectionString: process.env.DATABASE_URL as string,
  });
  const prisma = new PrismaClient({ adapter });
  const hashedPassword = await bcrypt.hash(DEMO_PASSWORD, 10);

  for (const demoUser of DEMO_USERS) {
    await prisma.user.upsert({
      where: { email: demoUser.email },
      update: {},
      create: {
        id: demoUser.id,
        email: demoUser.email,
        name: demoUser.name,
        type: demoUser.type,
        password: hashedPassword,
        phones: [],
      },
    });
  }

  await prisma.$disconnect();
}

main().catch((error: unknown) => {
  console.error(error);
  process.exit(1);
});
