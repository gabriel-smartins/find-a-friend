import { app } from '../../../app.js'
import request from 'supertest'
import { createAndAuthenticateOrg, createPet } from '../utils/test-helper.js'

describe('Mark Pet as Adopted (E2E)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to adopted a pet', async () => {
    const { token } = await createAndAuthenticateOrg(app)
    const { petId } = await createPet(app, token)

    const response = await request(app.server)
      .patch(`/pets/adoption/${petId}`)
      .set('Authorization', `Bearer ${token}`)
      .send()

    expect(response.statusCode).toEqual(200)
    expect(response.body).toEqual(
      expect.objectContaining({
        id: petId,
        adoptedAt: expect.any(String),
      }),
    )
  })

  it('should not be able to mark as adopted a pet without authenticating', async () => {
    const { token } = await createAndAuthenticateOrg(app)
    const { petId } = await createPet(app, token)

    const response = await request(app.server)
      .patch(`/pets/adoption/${petId}`)
      .send()

    expect(response.statusCode).toEqual(401)
  })

  it('should not be able to mark an already adopted pet', async () => {
    const { token } = await createAndAuthenticateOrg(app)
    const { petId } = await createPet(app, token)

    await request(app.server)
      .patch(`/pets/adoption/${petId}`)
      .set('Authorization', `Bearer ${token}`)
      .send()

    const response = await request(app.server)
      .patch(`/pets/adoption/${petId}`)
      .set('Authorization', `Bearer ${token}`)
      .send()

    expect(response.statusCode).toEqual(409)
  })
})
