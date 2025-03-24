const getHoursDiffWithNow = (dateTime) => {
  return (Date.now() - dateTime) / (1000 * 60 * 60)
}

export default getHoursDiffWithNow
