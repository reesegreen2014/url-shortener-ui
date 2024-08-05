export const getUrls = () => {
  return fetch('http://localhost:3001/api/v1/urls')
    .then(response => {
      if(!response.ok) {
        throw new Error (`HTTP error! Status: ${response.status}`)
      }
      return response.json();
    })
    .catch(error => console.error('Error fetching the data:', error))
}

export const postUrls = newUrl => {
  return fetch('http://localhost:3001/api/v1/urls', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(newUrl)
  })
  .then(response => {
    if(!response.ok) {
      throw new Error (`HTTP error! Status: ${response.status}`);
    }
    return response.json();
  })
  .catch(error => console.error('Error with POST:', error))
}