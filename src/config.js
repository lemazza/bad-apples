//https://localhost:8888
//  'https://bad-apples-api-server.herokuapp.com'
// 'http://localhost:8888'

const API_ADDRESS = 'https://bad-apples-api-server.herokuapp.com'


function createURLObject (base) {
  return {
    base,
    users: base + '/users',
    games: base + '/games',
    login: base + '/api/auth/login',
    refresh: base + '/api/auth/refresh',
  }
}

export const API_URL = createURLObject(API_ADDRESS)