export class NotAFunctionCallError extends Error {
  constructor() {
    super("The 'export default' is not a function call.")
    this.name = "NotAFunctionCallError"
  }
}

export class InvalidCalleeError extends Error {
  constructor(expectedFuncName: string) {
    super(`The 'export default' does not call '${expectedFuncName}'.`)
    this.name = "InvalidCalleeError"
  }
}

export class MissingArgumentsError extends Error {
  constructor(funcName: string) {
    super(`The '${funcName}' call has no arguments.`)
    this.name = "MissingArgumentsError"
  }
}

export class InvalidArgumentTypeError extends Error {
  constructor(funcName: string) {
    super(
      `The '${funcName}' call does not contain an object literal as its argument.`,
    )
    this.name = "InvalidArgumentTypeError"
  }
}
