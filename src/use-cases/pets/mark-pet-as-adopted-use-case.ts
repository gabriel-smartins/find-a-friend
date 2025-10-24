import type { PetsRepository } from '#repositories/pets-repository'
import { NotAllowedError } from '#use-cases/errors/not-allowed-error'
import { PetAlreadyAdoptedError } from '#use-cases/errors/pet-already-adopted-error'
import { ResourceNotFoundError } from '#use-cases/errors/resource-not-found-error'
import type { Pet } from '@prisma/client'

interface MarkPetAsAdoptedUseCaseRequest {
  petId: string
  orgId: string
}

interface MarkPetAsAdoptedUseCaseResponse {
  pet: Pet
}

export class MarkPetAsAdoptedUseCase {
  constructor(private petsRepository: PetsRepository) {}

  async execute({
    petId,
    orgId,
  }: MarkPetAsAdoptedUseCaseRequest): Promise<MarkPetAsAdoptedUseCaseResponse> {
    const pet = await this.petsRepository.findById(petId)

    if (!pet) {
      throw new ResourceNotFoundError()
    }

    if (pet.orgId !== orgId) {
      throw new NotAllowedError()
    }

    if (pet.adoptedAt !== null) {
      throw new PetAlreadyAdoptedError()
    }

    pet.adoptedAt = new Date()

    const updatedPet = await this.petsRepository.save(pet)

    return { pet: updatedPet }
  }
}
