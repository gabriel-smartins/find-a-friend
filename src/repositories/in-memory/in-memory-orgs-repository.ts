import type { OrgsRepository } from '#repositories/orgs-repository'
import type { Org, Prisma } from '@prisma/client'
import { randomUUID } from 'node:crypto'

export class InMemoryOrgsRepository implements OrgsRepository {
  public items: Org[] = []

  async create(data: Prisma.OrgUncheckedCreateInput) {
    const org = {
      id: randomUUID(),
      name: data.name,
      email: data.email,
      passwordHash: data.passwordHash,
      address: data.address,
      city: data.city,
      zipCode: data.zipCode,
      phone: data.phone,
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    this.items.push(org)

    return org
  }

  async save(org: Org) {
    const orgInIndex = this.items.findIndex((item) => item.id === org.id)

    if (orgInIndex >= 0) {
      this.items[orgInIndex] = org
    }

    return org
  }

  async findByEmail(email: string) {
    const org = this.items.find((item) => item.email === email)

    if (!org) {
      return null
    }

    return org
  }

  async findById(id: string) {
    const org = this.items.find((item) => item.id === id)

    if (!org) {
      return null
    }

    return org
  }

  async delete(id: string) {
    const orgIndex = this.items.findIndex((item) => item.id === id)

    if (orgIndex >= 0) {
      this.items.splice(orgIndex, 1)
    }
  }
}
