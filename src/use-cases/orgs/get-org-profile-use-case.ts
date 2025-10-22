import type { OrgsRepository } from '#repositories/orgs-repository'
import type { Org } from '@prisma/client'
import { ResourceNotFoundError } from '../errors/resource-not-found-error.js'

interface GetOrgProfileUseCaseRequest {
  id: string
}

interface GetOrgProfileUseCaseResponse {
  org: Org
}

export class GetOrgProfileUseCase {
  constructor(private orgsRepository: OrgsRepository) {}

  async execute({
    id,
  }: GetOrgProfileUseCaseRequest): Promise<GetOrgProfileUseCaseResponse> {
    const org = await this.orgsRepository.findById(id)

    if (!org) {
      throw new ResourceNotFoundError()
    }

    return { org }
  }
}
