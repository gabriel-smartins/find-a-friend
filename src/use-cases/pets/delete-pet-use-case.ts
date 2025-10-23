import type { PetsRepository } from '#repositories/pets-repository'
import { NotAllowedError } from '#use-cases/errors/not-allowed-error'
import { ResourceNotFoundError } from '../errors/resource-not-found-error.js'

interface DeletePetUseCaseRequest {
  orgId: string
  petId: string
}

export class DeletePetUseCase {
  constructor(private petsRepository: PetsRepository) {}

  async execute({ orgId, petId }: DeletePetUseCaseRequest): Promise<void> {
    const pet = await this.petsRepository.findById(petId)

    if (!pet) {
      throw new ResourceNotFoundError()
    }

    if (pet.orgId !== orgId) {
      throw new NotAllowedError()
    }

    await this.petsRepository.delete(petId)
  }
}
