const loginAndSigin = (state = "", action) => {
    switch (action.type) {
        case 'LOGIN_SUCCESS':
            return action.payload.jwtToken;
        case 'LOGIN_FAILURE':
            return '';
        case 'SIGNIN_SUCCESS':
            return action.payload.jwtToken;
        case 'SIGNIN_FAILURE':
            return '';
        default:
            return state;
    }
}

export default loginAndSigin;