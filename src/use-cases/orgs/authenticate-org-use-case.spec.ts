import { InMemoryOrgsRepository } from '#repositories/in-memory/in-memory-orgs-repository'
import { hash } from 'bcryptjs'
import { AuthenticateOrgUseCase } from './authenticate-org-use-case.js'
import { InvalidCredentialsError } from '../errors/invalid-credentials-error.js'

let orgsRepository: InMemoryOrgsRepository
let sut: AuthenticateOrgUseCase

describe('Authenticate Org Use Case', () => {
  beforeEach(() => {
    orgsRepository = new InMemoryOrgsRepository()
    sut = new AuthenticateOrgUseCase(orgsRepository)
  })

  it('should be able to authenticate a user', async () => {
    await orgsRepository.create({
      name: 'ONG Amigo Fiel',
      email: 'contato@amigofiel.org',
      passwordHash: await hash('123456', 6),
      address: 'Rua dos Girassóis, 123',
      city: 'São Paulo',
      zipCode: '01000-000',
      phone: '11987654321',
    })

    const token = await sut.execute({
      email: 'contato@amigofiel.org',
      password: '123456',
    })

    expect(token).toEqual(
      expect.objectContaining({
        token: expect.any(String),
      }),
    )
  })

  it('should not be able to authenticate with wrong email', async () => {
    await orgsRepository.create({
      name: 'ONG Amigo Fiel',
      email: 'contato@amigofiel.org',
      passwordHash: await hash('123456', 6),
      address: 'Rua dos Girassóis, 123',
      city: 'São Paulo',
      zipCode: '01000-000',
      phone: '11987654321',
    })

    await expect(() =>
      sut.execute({
        email: 'contato@amigofiel2.org',
        password: '123456',
      }),
    ).rejects.instanceOf(InvalidCredentialsError)
  })

  it('should not be able to authenticate with wrong password', async () => {
    await orgsRepository.create({
      name: 'ONG Amigo Fiel',
      email: 'contato@amigofiel.org',
      passwordHash: await hash('123456', 6),
      address: 'Rua dos Girassóis, 123',
      city: 'São Paulo',
      zipCode: '01000-000',
      phone: '11987654321',
    })

    await expect(() =>
      sut.execute({
        email: 'contato@amigofiel.org',
        password: '1234567',
      }),
    ).rejects.instanceOf(InvalidCredentialsError)
  })
})
