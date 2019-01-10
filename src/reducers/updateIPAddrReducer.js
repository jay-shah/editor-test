const initialState = {
    ipAddr: null
}

export const updateIPAddrReducer = (state = initialState, action) => {
    switch (action.type) {
        case "UPDATE_IP_ADDRESS":
            return {
                ...state,
                ipAddr: action.payload
            }
        default:
            return state
    }
}

export default updateIPAddrReducer