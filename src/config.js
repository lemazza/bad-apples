
function createURLObject (base) {
  return {
    base,
    users: base + '/users',
    games: base + '/games',
    login: base + '/api/auth/login',
    refresh: base + '/api/auth/refresh',
  }
}

export const API_URL = createURLObject('http://localhost:8888')