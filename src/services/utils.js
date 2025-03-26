function getHoursDiffWithNow(dateTime) {
  return (Date.now() - dateTime) / (1000 * 60 * 60)
}

function stripHtml(html) {
  const doc = new DOMParser().parseFromString(html, 'text/html')
  return doc.body.textContent || ''
}

export { getHoursDiffWithNow, stripHtml }
