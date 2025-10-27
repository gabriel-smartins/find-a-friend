import { PrismaOrgsRepository } from '#repositories/prisma/prisma-orgs-repository'
import { AuthenticateOrgUseCase } from '#use-cases/orgs/authenticate-org-use-case'

export function makeAuthenticateOrgUseCase() {
  const orgsRepository = new PrismaOrgsRepository()
  const authenticateOrgUseCase = new AuthenticateOrgUseCase(orgsRepository)

  return authenticateOrgUseCase
}
