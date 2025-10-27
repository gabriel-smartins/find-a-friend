import { InvalidCredentialsError } from '#use-cases/errors/invalid-credentials-error'
import { makeAuthenticateOrgUseCase } from '#use-cases/orgs/factories/make-authenticate-org-use-case'
import type { FastifyReply, FastifyRequest } from 'fastify'
import { z, ZodError } from 'zod'

export async function authenticate(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const authenticateBodySchema = z.object({
    email: z.email(),
    password: z.string().min(6),
  })

  try {
    const { email, password } = authenticateBodySchema.parse(request.body)

    const authenticateOrgUseCase = makeAuthenticateOrgUseCase()

    const { org } = await authenticateOrgUseCase.execute({
      email,
      password,
    })

    const token = await reply.jwtSign(
      {},
      {
        sign: {
          sub: org.id,
          expiresIn: '10m',
        },
      },
    )

    const refreshToken = await reply.jwtSign(
      {},
      {
        sign: {
          sub: org.id,
          expiresIn: '7d',
        },
      },
    )

    return reply
      .setCookie('refreshToken', refreshToken, {
        path: '/',
        secure: true,
        sameSite: true,
        httpOnly: true,
      })
      .status(200)
      .send({
        token,
      })
  } catch (error) {
    if (error instanceof ZodError) {
      return reply.status(400).send({
        message: 'Validation error.',
        issues: z.treeifyError(error),
      })
    }

    if (error instanceof InvalidCredentialsError) {
      return reply.status(401).send({
        message: error.message,
      })
    }

    console.log(error)
    return reply.status(500).send({
      message: 'Internal server error.',
    })
  }
}
