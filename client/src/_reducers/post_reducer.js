import { REGISTER_POST } from "../_actions/types";

function postReducer (state = {}, action) {
    switch (action.type) {
        case REGISTER_POST:
            return { ...state, success: action.payload };
        default:
            return state;
    }
}

export default postReducer