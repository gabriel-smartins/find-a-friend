import { PrismaPetsRepository } from '#repositories/prisma/prisma-pets-repository'
import { RegisterPetUseCase } from '../register-pet-use-case.js'

export function makeRegisterPetUseCase() {
  const petsRepository = new PrismaPetsRepository()
  const registerPetUseCase = new RegisterPetUseCase(petsRepository)

  return registerPetUseCase
}
