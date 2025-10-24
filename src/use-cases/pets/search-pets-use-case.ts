import type {
  PetsRepository,
  SearchPetsParams,
} from '#repositories/pets-repository'
import { FieldIsRequiredError } from '#use-cases/errors/field-is-required-error'
import type { Pet, PetAge, PetEnergyLevel, PetSize } from '@prisma/client'

interface SearchPetsUseCaseRequest {
  city: string
  page: number
  age?: PetAge
  size?: PetSize
  energyLevel?: PetEnergyLevel
}

interface SearchPetsUseCaseResponse {
  pets: Pet[]
}

export class SearchPetsUseCase {
  constructor(private petsRepository: PetsRepository) {}

  async execute(
    request: SearchPetsUseCaseRequest,
  ): Promise<SearchPetsUseCaseResponse> {
    const { city, page, age, size, energyLevel } = request

    if (!city || !page) {
      throw new FieldIsRequiredError()
    }

    const searchParams: SearchPetsParams = {
      city,
      page,

      ...(age && { age }),
      ...(size && { size }),
      ...(energyLevel && { energyLevel }),
    }

    const pets = await this.petsRepository.searchMany(searchParams)

    return { pets }
  }
}
