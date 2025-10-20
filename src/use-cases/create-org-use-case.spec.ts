import { InMemoryOrgsRepository } from '#repositories/in-memory/in-memory-orgs-repository'
import { CreateOrgUseCase } from './create-org-use-case.js'

let orgsRepository: InMemoryOrgsRepository
let sut: CreateOrgUseCase

describe('Create Org Use Case', () => {
  beforeEach(() => {
    orgsRepository = new InMemoryOrgsRepository()
    sut = new CreateOrgUseCase(orgsRepository)
  })

  it('should be able to register an organization', async () => {
    const { org } = await sut.execute({
      name: 'ONG Amigo Fiel',
      email: 'contato@amigofiel.org',
      password: '123456',
      address: 'Rua dos Girassóis, 123',
      city: 'São Paulo',
      zipCode: '01000-000',
      phone: '11987654321',
    })

    expect(orgsRepository.items).toHaveLength(1)
    expect(org.name).toEqual('ONG Amigo Fiel')
    expect(org.id).toEqual(expect.any(String))
  })

  it('should not be able to register an organization with duplicate e-mail', async () => {
    const { org } = await sut.execute({
      name: 'ONG Amigo Fiel',
      email: 'contato@amigofiel.org',
      password: '123456',
      address: 'Rua dos Girassóis, 123',
      city: 'São Paulo',
      zipCode: '01000-000',
      phone: '11987654321',
    })

    await expect(() =>
      sut.execute({
        name: 'ONG Amigo Fiel',
        email: 'contato@amigofiel.org',
        password: '123456',
        address: 'Rua dos Girassóis, 123',
        city: 'São Paulo',
        zipCode: '01000-000',
        phone: '11987654321',
      }),
    ).rejects.toThrow('This e-mail is already in use')
  })
})
