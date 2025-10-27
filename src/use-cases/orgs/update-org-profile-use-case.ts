import type { OrgsRepository } from '#repositories/orgs-repository'
import type { Org } from '@prisma/client'
import { ResourceNotFoundError } from '../errors/resource-not-found-error.js'

interface UpdateOrgProfileUseCaseRequest {
  orgId: string
  data: Partial<{
    name: string
    address: string
    city: string
    zipCode: string
    phone: string
  }>
}

interface UpdateOrgProfileUseCaseResponse {
  org: Org
}

export class UpdateOrgProfileUseCase {
  constructor(private orgsRepository: OrgsRepository) {}

  async execute({
    orgId,
    data,
  }: UpdateOrgProfileUseCaseRequest): Promise<UpdateOrgProfileUseCaseResponse> {
    const org = await this.orgsRepository.findById(orgId)

    if (!org) {
      throw new ResourceNotFoundError()
    }

    Object.assign(org, {
      ...data,
      updatedAt: new Date(),
    })

    const updatedOrg = await this.orgsRepository.save(org)

    return {
      org: updatedOrg,
    }
  }
}
