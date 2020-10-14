import { SET_COORDINATES } from "../constants/coordsConstant";

export const setCoordinates = payload => {
    return {
        type:SET_COORDINATES,
        payload:payload
    }
}