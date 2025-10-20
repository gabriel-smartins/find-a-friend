import type { OrgsRepository } from '#repositories/orgs-repository'
import { sign } from 'jsonwebtoken'
import { InvalidCredentialsError } from './errors/invalid-credentials-error.js'
import { compare } from 'bcryptjs'

interface AuthenticateOrgUseCaseRequest {
  email: string
  password: string
}

interface AuthenticateOrgUseCaseResponse {
  token: string
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

    const token = sign({}, process.env.JWT_SECRET as string, {
      subject: org.id,
      expiresIn: '1d',
    })

    return { token }
  }
}
