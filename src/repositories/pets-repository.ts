import {
  PetAge,
  PetEnergyLevel,
  PetSize,
  Prisma,
  type Pet,
} from '@prisma/client'

export interface SearchPetsParams {
  city: string
  page: number
  age?: PetAge
  size?: PetSize
  energyLevel?: PetEnergyLevel
}

export interface PetsRepository {
  create(data: Prisma.PetUncheckedCreateInput): Promise<Pet>
  save(pet: Pet): Promise<Pet>
  findById(id: string): Promise<Pet | null>
  searchMany(params: SearchPetsParams): Promise<Pet[]>
  delete(id: string): Promise<void>
}
