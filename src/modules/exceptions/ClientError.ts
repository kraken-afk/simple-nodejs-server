export default abstract class ClientError extends Error {
  constructor(message: string, public code: number = 400) {
    super(message)
  }
}
