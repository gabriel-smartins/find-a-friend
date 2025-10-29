import { makeSearchPetsUseCase } from '#use-cases/pets/factories/make-search-pets-use-case'
import { PetAge, PetEnergyLevel, PetSize } from '@prisma/client'
import type { FastifyReply, FastifyRequest } from 'fastify'
import { z, ZodError } from 'zod'

export async function searchPets(request: FastifyRequest, reply: FastifyReply) {
  const searchPetsQuerySchema = z.object({
    city: z.string().min(1),

    age: z.enum(PetAge).optional(),
    size: z.enum(PetSize).optional(),
    energyLevel: z.enum(PetEnergyLevel).optional(),

    page: z.coerce.number().int().min(1).default(1),
  })

  try {
    const { city, age, size, energyLevel, page } = searchPetsQuerySchema.parse(
      request.query,
    )

    const cleanQuery = {
      city,
      page,

      ...(age && { age }),
      ...(size && { size }),
      ...(energyLevel && { energyLevel }),
    }

    const searchPetsUseCase = makeSearchPetsUseCase()

    const { pets } = await searchPetsUseCase.execute(cleanQuery)

    return reply.status(200).send({ pets })
  } catch (error) {
    if (error instanceof ZodError) {
      return reply.status(400).send({
        message: 'Validation error.',
        issues: z.treeifyError(error),
      })
    }

    console.error(error)
    return reply.status(500).send({
      message: 'Internal server error.',
    })
  }
}
