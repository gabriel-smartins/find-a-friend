import { InMemoryPetsRepository } from '#repositories/in-memory/in-memory-pets-repository'
import { PetAge, PetEnergyLevel, PetSize } from '@prisma/client'
import { DeletePetUseCase } from './delete-pet-use-case.js'
import { ResourceNotFoundError } from '#use-cases/errors/resource-not-found-error'
import { NotAllowedError } from '#use-cases/errors/not-allowed-error'

let petsRepository: InMemoryPetsRepository
let sut: DeletePetUseCase

describe('Delete Pet Use Case', () => {
  beforeEach(() => {
    petsRepository = new InMemoryPetsRepository()
    sut = new DeletePetUseCase(petsRepository)
  })

  it('should be able to delete a pet', async () => {
    const petCreated = await petsRepository.create({
      name: 'Rex',
      description: 'A very playful and energetic puppy.',
      city: 'São Paulo',
      age: PetAge.PUPPY,
      size: PetSize.SMALL,
      energyLevel: PetEnergyLevel.HIGH,
      orgId: 'org-false-id',
    })

    await sut.execute({
      petId: petCreated.id,
      orgId: petCreated.orgId,
    })

    expect(petsRepository.items).toHaveLength(0)
  })

  it('should not be able to delete a pet does not exists', async () => {
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
        petId: 'inexisting-exists-id',
        orgId: petCreated.orgId,
      }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })

  it('should not be able to delete a pet from another org', async () => {
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
        orgId: 'inexisting-org-id',
      }),
    ).rejects.toBeInstanceOf(NotAllowedError)
  })
})
