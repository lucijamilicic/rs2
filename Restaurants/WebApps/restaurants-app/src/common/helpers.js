import jwt_decode from 'jwt-decode';

export const getRole = () => {

    const token = localStorage.getItem("accessToken");
    if (token !== null) {
        const decodedToken = jwt_decode(token);

        const role = Object.keys(decodedToken).map(key => {

            if (key.includes('role')) {
                return decodedToken[key];
            }
            return null;
        }).find(elem => elem !== null);

        return role;
    }
    return '';
    
}

export const getAccessToken = () => {
    return localStorage.getItem("accessToken");
};

export const getRefreshToken = () => {
    return localStorage.getItem("refreshToken");
};

    