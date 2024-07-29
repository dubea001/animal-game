import axios from 'axios'

const url = import.meta.env.VITE_BASE_URL
const apiKey = import.meta.env.VITE_API_KEY

export const fetchData = async (name) => {
  try {
    const response = await axios.get(url, {
      params: {name},
      headers: {'X-Api-Key': apiKey}
    })
    return response.data
  } catch (error) {
    console.error('failed to fetch data', error)
    throw error
  }
}