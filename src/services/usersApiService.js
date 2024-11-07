import axios from 'axios'

const API_URL = 'https://reqres.in/api/users'
export const fetchAllUsers = async () => {
    try {
        const firstPage = await axios.get(`${API_URL}?page=1`)
        const totalPage = firstPage.data.total_pages
        let allUsers = [...firstPage.data.data]
        
        const promises = []
        for(let i = 2; i <= totalPage; i++) {
          promises.push(axios.get(`${API_URL}?page=${i}`))
        }
    
        const responses = await Promise.all(promises)
        responses.forEach(response => {
          allUsers = [...allUsers, ...response.data.data]
        })
        
        return allUsers
      } catch (error) {
        console.error('Error fetching users from API_URL:', error)
        throw error
      }
}