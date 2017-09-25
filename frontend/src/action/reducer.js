import constants from "./constant";

export const patients = (state = {isLoading: false, isLoadingError: false, data: []}, action) => {
    switch (action.type) {
        case constants.LOAD_PATIENT_LIST:
            return {
                ...state,
                isLoading: true,
                isLoadingError: false
            };
        case constants.LOAD_PATIENT_LIST_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isLoadingError: false,
                data: action.patients,
                loadedAt: action.loadedAt,
                error: null
            };
        case constants.LOAD_PATIENT_LIST_ERROR:
            return {
               ...state,
                data: [],
                isLoading: false,
                isLoadingError: false,
                error: action.data,
            };
        default:
            return state;
    }
};

export const user = (state = {}, action) => {
    switch (action.type) {
        case constants.LOGIN:
            return {
                    id: action.id,
                    username: action.username
                };
        default:
            return state;
    }
};