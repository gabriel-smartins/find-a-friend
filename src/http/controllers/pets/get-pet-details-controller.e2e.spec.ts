import { app } from '../../../app.js'
import request from 'supertest'
import {
  createAndAuthenticateOrg,
  createPet,
} from '../../../../utils/test-helper.js'
import { randomUUID } from 'node:crypto'

describe('Get Pet Details (E2E)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to get a pet details', async () => {
    const { token } = await createAndAuthenticateOrg(app)
    const { petId } = await createPet(app, token)

    const response = await request(app.server)
      .get(`/pets/details/${petId}`)
      .send()

    expect(response.statusCode).toEqual(200)

    expect(response.body.pet).toEqual(
      expect.objectContaining({
        id: petId,
        name: 'Rex',
      }),
    )
    expect(response.body.orgContactInfo).toEqual(
      expect.objectContaining({
        name: 'ONG Amigo Fiel',
        address: 'Rua dos Girassóis, 123',
        city: 'São Paulo',
        phone: '11987654321',
      }),
    )
  })

  it('should return 404 if pet is not found', async () => {
    const nonExistentPetId = randomUUID()

    const response = await request(app.server)
      .get(`/pets/details/${nonExistentPetId}`)
      .send()

    expect(response.statusCode).toEqual(404)
  })
})
