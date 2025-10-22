import { InMemoryOrgsRepository } from '#repositories/in-memory/in-memory-orgs-repository'
import { DeleteOrgUseCase } from './delete-org-use-case.js'

let orgsRepository: InMemoryOrgsRepository
let sut: DeleteOrgUseCase

describe('Delete Org Use Case', () => {
  beforeEach(() => {
    orgsRepository = new InMemoryOrgsRepository()
    sut = new DeleteOrgUseCase(orgsRepository)
  })

  it('should be able to delete org', async () => {
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
      id: orgCreated.id,
    })

    expect(orgsRepository.items).toHaveLength(0)
  })
})
