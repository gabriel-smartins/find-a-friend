import { PrismaOrgsRepository } from '#repositories/prisma/prisma-orgs-repository'
import { PrismaPetsRepository } from '#repositories/prisma/prisma-pets-repository'
import { GetPetDetailsUseCase } from '../get-pet-details-use-case.js'

export function makeGetPetDetailsUseCase() {
  const petsRepository = new PrismaPetsRepository()
  const orgsRepository = new PrismaOrgsRepository()

  const getPetDetailsUseCase = new GetPetDetailsUseCase(
    petsRepository,
    orgsRepository,
  )

  return getPetDetailsUseCase
}
