import { makeRegisterPetUseCase } from '#use-cases/pets/factories/make-register-pet-use-case'
import { PetAge, PetEnergyLevel, PetSize } from '@prisma/client'
import type { FastifyReply, FastifyRequest } from 'fastify'
import { z, ZodError } from 'zod'

export async function register(request: FastifyRequest, reply: FastifyReply) {
  const registerPetBodySchema = z.object({
    name: z.string(),
    description: z.string(),
    age: z.enum(PetAge),
    size: z.enum(PetSize),
    energyLevel: z.enum(PetEnergyLevel),
    city: z.string(),
  })

  try {
    const { name, description, age, size, energyLevel, city } =
      registerPetBodySchema.parse(request.body)

    const orgId = request.user.sub

    const registerPetUseCase = makeRegisterPetUseCase()

    const { pet } = await registerPetUseCase.execute({
      name,
      description,
      age,
      size,
      energyLevel,
      city,
      orgId,
    })

    return reply.status(201).send(pet)
  } catch (error) {
    if (error instanceof ZodError) {
      return reply.status(400).send({
        message: 'Validation error.',
        issues: z.treeifyError(error),
      })
    }

    console.log(error)
    return reply.status(500).send({
      message: 'Internal server error.',
    })
  }
}
