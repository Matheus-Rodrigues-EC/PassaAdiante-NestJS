import { PrismaPg } from '@prisma/adapter-pg';
import * as bcrypt from 'bcrypt';
import 'dotenv/config';
import { PrismaClient } from '../src/generated/prisma/client.js';
import { ItemAvailability, ItemCategory, ItemCondition, UserType } from '../src/generated/prisma/enums.js';

const prisma = new PrismaClient({ adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL as string }) });
async function seed() {
  const password = await bcrypt.hash('PasseAdiante123!', 10);
  const admin = await prisma.user.upsert({ where: { email: 'admin@passaadiante.local' }, update: {}, create: { email: 'admin@passaadiante.local', name: 'Administração Passe Adiante', password, type: UserType.ADMIN, phones: ['(88) 99999-0001'], address: 'Juazeiro do Norte - CE' } });
  const donor = await prisma.user.upsert({ where: { email: 'doador@passaadiante.local' }, update: {}, create: { email: 'doador@passaadiante.local', name: 'Marina Doadora', password, type: UserType.DONOR, phones: ['(88) 99999-0002'], address: 'Crato - CE' } });
  await prisma.user.upsert({ where: { email: 'estudante@passaadiante.local' }, update: {}, create: { email: 'estudante@passaadiante.local', name: 'Lucas Estudante', password, type: UserType.RECEIVER, phones: ['(88) 99999-0003'], address: 'Barbalha - CE' } });
  const count = await prisma.item.count({ where: { userId: donor.id } });
  if (!count) await prisma.item.createMany({ data: [
    { userId: donor.id, name: 'Mochila escolar azul', description: 'Mochila em ótimo estado, com dois compartimentos.', category: ItemCategory.BACKPACK, condition: ItemCondition.GOOD, availability: ItemAvailability.AVAILABLE },
    { userId: donor.id, name: 'Kit de cadernos', description: 'Três cadernos novos de 10 matérias.', category: ItemCategory.NOTEBOOK, condition: ItemCondition.NEW, availability: ItemAvailability.AVAILABLE },
    { userId: admin.id, name: 'Coleção de livros didáticos', description: 'Livros do ensino fundamental revisados e conservados.', category: ItemCategory.BOOK, condition: ItemCondition.GOOD, availability: ItemAvailability.AVAILABLE },
  ] });
}
seed().finally(() => prisma.$disconnect());
