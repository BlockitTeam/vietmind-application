export const formatDate = (date: Date): string => {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0') // Adds leading zero if needed
  const day = String(date.getDate()).padStart(2, '0') // Adds leading zero if needed
  return `${year}-${month}-${day}`
}

export const clearSecond = (date: string): string => {
  // Split the time by colon and take the first two parts (hour and minute)
  const [hour, minute] = date.split(':')
  return `${hour}:${minute}`
}
