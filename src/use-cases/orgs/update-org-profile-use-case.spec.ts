import { InMemoryOrgsRepository } from '#repositories/in-memory/in-memory-orgs-repository'
import { UpdateOrgProfileUseCase } from './update-org-profile-use-case.js'

let orgsRepository: InMemoryOrgsRepository
let sut: UpdateOrgProfileUseCase

describe('Update Org Profile Use Case', () => {
  beforeEach(() => {
    orgsRepository = new InMemoryOrgsRepository()
    sut = new UpdateOrgProfileUseCase(orgsRepository)
  })

  it('should be able to update org profile', async () => {
    const orgCreated = await orgsRepository.create({
      name: 'ONG Amigo Fiel',
      email: 'contato@amigofiel.org',
      passwordHash: '123456',
      address: 'Rua dos Girassóis, 123',
      city: 'São Paulo',
      zipCode: '01000-000',
      phone: '11987654321',
    })

    await sut.execute({
      orgId: orgCreated.id,
      name: 'ONG Amigo Fiel Atualizado',
      city: 'Rio de Janeiro',
    })

    expect(orgCreated.name).toEqual('ONG Amigo Fiel Atualizado')
    expect(orgCreated.city).toEqual('Rio de Janeiro')
  })
})
