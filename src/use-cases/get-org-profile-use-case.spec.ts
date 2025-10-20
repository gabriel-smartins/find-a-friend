import { InMemoryOrgsRepository } from '#repositories/in-memory/in-memory-orgs-repository'
import { GetOrgProfileUseCase } from './get-org-profile-use-case.js'

let orgsRepository: InMemoryOrgsRepository
let sut: GetOrgProfileUseCase

describe('Get Org Profile Use Case', () => {
  beforeEach(() => {
    orgsRepository = new InMemoryOrgsRepository()
    sut = new GetOrgProfileUseCase(orgsRepository)
  })

  it('should be able to get user profile', async () => {
    await orgsRepository.create({
      name: 'ONG Amigo Fiel',
      email: 'contato@amigofiel.org',
      passwordHash: '123456',
      address: 'Rua dos Girassóis, 123',
      city: 'São Paulo',
      zipCode: '01000-000',
      phone: '11987654321',
    })

    const { org } = await sut.execute({
      email: 'contato@amigofiel.org',
    })

    expect(org.id).toEqual(expect.any(String))
    expect(org.name).toEqual('ONG Amigo Fiel')
  })

  it('should not be able to get user profile do not exists', async () => {
    await orgsRepository.create({
      name: 'ONG Amigo Fiel',
      email: 'contato@amigofiel.org',
      passwordHash: '123456',
      address: 'Rua dos Girassóis, 123',
      city: 'São Paulo',
      zipCode: '01000-000',
      phone: '11987654321',
    })

    await expect(() =>
      sut.execute({
        email: 'contato@amigofiel2.org',
      }),
    ).rejects.toThrow('Resource not found.')
  })
})
