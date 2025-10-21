import type { OrgsRepository } from '#repositories/orgs-repository'
import { ResourceNotFoundError } from './errors/resource-not-found-error.js'

interface DeleteOrgUseCaseRequest {
  id: string
}

export class DeleteOrgUseCase {
  constructor(private orgsRepository: OrgsRepository) {}

  async execute({ id }: DeleteOrgUseCaseRequest): Promise<void> {
    const org = await this.orgsRepository.findById(id)

    if (!org) {
      throw new ResourceNotFoundError()
    }

    await this.orgsRepository.delete(id)
  }
}
