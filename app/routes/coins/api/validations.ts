export function validateSymbol(symbol: string) {
  if (symbol.length === 0)
    return "Symbol length should be greater than 0"
  return ''
}
export function validateName(name: string) {
  if (name.length === 0)
    return "Name length should be greater than 0"
  return ''
}
export function validateSupply(supply: string) {
  if (supply.length === 0)
    return "Supply length should be greater than 0"
  return ''
}
export function validateVolumeUsd(volumeUsd: string) {
  if (volumeUsd.length === 0)
    return "Volume Usd length should be greater than 0"
  return ''
}
export function validateChangePercent(changePercent: string) {
  if (changePercent.length === 0)
    return "Change Percent length should be greater than 0"
  return ''
}