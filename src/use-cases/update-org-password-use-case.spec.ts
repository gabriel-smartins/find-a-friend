import { InMemoryOrgsRepository } from '#repositories/in-memory/in-memory-orgs-repository'
import { compare, hash } from 'bcryptjs'
import { UpdateOrgPasswordUseCase } from './update-org-password-use-case.js'
import { NotAllowedError } from './errors/not-allowed-error.js'
import { ResourceNotFoundError } from './errors/resource-not-found-error.js'

let orgsRepository: InMemoryOrgsRepository
let sut: UpdateOrgPasswordUseCase

describe('Update Org Password Use Case', () => {
  beforeEach(() => {
    orgsRepository = new InMemoryOrgsRepository()
    sut = new UpdateOrgPasswordUseCase(orgsRepository)
  })

  it('should be able to update org password', async () => {
    const passwordHash = await hash('123456', 6)

    const orgCreated = await orgsRepository.create({
      name: 'ONG Amigo Fiel',
      email: 'contato@amigofiel.org',
      passwordHash,
      address: 'Rua dos Girassóis, 123',
      city: 'São Paulo',
      zipCode: '01000-000',
      phone: '11987654321',
    })

    await sut.execute({
      orgId: orgCreated.id,
      oldPassword: '123456',
      newPassword: '12345678',
    })

    const orgUpdated = await orgsRepository.findById(orgCreated.id)

    const isNewPasswordCorrect = await compare(
      '12345678',
      orgUpdated!.passwordHash,
    )

    expect(isNewPasswordCorrect).toBeTruthy()
    expect(orgUpdated!.updatedAt).not.toEqual(orgCreated.createdAt)
  })

  it('should not be able to update org with wrong old password', async () => {
    const passwordHash = await hash('123456', 6)

    const orgCreated = await orgsRepository.create({
      name: 'ONG Amigo Fiel',
      email: 'contato@amigofiel.org',
      passwordHash,
      address: 'Rua dos Girassóis, 123',
      city: 'São Paulo',
      zipCode: '01000-000',
      phone: '11987654321',
    })

    await expect(() =>
      sut.execute({
        orgId: orgCreated.id,
        oldPassword: '1234567',
        newPassword: '12345678',
      }),
    ).rejects.toBeInstanceOf(NotAllowedError)
  })

  it('should not be able to update non-existing org', async () => {
    await expect(() =>
      sut.execute({
        orgId: 'non-existing-id',
        oldPassword: '1234567',
        newPassword: '12345678',
      }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
})
