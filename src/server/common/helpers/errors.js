export function formatErrors(joiError) {
  return {
    errorList: joiError.details.map((detail) => ({
      text: detail.message,
      href: `#${detail.path[0]}`
    })),
    fieldErrors: Object.fromEntries(
      joiError.details.map((detail) => [
        detail.path[0],
        { text: detail.message }
      ])
    )
  }
}
