import { PrismaOrgsRepository } from '#repositories/prisma/prisma-orgs-repository'
import { UpdateOrgProfileUseCase } from '#use-cases/orgs/update-org-profile-use-case'

export function makeUpdateOrgProfileUseCase() {
  const orgsRepository = new PrismaOrgsRepository()
  const updateOrgProfileUseCase = new UpdateOrgProfileUseCase(orgsRepository)

  return updateOrgProfileUseCase
}
