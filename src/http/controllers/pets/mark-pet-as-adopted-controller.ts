import { NotAllowedError } from '#use-cases/errors/not-allowed-error'
import { PetAlreadyAdoptedError } from '#use-cases/errors/pet-already-adopted-error'
import { ResourceNotFoundError } from '#use-cases/errors/resource-not-found-error'
import { makeMarkPetAsAdoptedUseCase } from '#use-cases/pets/factories/make-mark-pet-as-adopted-use-case'
import type { FastifyReply, FastifyRequest } from 'fastify'
import { z, ZodError } from 'zod'

export async function markPetAsAdopted(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const markPetAsAdoptedParamsSchema = z.object({
    petId: z.uuid(),
  })

  try {
    const { petId } = markPetAsAdoptedParamsSchema.parse(request.params)

    const orgId = request.user.sub

    const markPetAsAdoptedUseCase = makeMarkPetAsAdoptedUseCase()

    const { pet } = await markPetAsAdoptedUseCase.execute({
      petId,
      orgId,
    })

    reply.status(200).send(pet)
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

    if (error instanceof PetAlreadyAdoptedError) {
      return reply.status(409).send({
        message: error.message,
      })
    }

    console.error(error)
    return reply.status(500).send({
      message: 'Internal server error.',
    })
  }
}
