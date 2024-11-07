const searchByField = (user, term, field) => {
  return user[field].toLowerCase().includes(term)
}

export const filterUsers = (users, searchTerm) => {
  const term = searchTerm.trim().toLowerCase()
  
  if (term === '') {
    return [...users]
  }
  
  return users.filter(user => 
    searchByField(user, term, 'first_name') ||
    searchByField(user, term, 'last_name') ||
    searchByField(user, term, 'email')
  )
}