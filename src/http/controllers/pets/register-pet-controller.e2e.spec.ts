import { app } from '../../../app.js'
import request from 'supertest'
import { createAndAuthenticateOrg } from '../../../../utils/test-helper.js'
import { PetAge, PetEnergyLevel, PetSize } from '@prisma/client'

describe('Register a Pet (E2E)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to register a pet', async () => {
    const { token } = await createAndAuthenticateOrg(app)

    const response = await request(app.server)
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

    expect(response.statusCode).toEqual(201)
    expect(response.body).toEqual(
      expect.objectContaining({
        id: expect.any(String),
      }),
    )
  })
})
