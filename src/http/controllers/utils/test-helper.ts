import type { FastifyInstance } from 'fastify'
import request from 'supertest'
import { PetAge, PetEnergyLevel, PetSize } from '@prisma/client'

export async function createAndAuthenticateOrg(app: FastifyInstance) {
  await request(app.server).post('/orgs').send({
    name: 'ONG Amigo Fiel',
    email: 'contato@amigofiel.org',
    password: '123456',
    address: 'Rua dos Girassóis, 123',
    city: 'São Paulo',
    zipCode: '01000-000',
    phone: '11987654321',
  })

  const authResponse = await request(app.server).post('/sessions').send({
    email: 'contato@amigofiel.org',
    password: '123456',
  })

  const { token } = authResponse.body

  return { token }
}

export async function createPet(app: FastifyInstance, token: string) {
  const createPetResponse = await request(app.server)
    .post('/pets')
    .set('Authorization', `Bearer ${token}`)
    .send({
      name: 'Rex',
      description: 'A cute puppy',
      age: PetAge.PUPPY,
      size: PetSize.SMALL,
      energyLevel: PetEnergyLevel.HIGH,
      city: 'Rio de Janeiro',
    })

  const { id: petId } = createPetResponse.body
  return { petId }
}
