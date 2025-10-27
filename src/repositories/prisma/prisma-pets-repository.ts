import type {
  PetsRepository,
  SearchPetsParams,
} from '#repositories/pets-repository'
import type { Pet, Prisma } from '@prisma/client'
import { prisma } from '../../lib/prisma.js'

export class PrismaPetsRepository implements PetsRepository {
  async create(data: Prisma.PetUncheckedCreateInput) {
    const pet = await prisma.pet.create({
      data,
    })

    return pet
  }

  async save(data: Pet) {
    const pet = await prisma.pet.update({
      where: {
        id: data.id,
      },
      data: data,
    })

    return pet
  }

  async findById(id: string) {
    const pet = await prisma.pet.findUnique({
      where: {
        id,
      },
    })

    return pet
  }

  async searchMany(params: SearchPetsParams) {
    const { age, size, energyLevel, city, page = 1 } = params

    const pets = await prisma.pet.findMany({
      where: {
        city,
        ...(age && { age }),
        ...(size && { size }),
        ...(energyLevel && { energyLevel }),

        adoptedAt: null,
      },
      take: 20,
      skip: (page - 1) * 20,
    })

    return pets
  }

  async delete(id: string) {
    await prisma.pet.delete({
      where: {
        id,
      },
    })
  }
}
