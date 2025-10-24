export class PetAlreadyAdoptedError extends Error {
  constructor() {
    super('This pet was already adopted')
  }
}
