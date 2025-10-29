import { InMemoryPetsRepository } from '#repositories/in-memory/in-memory-pets-repository'
import { PetAge, PetEnergyLevel, PetSize } from '@prisma/client'
import { UpdatePetUseCase } from './update-pet-use-case.js'
import { ResourceNotFoundError } from '#use-cases/errors/resource-not-found-error'
import { NotAllowedError } from '#use-cases/errors/not-allowed-error'

let petsRepository: InMemoryPetsRepository
let sut: UpdatePetUseCase

describe('Update Pet Use Case', () => {
  beforeEach(() => {
    petsRepository = new InMemoryPetsRepository()
    sut = new UpdatePetUseCase(petsRepository)
  })

  it('should be able to update a pet infos', async () => {
    const petCreated = await petsRepository.create({
      name: 'Rex',
      description: 'A very playful and energetic puppy.',
      city: 'São Paulo',
      age: PetAge.PUPPY,
      size: PetSize.SMALL,
      energyLevel: PetEnergyLevel.HIGH,
      orgId: 'org-false-id',
    })

    const { pet: updatedPet } = await sut.execute({
      petId: petCreated.id,
      orgId: petCreated.orgId,
      data: {
        name: 'Rexstone',
        city: 'Rio de Janeiro',
      },
    })

    expect(petCreated.name).toEqual('Rexstone')
    expect(petCreated.city).toEqual('Rio de Janeiro')
    expect(updatedPet.description).toEqual(
      'A very playful and energetic puppy.',
    )
    expect(updatedPet.age).toEqual(PetAge.PUPPY)
  })

  it('should not be able to update a pet does not exists', async () => {
    const petCreated = await petsRepository.create({
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
        petId: 'Does not exists pet-id',
        orgId: petCreated.orgId,
        data: {
          name: 'Rexstone',
          city: 'Rio de Janeiro',
        },
      }),
    ).rejects.instanceOf(ResourceNotFoundError)
  })

  it('should not be able to update a pet of another org', async () => {
    const petCreated = await petsRepository.create({
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
        petId: petCreated.id,
        orgId: 'Inexisting Org-id',
        data: {
          name: 'Rexstone',
          city: 'Rio de Janeiro',
        },
      }),
    ).rejects.instanceOf(NotAllowedError)
  })
})
