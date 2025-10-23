import type { PetsRepository } from '#repositories/pets-repository'
import type {
  Pet,
  PetAge,
  PetEnergyLevel,
  PetSize,
  Prisma,
} from '@prisma/client'
import { randomUUID } from 'node:crypto'

export class InMemoryPetsRepository implements PetsRepository {
  public items: Pet[] = []

  async create(data: Prisma.PetUncheckedCreateInput) {
    const pet = {
      id: randomUUID(),
      name: data.name,
      description: data.description ?? null,

      age: data.age as PetAge,
      size: data.size as PetSize,
      energyLevel: data.energyLevel as PetEnergyLevel,

      city: data.city,
      orgId: data.orgId,

      createdAt: new Date(),
      updatedAt: new Date(),
    }

    this.items.push(pet)

    return pet
  }

  async save(pet: Pet) {
    const petInIndex = this.items.findIndex((item) => item.id === pet.id)

    if (petInIndex >= 0) {
      this.items[petInIndex] = pet
    }

    return pet
  }

  async findById(id: string) {
    const pet = this.items.find((item) => item.id === id)

    if (!pet) {
      return null
    }

    return pet
  }

  async delete(id: string) {
    const orgIndex = this.items.findIndex((item) => item.id === id)

    if (orgIndex >= 0) {
      this.items.splice(orgIndex, 1)
    }
  }
}
