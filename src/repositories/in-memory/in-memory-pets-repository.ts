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
}
