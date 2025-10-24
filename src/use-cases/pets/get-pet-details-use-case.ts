import type { OrgsRepository } from '#repositories/orgs-repository'
import type { PetsRepository } from '#repositories/pets-repository'
import { DataIntegrityError } from '#use-cases/errors/data-integrity-error'
import { ResourceNotFoundError } from '#use-cases/errors/resource-not-found-error'
import type { Pet } from '@prisma/client'

interface GetPetDetailsUseCaseRequest {
  petId: string
}

interface GetPetDetailsUseCaseResponse {
  pet: Pet
  orgContactInfo: {
    name: string
    phone: string
    city: string
    address: string
  }
}

export class GetPetDetailsUseCase {
  constructor(
    private petsRepository: PetsRepository,
    private orgsRepository: OrgsRepository,
  ) {}

  async execute({
    petId,
  }: GetPetDetailsUseCaseRequest): Promise<GetPetDetailsUseCaseResponse> {
    const pet = await this.petsRepository.findById(petId)

    if (!pet) {
      throw new ResourceNotFoundError()
    }

    const org = await this.orgsRepository.findById(pet.orgId)

    if (!org) {
      throw new DataIntegrityError()
    }

    return {
      pet,
      orgContactInfo: {
        name: org.name,
        phone: org.phone,
        city: org.city,
        address: org.address,
      },
    }
  }
}
