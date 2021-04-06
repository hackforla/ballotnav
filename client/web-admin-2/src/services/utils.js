export const identity = (x) => x

export const pick = (obj, keys) => {
  const out = {}
  keys.forEach((key) => (out[key] = obj[key]))
  return out
}

export const delay = async (time) => {
  return new Promise((resolve) => {
    setTimeout(resolve, time)
  })
}
