import { InMemoryPetsRepository } from '#repositories/in-memory/in-memory-pets-repository'
import { PetAge, PetEnergyLevel, PetSize } from '@prisma/client'
import { GetPetDetailsUseCase } from './get-pet-details-use-case.js'
import { InMemoryOrgsRepository } from '#repositories/in-memory/in-memory-orgs-repository'
import { hash } from 'bcryptjs'
import { ResourceNotFoundError } from '#use-cases/errors/resource-not-found-error'
import { DataIntegrityError } from '#use-cases/errors/data-integrity-error'

let petsRepository: InMemoryPetsRepository
let orgsRepository: InMemoryOrgsRepository
let sut: GetPetDetailsUseCase

describe('Get Pet Details Use Case', () => {
  beforeEach(() => {
    petsRepository = new InMemoryPetsRepository()
    orgsRepository = new InMemoryOrgsRepository()
    sut = new GetPetDetailsUseCase(petsRepository, orgsRepository)
  })

  it('should be able to fetch pet details', async () => {
    const passwordHash = await hash('123456', 6)

    const org = await orgsRepository.create({
      name: 'ONG Amigo Fiel',
      email: 'contato@amigofiel.org',
      passwordHash,
      address: 'Rua dos Girassóis, 123',
      city: 'São Paulo',
      zipCode: '01000-000',
      phone: '11987654321',
    })

    const pet = await petsRepository.create({
      name: 'Rex',
      description: 'A very playful and energetic puppy.',
      city: 'São Paulo',
      age: PetAge.PUPPY,
      size: PetSize.SMALL,
      energyLevel: PetEnergyLevel.HIGH,
      orgId: org.id,
    })

    const petDetails = await sut.execute({ petId: pet.id })

    expect(petDetails.orgContactInfo).toEqual(
      expect.objectContaining({
        phone: '11987654321',
      }),
    )
    expect(petDetails).toEqual(
      expect.objectContaining({
        orgContactInfo: expect.any(Object),
        pet: expect.any(Object),
      }),
    )
  })

  it('should not be able to fetch pet details of not existing pet', async () => {
    await expect(() =>
      sut.execute({ petId: 'not-existing-pet-id' }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })

  it('should not be able to fetch pet details of not pet with any org', async () => {
    const pet = await petsRepository.create({
      name: 'Rex',
      description: 'A very playful and energetic puppy.',
      city: 'São Paulo',
      age: PetAge.PUPPY,
      size: PetSize.SMALL,
      energyLevel: PetEnergyLevel.HIGH,
      orgId: 'org-id',
    })

    await expect(() => sut.execute({ petId: pet.id })).rejects.toBeInstanceOf(
      DataIntegrityError,
    )
  })
})
