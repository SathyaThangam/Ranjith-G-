import { LOGIN_SESSION } from "../constants/sessionConstant";
const initialState = {
    loginSession:false
}

const sessionReducer = (state = initialState,action) => {
    console.log(state);
    switch (action.type) {
        case LOGIN_SESSION:
            return {
                ...state,
                loginSession: action.payload
            }
    
        default: return state
    }
}

export default sessionReducer