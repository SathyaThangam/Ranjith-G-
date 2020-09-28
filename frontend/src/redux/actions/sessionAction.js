import { LOGIN_SESSION } from "../constants/sessionConstant"

export const sessionChange = (session = false) => {
    return{
        type: LOGIN_SESSION,
        payload:session
    }
}