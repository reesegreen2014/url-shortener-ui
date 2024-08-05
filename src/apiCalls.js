export const getUrls = () => {
  return fetch('http://localhost:3001/api/v1/urls')
      .then(response => response.json())
      .catch(error => console.error('Error fetching API data:', error))
}

export const postUrls = newUrl => {
  return fetch('http://localhost:3001/api/v1/urls', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(newUrl)
  })
  .then(response => response.json())
  .catch(error => console.error('Error posting URL:', error))
}