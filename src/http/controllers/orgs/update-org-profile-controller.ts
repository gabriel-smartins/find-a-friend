import { NotAllowedError } from '#use-cases/errors/not-allowed-error'
import { ResourceNotFoundError } from '#use-cases/errors/resource-not-found-error'
import { makeUpdateOrgProfileUseCase } from '#use-cases/factories/make-update-org-profile-use-case'
import type { FastifyReply, FastifyRequest } from 'fastify'
import { z, ZodError } from 'zod'

export async function updateOrgProfile(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const updateOrgProfileBodySchema = z.object({
    name: z.string().optional(),
    address: z.string().optional(),
    city: z.string().optional(),
    zipCode: z.string().optional(),
    phone: z.string().optional(),
  })

  try {
    const { name, address, city, zipCode, phone } =
      updateOrgProfileBodySchema.parse(request.body)

    const orgId = request.user.sub

    const updateOrgProfileUseCase = makeUpdateOrgProfileUseCase()

    const updatedOrg = await updateOrgProfileUseCase.execute({
      orgId,
      data: Object.fromEntries(
        Object.entries({ name, address, city, zipCode, phone }).filter(
          ([, value]) => value !== undefined,
        ),
      ),
    })

    return reply.status(200).send(updatedOrg)
  } catch (error) {
    if (error instanceof ZodError) {
      return reply.status(400).send({
        message: 'Validation error.',
        issues: z.treeifyError(error),
      })
    }
    if (error instanceof ResourceNotFoundError) {
      return reply.status(404).send({
        message: error.message,
      })
    }

    if (error instanceof NotAllowedError) {
      return reply.status(403).send({
        message: error.message,
      })
    }

    console.log(error)
    return reply.status(500).send({
      message: 'Internal server error.',
    })
  }
}
