import { afterEach } from 'vitest'
import { prisma } from './src/lib/prisma'

afterEach(async () => {
  await prisma.pet.deleteMany()
  await prisma.org.deleteMany()
})
