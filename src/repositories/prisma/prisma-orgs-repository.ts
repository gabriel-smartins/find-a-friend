import type { OrgsRepository } from '#repositories/orgs-repository'
import type { Org, Prisma } from '@prisma/client'
import { prisma } from '../../lib/prisma.js'

export class PrismaOrgsRepository implements OrgsRepository {
  async create(data: Prisma.OrgUncheckedCreateInput) {
    const org = await prisma.org.create({
      data,
    })

    return org
  }

  async save(data: Org) {
    const org = await prisma.org.update({
      where: {
        id: data.id,
      },

      data: data,
    })

    return org
  }

  async findById(id: string) {
    const org = await prisma.org.findUnique({
      where: {
        id,
      },
    })

    return org
  }

  async findByEmail(email: string) {
    const org = await prisma.org.findUnique({
      where: {
        email,
      },
    })

    return org
  }

  async delete(id: string) {
    await prisma.org.delete({
      where: {
        id,
      },
    })
  }
}
