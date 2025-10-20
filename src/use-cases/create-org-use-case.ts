import type { OrgsRepository } from '#repositories/orgs-repository'
import type { Org } from '@prisma/client'
import { hash } from 'bcryptjs'
import { EmailAlreadyInUseError } from './errors/email-already-in-use-error.js'

interface CreateOrgUseCaseRequest {
  name: string
  email: string
  password: string
  address: string
  city: string
  zipCode: string
  phone: string
}

interface CreateOrgUseCaseResponse {
  org: Org
}

export class CreateOrgUseCase {
  constructor(private orgsRepository: OrgsRepository) {}

  async execute({
    name,
    email,
    password,
    address,
    city,
    zipCode,
    phone,
  }: CreateOrgUseCaseRequest): Promise<CreateOrgUseCaseResponse> {
    const passwordHash = await hash(password, 6)

    const orgWithSameEmail = await this.orgsRepository.findByEmail(email)

    if (orgWithSameEmail) {
      throw new EmailAlreadyInUseError()
    }

    const org = await this.orgsRepository.create({
      name,
      email,
      passwordHash,
      address,
      city,
      zipCode,
      phone,
    })

    return { org }
  }
}
