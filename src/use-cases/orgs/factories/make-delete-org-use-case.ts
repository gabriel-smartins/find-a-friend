import { PrismaOrgsRepository } from '#repositories/prisma/prisma-orgs-repository'
import { DeleteOrgUseCase } from '#use-cases/orgs/delete-org-use-case'

export function makeDeleteOrgUseCase() {
  const orgsRepository = new PrismaOrgsRepository()
  const deleteOrgUseCase = new DeleteOrgUseCase(orgsRepository)

  return deleteOrgUseCase
}
