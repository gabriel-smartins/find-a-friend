import { Prisma, type Pet } from '@prisma/client'

export interface PetsRepository {
  create(data: Prisma.PetUncheckedCreateInput): Promise<Pet>
  save(pet: Pet): Promise<Pet>
  findById(id: string): Promise<Pet | null>
  delete(id: string): Promise<void>
}
