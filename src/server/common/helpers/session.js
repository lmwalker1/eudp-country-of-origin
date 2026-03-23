export function getSessionValue(request, key) {
  return request.yar.get(key)
}

export function setSessionValue(request, key, value) {
  request.yar.set(key, value)
}
