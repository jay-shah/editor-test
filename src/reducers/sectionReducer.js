const defaultState = {
    key: null
}

export const sectionReducer = (state = defaultState, action) => {

    switch (action.type) {
        case "MOUSE_ENTER_TRASH_TITLE_ICON":
            return {
                ...state,
                key: action.key
            }

        case "MOUSE_LEAVE_TRASH_TITLE_ICON":
            return {
                ...state,
                key: null
            }

        default:
            return state
    }
}

export default sectionReducer