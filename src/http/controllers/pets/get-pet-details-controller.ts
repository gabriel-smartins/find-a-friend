import { ResourceNotFoundError } from '#use-cases/errors/resource-not-found-error'
import { makeGetPetDetailsUseCase } from '#use-cases/pets/factories/make-get-pet-details-use-case'
import type { FastifyReply, FastifyRequest } from 'fastify'
import { z, ZodError } from 'zod'

export async function getPetDetails(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const getPetDetailsParamsSchema = z.object({
    petId: z.uuid(),
  })

  try {
    const { petId } = getPetDetailsParamsSchema.parse(request.params)

    const getPetDetailsUseCase = makeGetPetDetailsUseCase()

    const petDetails = await getPetDetailsUseCase.execute({
      petId,
    })

    return reply.status(200).send(petDetails)
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

    console.log(error)
    return reply.status(500).send({
      message: 'Internal server error.',
    })
  }
}
