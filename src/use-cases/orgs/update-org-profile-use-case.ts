import type { OrgsRepository } from '#repositories/orgs-repository'
import type { Org } from '@prisma/client'
import { ResourceNotFoundError } from '../errors/resource-not-found-error.js'

interface UpdateOrgProfileUseCaseRequest {
  orgId: string
  name?: string
  address?: string
  city?: string
  zipCode?: string
  phone?: string
}

interface UpdateOrgProfileUseCaseResponse {
  org: Org
}

export class UpdateOrgProfileUseCase {
  constructor(private orgsRepository: OrgsRepository) {}

  async execute({
    orgId,
    address,
    city,
    name,
    phone,
    zipCode,
  }: UpdateOrgProfileUseCaseRequest): Promise<UpdateOrgProfileUseCaseResponse> {
    const org = await this.orgsRepository.findById(orgId)

    if (!org) {
      throw new ResourceNotFoundError()
    }

    org.name = name ?? org.name
    org.address = address ?? org.address
    org.city = city ?? org.city
    org.zipCode = zipCode ?? org.zipCode
    org.phone = phone ?? org.phone
    org.updatedAt = new Date()

    const updatedOrg = await this.orgsRepository.save(org)

    return {
      org: updatedOrg,
    }
  }
}
