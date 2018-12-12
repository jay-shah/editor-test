const initialState = {
    show: false
}

export const modalReducer = (state = initialState, action) => {

    switch (action.type) {
        case "SHOW_MODAL":
            return {
                ...state,
                show: true
            }


        default:
            return state
    }

}

export default modalReducer