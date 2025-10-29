import { app } from '../../../app.js'
import request from 'supertest'
import {
  createAndAuthenticateOrg,
  createPet,
} from '../../../../utils/test-helper.js'

describe('Update Pet (E2E)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to update pet', async () => {
    const { token } = await createAndAuthenticateOrg(app)
    const { petId } = await createPet(app, token)

    const response = await request(app.server)
      .patch(`/pets/${petId}`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'Pet modified',
        city: 'Curitiba',
      })

    expect(response.statusCode).toEqual(200)
    expect(response.body.pet).toEqual(
      expect.objectContaining({
        id: expect.any(String),
        name: 'Pet modified',
        city: 'Curitiba',
        description: 'A cute puppy',
      }),
    )
  })

  it('should not be able to update a pet from other org', async () => {
    const { token: tokenOrgA } = await createAndAuthenticateOrg(app)
    const { petId } = await createPet(app, tokenOrgA)

    await request(app.server).post('/orgs').send({
      name: 'Org B',
      email: 'orgb-hacking@example.com',
      password: 'password123',
      address: 'Rua B, 456',
      city: 'Any City',
      zipCode: '22222000',
      phone: '22222222222',
    })

    const authResponseB = await request(app.server).post('/sessions').send({
      email: 'orgb-hacking@example.com',
      password: 'password123',
    })
    const { token: tokenOrgB } = authResponseB.body

    const response = await request(app.server)
      .patch(`/pets/${petId}`)
      .set('Authorization', `Bearer ${tokenOrgB}`)
      .send({
        name: 'Hacked Pet',
      })

    expect(response.statusCode).toEqual(403)
  })
})
