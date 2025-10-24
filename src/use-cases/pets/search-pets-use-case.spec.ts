import { InMemoryPetsRepository } from '#repositories/in-memory/in-memory-pets-repository'
import { PetAge, PetEnergyLevel, PetSize } from '@prisma/client'
import { SearchPetsUseCase } from './search-pets-use-case.js'

let petsRepository: InMemoryPetsRepository
let sut: SearchPetsUseCase

describe('Search Pets Use Case', () => {
  beforeEach(() => {
    petsRepository = new InMemoryPetsRepository()
    sut = new SearchPetsUseCase(petsRepository)
  })

  it('should be able to search pets by city ', async () => {
    await petsRepository.create({
      name: 'Rex',
      description: 'A very playful and energetic puppy.',
      city: 'São Paulo',
      age: PetAge.PUPPY,
      size: PetSize.SMALL,
      energyLevel: PetEnergyLevel.HIGH,
      orgId: 'org-false-id-1',
    })

    await petsRepository.create({
      name: 'Dora',
      description: 'A very playful and energetic puppy.',
      city: 'São Paulo',
      age: PetAge.ADULT,
      size: PetSize.SMALL,
      energyLevel: PetEnergyLevel.HIGH,
      orgId: 'org-false-id-2',
    })

    await petsRepository.create({
      name: 'Chico',
      description: 'A very playful and energetic puppy.',
      city: 'Rio de Janeiro',
      age: PetAge.ADULT,
      size: PetSize.LARGE,
      energyLevel: PetEnergyLevel.HIGH,
      orgId: 'org-false-id-2',
    })

    const { pets } = await sut.execute({ city: 'São Paulo', page: 1 })

    expect(pets).toHaveLength(2)
    expect(pets[0]).toEqual(
      expect.objectContaining({
        name: 'Rex',
      }),
    )
  })

  it('should be able to search pets by age ', async () => {
    await petsRepository.create({
      name: 'Rex',
      description: 'A very playful and energetic puppy.',
      city: 'São Paulo',
      age: PetAge.PUPPY,
      size: PetSize.SMALL,
      energyLevel: PetEnergyLevel.HIGH,
      orgId: 'org-false-id-1',
    })

    await petsRepository.create({
      name: 'Dora',
      description: 'A very playful and energetic puppy.',
      city: 'São Paulo',
      age: PetAge.ADULT,
      size: PetSize.SMALL,
      energyLevel: PetEnergyLevel.HIGH,
      orgId: 'org-false-id-2',
    })

    await petsRepository.create({
      name: 'Chico',
      description: 'A very playful and energetic puppy.',
      city: 'Rio de Janeiro',
      age: PetAge.ADULT,
      size: PetSize.LARGE,
      energyLevel: PetEnergyLevel.HIGH,
      orgId: 'org-false-id-2',
    })

    const { pets } = await sut.execute({
      city: 'São Paulo',
      page: 1,
      age: PetAge.PUPPY,
    })

    expect(pets).toHaveLength(1)
    expect(pets[0]).toEqual(
      expect.objectContaining({
        name: 'Rex',
      }),
    )
  })

  it('should be able to fetch paginated pets', async () => {
    for (let i = 1; i <= 22; i++) {
      await petsRepository.create({
        name: `Chico ${i}`,
        description: 'A very playful and energetic puppy.',
        city: 'São Paulo',
        age: PetAge.ADULT,
        size: PetSize.LARGE,
        energyLevel: PetEnergyLevel.HIGH,
        orgId: 'org-false-id-1',
      })
    }

    const { pets } = await sut.execute({
      city: 'São Paulo',
      page: 2,
    })

    expect(pets).toHaveLength(2)
    expect(pets).toEqual([
      expect.objectContaining({
        name: 'Chico 21',
      }),
      expect.objectContaining({
        name: 'Chico 22',
      }),
    ])
  })
})
