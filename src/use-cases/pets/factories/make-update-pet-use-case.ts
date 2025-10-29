import { PrismaPetsRepository } from '#repositories/prisma/prisma-pets-repository'
import { UpdatePetUseCase } from '../update-pet-use-case.js'

export function makeUpdatePetUseCase() {
  const petsRepository = new PrismaPetsRepository()
  const updatePetUseCase = new UpdatePetUseCase(petsRepository)

  return updatePetUseCase
}
