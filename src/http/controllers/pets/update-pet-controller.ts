import { NotAllowedError } from '#use-cases/errors/not-allowed-error'
import { ResourceNotFoundError } from '#use-cases/errors/resource-not-found-error'
import { makeUpdatePetUseCase } from '#use-cases/pets/factories/make-update-pet-use-case'
import { PetAge, PetEnergyLevel, PetSize } from '@prisma/client'
import type { FastifyReply, FastifyRequest } from 'fastify'
import { z, ZodError } from 'zod'

export async function updatePet(request: FastifyRequest, reply: FastifyReply) {
  const updatePetBodySchema = z.object({
    name: z.string().optional(),
    description: z.string().optional(),
    age: z.enum(PetAge).optional(),
    size: z.enum(PetSize).optional(),
    energyLevel: z.enum(PetEnergyLevel).optional(),
    city: z.string().optional(),
  })

  const updatePetParamsSchema = z.object({
    petId: z.uuid(),
  })

  try {
    const { name, description, age, size, energyLevel, city } =
      updatePetBodySchema.parse(request.body)

    const { petId } = updatePetParamsSchema.parse(request.params)

    const orgId = request.user.sub

    const updatePetUseCase = makeUpdatePetUseCase()

    const updatedPet = await updatePetUseCase.execute({
      orgId,
      petId,
      data: Object.fromEntries(
        Object.entries({
          name,
          description,
          age,
          size,
          energyLevel,
          city,
        }).filter(([, value]) => value !== undefined),
      ),
    })

    return reply.status(200).send(updatedPet)
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
