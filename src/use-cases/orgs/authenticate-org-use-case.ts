import type { OrgsRepository } from '#repositories/orgs-repository'
import { InvalidCredentialsError } from '../errors/invalid-credentials-error.js'
import { compare } from 'bcryptjs'
import type { Org } from '@prisma/client'

interface AuthenticateOrgUseCaseRequest {
  email: string
  password: string
}

interface AuthenticateOrgUseCaseResponse {
  org: Org
}

export class AuthenticateOrgUseCase {
  constructor(private orgsRepository: OrgsRepository) {}

  async execute({
    email,
    password,
  }: AuthenticateOrgUseCaseRequest): Promise<AuthenticateOrgUseCaseResponse> {
    const org = await this.orgsRepository.findByEmail(email)

    if (!org) {
      throw new InvalidCredentialsError()
    }

    const passwordMatches = await compare(password, org.passwordHash)

    if (!passwordMatches) {
      throw new InvalidCredentialsError()
    }

    return { org }
  }
}
