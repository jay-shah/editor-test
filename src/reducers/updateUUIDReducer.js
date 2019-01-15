const initialState = {
    uuid: null
}

export const updateUUIDReducer = (state = initialState, action) => {
    switch (action.type) {
        case "UPDATE_UUID":
            return {
                ...state,
                uuid: action.payload
            }
        default:
            return state
    }
}

export default updateUUIDReducer