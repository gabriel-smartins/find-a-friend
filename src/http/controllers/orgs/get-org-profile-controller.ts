import { NotAllowedError } from '#use-cases/errors/not-allowed-error'
import { ResourceNotFoundError } from '#use-cases/errors/resource-not-found-error'
import { makeGetOrgProfileUseCase } from '#use-cases/factories/make-get-org-profile-use-case'
import type { FastifyReply, FastifyRequest } from 'fastify'

export async function getOrgProfile(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  try {
    const id = request.user.sub

    const getOrgProfileUseCase = makeGetOrgProfileUseCase()

    const { org } = await getOrgProfileUseCase.execute({
      id,
    })

    return reply.status(200).send({ org })
  } catch (error) {
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
