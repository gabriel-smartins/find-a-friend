import type { FastifyInstance } from 'fastify'

import { verifyJwt } from '../../middlewares/verify-jwt.js'
import { searchPets } from './search-pets-controller.js'
import { getPetDetails } from './get-pet-details-controller.js'
import { register } from './register-pet-controller.js'
import { markPetAsAdopted } from './mark-pet-as-adopted-controller.js'
import { updatePet } from './update-pet-controller.js'
import { deletePet } from './delete-pet-controller.js'

export async function petsRoutes(app: FastifyInstance) {
  app.get('/pets/search', searchPets)
  app.get('/pets/details/:petId', getPetDetails)

  app.post('/pets', { onRequest: [verifyJwt] }, register)
  app.patch(
    '/pets/adoption/:petId',
    { onRequest: [verifyJwt] },
    markPetAsAdopted,
  )
  app.patch('/pets/:petId', { onRequest: [verifyJwt] }, updatePet)
  app.delete('/pets/:petId', { onRequest: [verifyJwt] }, deletePet)
}
