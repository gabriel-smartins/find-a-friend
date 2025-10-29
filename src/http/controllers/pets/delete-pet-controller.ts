import { NotAllowedError } from '#use-cases/errors/not-allowed-error'
import { ResourceNotFoundError } from '#use-cases/errors/resource-not-found-error'
import { makeDeletePetUseCase } from '#use-cases/pets/factories/make-delete-pet-use-case'
import type { FastifyReply, FastifyRequest } from 'fastify'
import { z, ZodError } from 'zod'

export async function deletePet(request: FastifyRequest, reply: FastifyReply) {
  const deletePetParamsSchema = z.object({
    petId: z.uuid(),
  })

  try {
    const orgId = request.user.sub

    const { petId } = deletePetParamsSchema.parse(request.params)

    const deletePetUseCase = makeDeletePetUseCase()

    await deletePetUseCase.execute({
      orgId,
      petId,
    })

    return reply.status(204).send()
  } catch (error) {
    if (error instanceof ZodError) {
      return reply.status(400).send({
        message: 'Validation error',
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
