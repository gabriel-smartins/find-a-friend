import type { OrgsRepository } from '#repositories/orgs-repository'
import { compare, hash } from 'bcryptjs'
import { NotAllowedError } from './errors/not-allowed-error.js'
import { ResourceNotFoundError } from './errors/resource-not-found-error.js'

interface UpdateOrgPasswordUseCaseRequest {
  orgId: string
  oldPassword: string
  newPassword: string
}

export class UpdateOrgPasswordUseCase {
  constructor(private orgsRepository: OrgsRepository) {}

  async execute({
    orgId,
    oldPassword,
    newPassword,
  }: UpdateOrgPasswordUseCaseRequest): Promise<void> {
    const org = await this.orgsRepository.findById(orgId)

    if (!org) {
      throw new ResourceNotFoundError()
    }

    const passwordMatches = await compare(oldPassword, org.passwordHash)

    if (!passwordMatches) {
      throw new NotAllowedError()
    }

    const newHashPassword = await hash(newPassword, 6)

    org.passwordHash = newHashPassword
    org.updatedAt = new Date()

    await this.orgsRepository.save(org)
  }
}
