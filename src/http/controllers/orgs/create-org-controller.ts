import { EmailAlreadyInUseError } from '#use-cases/errors/email-already-in-use-error'
import { makeCreateOrgUseCase } from '#use-cases/factories/make-create-org-use-case'
import type { FastifyReply, FastifyRequest } from 'fastify'
import { z, ZodError } from 'zod'

export async function create(request: FastifyRequest, reply: FastifyReply) {
  const createOrgBodySchema = z.object({
    name: z.string(),
    email: z.email(),
    password: z.string().min(6),
    address: z.string(),
    city: z.string(),
    zipCode: z.string(),
    phone: z.string(),
  })

  try {
    const { name, email, password, address, city, zipCode, phone } =
      createOrgBodySchema.parse(request.body)

    const createOrgUseCase = makeCreateOrgUseCase()

    const { org } = await createOrgUseCase.execute({
      name,
      email,
      password,
      address,
      city,
      zipCode,
      phone,
    })

    const { passwordHash: _, ...orgWithoutPassword } = org

    return reply.status(201).send(orgWithoutPassword)
  } catch (error) {
    if (error instanceof ZodError) {
      return reply.status(400).send({
        message: 'Validation error.',
        issues: z.treeifyError(error),
      })
    }

    if (error instanceof EmailAlreadyInUseError) {
      return reply.status(409).send({
        message: error.message,
      })
    }

    console.log(error)
    return reply.status(500).send({
      message: 'Internal server error.',
    })
  }
}
