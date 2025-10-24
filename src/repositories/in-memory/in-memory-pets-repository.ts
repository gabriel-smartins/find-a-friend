import type {
  PetsRepository,
  SearchPetsParams,
} from '#repositories/pets-repository'
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

  async searchMany(params: SearchPetsParams) {
    const page = params.page

    let petsOnCity = this.items.filter((pet) => pet.city === params.city)

    if (params.age) {
      petsOnCity = petsOnCity.filter((pet) => pet.age === params.age)
    }

    if (params.size) {
      petsOnCity = petsOnCity.filter((pet) => pet.size === params.size)
    }

    if (params.energyLevel) {
      petsOnCity = petsOnCity.filter(
        (pet) => pet.energyLevel === params.energyLevel,
      )
    }

    const petsPaginated = petsOnCity.slice((page - 1) * 20, page * 20)

    return petsPaginated
  }

  async delete(id: string) {
    const orgIndex = this.items.findIndex((item) => item.id === id)

    if (orgIndex >= 0) {
      this.items.splice(orgIndex, 1)
    }
  }
}
