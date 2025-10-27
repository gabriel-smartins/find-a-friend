import { ResourceNotFoundError } from '#use-cases/errors/resource-not-found-error'
import { makeDeleteOrgUseCase } from '#use-cases/factories/make-delete-org-use-case'
import type { FastifyReply, FastifyRequest } from 'fastify'

export async function deleteOrg(request: FastifyRequest, reply: FastifyReply) {
  try {
    const id = request.user.sub

    const deleteOrgUseCase = makeDeleteOrgUseCase()

    await deleteOrgUseCase.execute({
      id,
    })

    return reply.status(204).send()
  } catch (error) {
    if (error instanceof ResourceNotFoundError) {
      return reply.status(404).send({
        message: error.message,
      })
    }

    console.log(error)
    return reply.status(500).send({
      message: 'Internal server error.',
    })
  }
}
