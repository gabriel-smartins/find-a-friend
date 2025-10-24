import { InMemoryPetsRepository } from '#repositories/in-memory/in-memory-pets-repository'
import { PetAge, PetEnergyLevel, PetSize } from '@prisma/client'
import { MarkPetAsAdoptedUseCase } from './mark-pet-as-adopted-use-case.js'
import { PetAlreadyAdoptedError } from '#use-cases/errors/pet-already-adopted-error'
import { NotAllowedError } from '#use-cases/errors/not-allowed-error'
import { ResourceNotFoundError } from '#use-cases/errors/resource-not-found-error'

let petsRepository: InMemoryPetsRepository
let sut: MarkPetAsAdoptedUseCase

describe('Mark Pet as Adopted Use Case', () => {
  beforeEach(() => {
    petsRepository = new InMemoryPetsRepository()
    sut = new MarkPetAsAdoptedUseCase(petsRepository)
  })

  it('should be able to mark a pet adopted', async () => {
    const pet = await petsRepository.create({
      name: 'Rex',
      description: 'A very playful and energetic puppy.',
      city: 'São Paulo',
      age: PetAge.PUPPY,
      size: PetSize.SMALL,
      energyLevel: PetEnergyLevel.HIGH,
      orgId: 'org-false-id',
    })

    const { pet: adoptedPet } = await sut.execute({
      petId: pet.id,
      orgId: pet.orgId,
    })

    expect(adoptedPet.adoptedAt).toEqual(expect.any(Date))
  })

  it('should not be able to mark a pet adopted if him already been adopted', async () => {
    const pet = await petsRepository.create({
      name: 'Rex',
      description: 'A very playful and energetic puppy.',
      city: 'São Paulo',
      age: PetAge.PUPPY,
      size: PetSize.SMALL,
      energyLevel: PetEnergyLevel.HIGH,
      orgId: 'org-false-id',
    })

    await sut.execute({
      petId: pet.id,
      orgId: pet.orgId,
    })

    await expect(() =>
      sut.execute({
        petId: pet.id,
        orgId: pet.orgId,
      }),
    ).rejects.toBeInstanceOf(PetAlreadyAdoptedError)
  })

  it('should not be able to mark a pet adopted from another org', async () => {
    const pet = await petsRepository.create({
      name: 'Rex',
      description: 'A very playful and energetic puppy.',
      city: 'São Paulo',
      age: PetAge.PUPPY,
      size: PetSize.SMALL,
      energyLevel: PetEnergyLevel.HIGH,
      orgId: 'org-false-id',
    })

    await expect(() =>
      sut.execute({
        petId: pet.id,
        orgId: 'another-org-id',
      }),
    ).rejects.toBeInstanceOf(NotAllowedError)
  })

  it('should not be able to mark a pet adopted if this pet does not exists', async () => {
    const pet = await petsRepository.create({
      name: 'Rex',
      description: 'A very playful and energetic puppy.',
      city: 'São Paulo',
      age: PetAge.PUPPY,
      size: PetSize.SMALL,
      energyLevel: PetEnergyLevel.HIGH,
      orgId: 'org-false-id',
    })

    await expect(() =>
      sut.execute({
        petId: 'pet-id-not-exists',
        orgId: pet.orgId,
      }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
})
