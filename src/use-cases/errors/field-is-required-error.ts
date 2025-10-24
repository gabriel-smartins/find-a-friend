export class FieldIsRequiredError extends Error {
  constructor() {
    super('Required field is empty.')
  }
}
