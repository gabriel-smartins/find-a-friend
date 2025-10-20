import type { OrgsRepository } from '#repositories/orgs-repository'
import type { Org } from '@prisma/client'
import { ResourceNotFoundError } from './errors/resource-not-found-error.js'

interface GetOrgProfileUseCaseRequest {
  email: string
}

interface GetOrgProfileUseCaseResponse {
  org: Org
}

export class GetOrgProfileUseCase {
  constructor(private orgsRepository: OrgsRepository) {}

  async execute({
    email,
  }: GetOrgProfileUseCaseRequest): Promise<GetOrgProfileUseCaseResponse> {
    const org = await this.orgsRepository.findByEmail(email)

    if (!org) {
      throw new ResourceNotFoundError()
    }

    return { org }
  }
}
