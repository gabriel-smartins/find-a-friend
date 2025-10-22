import type { PetsRepository } from '#repositories/pets-repository'
import type { Pet, PetAge, PetEnergyLevel, PetSize } from '@prisma/client'

interface RegisterPetUseCaseRequest {
  name: string
  description: string
  age: PetAge
  size: PetSize
  energyLevel: PetEnergyLevel
  city: string
  orgId: string
}

interface RegisterPetUseCaseResponse {
  pet: Pet
}

export class RegisterPetUseCase {
  constructor(private petsRepository: PetsRepository) {}

  async execute({
    name,
    description,
    age,
    size,
    energyLevel,
    city,
    orgId,
  }: RegisterPetUseCaseRequest): Promise<RegisterPetUseCaseResponse> {
    const pet = await this.petsRepository.create({
      name,
      description,
      age,
      size,
      energyLevel,
      city,
      orgId,
    })

    return { pet }
  }
}
