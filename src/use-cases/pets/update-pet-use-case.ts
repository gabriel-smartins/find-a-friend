import type { PetsRepository } from '#repositories/pets-repository'
import type { Pet, PetAge, PetEnergyLevel, PetSize } from '@prisma/client'
import { ResourceNotFoundError } from '../errors/resource-not-found-error.js'
import { NotAllowedError } from '#use-cases/errors/not-allowed-error'

interface UpdatePetUseCaseRequest {
  orgId: string
  petId: string
  data: Partial<{
    name?: string
    description?: string
    city?: string
    age?: PetAge
    size?: PetSize
    energyLevel?: PetEnergyLevel
  }>
}

interface UpdatePetUseCaseResponse {
  pet: Pet
}

export class UpdatePetUseCase {
  constructor(private petsRepository: PetsRepository) {}

  async execute({
    orgId,
    petId,
    data,
  }: UpdatePetUseCaseRequest): Promise<UpdatePetUseCaseResponse> {
    const pet = await this.petsRepository.findById(petId)

    if (!pet) {
      throw new ResourceNotFoundError()
    }

    if (orgId !== pet.orgId) {
      throw new NotAllowedError()
    }

    Object.assign(pet, {
      ...data,
      updatedAt: new Date(),
    })

    const updatedPet = await this.petsRepository.save(pet)

    return {
      pet: updatedPet,
    }
  }
}
