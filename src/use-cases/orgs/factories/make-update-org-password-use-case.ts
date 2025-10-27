import { PrismaOrgsRepository } from '#repositories/prisma/prisma-orgs-repository'
import { UpdateOrgPasswordUseCase } from '#use-cases/orgs/update-org-password-use-case'

export function makeUpdateOrgPasswordUseCase() {
  const orgsRepository = new PrismaOrgsRepository()
  const updateOrgPasswordUseCase = new UpdateOrgPasswordUseCase(orgsRepository)

  return updateOrgPasswordUseCase
}
