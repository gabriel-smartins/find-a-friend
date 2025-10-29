import { PrismaPetsRepository } from '#repositories/prisma/prisma-pets-repository'
import { MarkPetAsAdoptedUseCase } from '../mark-pet-as-adopted-use-case.js'

export function makeMarkPetAsAdoptedUseCase() {
  const petsRepository = new PrismaPetsRepository()
  const markPetAsAdoptedUseCase = new MarkPetAsAdoptedUseCase(petsRepository)

  return markPetAsAdoptedUseCase
}
