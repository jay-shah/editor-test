import template from '../data/template.json'
import { updateAt, ops } from 'fn-update'

const immutableSplice = (arr, start, deleteCount, ...items) => [...arr.slice(0, start), ...items, ...arr.slice(start + deleteCount)]

const initialState = {
    template: template,
    // template: Object.assign({}, ...template),
    // templateIds: template.map(x => Object.keys(x)[0])
}


export const templateReducer = (state = initialState, action) => {



    switch (action.type) {

        case "UPDATE_TEMPLATE":

            return updateAt(
                ['template', action.titleIndex, action.title, action.noteIndex],
                action.text
            )(state)

        case "REMOVE_NOTE":

            return updateAt(
                ['template', action.titleIndex, action.title, action.noteIndex],
                ops.delete
            )(state)




        // return {
        //     ...state,
        //     template: [
        //         ...state.template.slice(0, action.titleIndex),
        //         {
        //             ...state.template[action.titleIndex],
        //             [action.title]: state.template[action.titleIndex][action.title].filter((x, i) => i !== action.noteIndex)
        //         },
        //         ...state.template.slice(action.titleIndex + 1)
        //     ]
        // }


        case "REMOVE_SECTION":

            return {
                ...state,
                template: [
                    ...state.template.slice(0, action.titleIndex),
                    ...state.template.slice(action.titleIndex + 1)
                ]
            }

        // template: state.template.filter((item, index) => index !== action.titleIndex)


        case "ADD_NOTE":

            return updateAt(
                ['template', action.titleIndex, action.title],
                (arr) => immutableSplice(arr, action.noteIndex + 1, 0, ' ')
            )(state)




        case 'ADD_NOTE_FROM_TITLE':

            return updateAt(
                ['template', action.titleIndex, action.title],
                (arr) => immutableSplice(arr, 0, 0, ' ')
            )(state)


        default:
            return state

    }

}

export default templateReducer;