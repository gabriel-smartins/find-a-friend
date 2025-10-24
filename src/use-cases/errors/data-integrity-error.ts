export class DataIntegrityError extends Error {
  constructor() {
    super('Data integrity issue: Org not found.')
  }
}
