
export const pick = (obj, keys) => {
  const out = {}
  keys.forEach((key) => out[key] = obj[key])
  return out
}
