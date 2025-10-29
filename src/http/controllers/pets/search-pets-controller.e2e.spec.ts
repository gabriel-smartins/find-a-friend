import { app } from '../../../app.js'
import request from 'supertest'
import {
  createAndAuthenticateOrg,
  createPet,
} from '../../../../utils/test-helper.js'

describe('Search Pets (E2E)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to search pets', async () => {
    const { token } = await createAndAuthenticateOrg(app)
    await createPet(app, token)

    const response = await request(app.server).get(`/pets/search`).query({
      city: 'Rio de Janeiro',
    })

    expect(response.statusCode).toEqual(200)
    expect(response.body.pets).toHaveLength(1)
    expect(response.body.pets[0]).toEqual(
      expect.objectContaining({
        name: 'Rex',
      }),
    )
  })

  it('should return a empty array if are no pets', async () => {
    const response = await request(app.server).get(`/pets/search`).query({
      city: 'Empty City',
    })

    expect(response.body.pets).toHaveLength(0)
  })
})
