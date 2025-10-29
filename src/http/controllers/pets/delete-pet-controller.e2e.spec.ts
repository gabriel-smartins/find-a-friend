import { app } from '../../../app.js'
import request from 'supertest'
import { createAndAuthenticateOrg } from '../../../../utils/test-helper.js'
import { PetAge, PetEnergyLevel, PetSize } from '@prisma/client'

describe('Delete Pet (E2E)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to delete a pet', async () => {
    const { token } = await createAndAuthenticateOrg(app)

    const createPetResponse = await request(app.server)
      .post('/pets')
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'Rex',
        description: 'A cute Puppy',
        age: PetAge.PUPPY,
        size: PetSize.SMALL,
        energyLevel: PetEnergyLevel.HIGH,
        city: 'Rio de Janeiro',
      })

    const petId = createPetResponse.body.id

    const response = await request(app.server)
      .delete(`/pets/${petId}`)
      .set('Authorization', `Bearer ${token}`)
      .send()

    expect(response.statusCode).toEqual(204)
  })
})
