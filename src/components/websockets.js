//sockets

import {API_URL} from '../config';
import io from 'socket.io-client';
import {loadAuthToken} from '../local-storage';

const authToken = loadAuthToken();
const query = 'token=' + authToken
export var socket = io(API_URL.games, {query});
