export const loadAuthToken = () => {
    return localStorage.getItem('authToken');
};

export const saveAuthToken = authToken => {
    try {
        localStorage.setItem('authToken', authToken);
    } catch (e) {}
};

export const clearAuthToken = () => {
    try {
        localStorage.removeItem('authToken');
    } catch (e) {}
};

export const loadLocalUser = () => {
    return localStorage.getItem('username');
};

export const saveLocalUser = username => {
    try {
        localStorage.setItem('username', username);
    } catch (e) {}
};

export const clearLocalUser = () => {
    try {
        localStorage.removeItem('username');
    } catch (e) {}
};