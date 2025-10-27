import { NotAllowedError } from '#use-cases/errors/not-allowed-error'
import { ResourceNotFoundError } from '#use-cases/errors/resource-not-found-error'
import { makeUpdateOrgPasswordUseCase } from '#use-cases/factories/make-update-org-password-use-case'
import type { FastifyReply, FastifyRequest } from 'fastify'
import { z, ZodError } from 'zod'

export async function updatePassword(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const updateOrgPasswordBodySchema = z.object({
    oldPassword: z.string().min(6),
    newPassword: z.string().min(6),
  })

  try {
    const { oldPassword, newPassword } = updateOrgPasswordBodySchema.parse(
      request.body,
    )

    const orgId = request.user.sub

    const updateOrgPasswordUseCase = makeUpdateOrgPasswordUseCase()

    await updateOrgPasswordUseCase.execute({
      orgId,
      oldPassword,
      newPassword,
    })

    return reply.status(200).send()
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
