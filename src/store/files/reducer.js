import { ADD_FILE, ADD_FOLDER, DELETE_FILE, GET_USER_FILES, MOVE_FILE, TOGGLE_LOADING,  } from "./actions";

const initialState = {
    files: [],
    loading: false
};

export function fileReducer(state = initialState, action){
    switch(action.type){
        case TOGGLE_LOADING:
            return {...state, loading: action.payload};
        case ADD_FILE:
            return {...state, files: [...state.files, action.payload]};
        case DELETE_FILE:
            return state;
        case ADD_FOLDER:
            return {...state, files: [...state.files, action.payload]};
        case MOVE_FILE:
            const { fileToMove, destination } = action.payload;
            console.log("Moving Files: ", fileToMove, destination);
            let filesAfterMove = [...state.files];
            let fileToMoveIndex = filesAfterMove.findIndex(file => file.id === fileToMove.id);
            const destinationIndex = filesAfterMove.findIndex(file => file.id === destination.id);
            if(fileToMoveIndex !== -1 && destinationIndex !== -1){
                filesAfterMove[fileToMoveIndex] = {
                    ...filesAfterMove[fileToMoveIndex],
                    parentId: destination.id
                };
                filesAfterMove[destinationIndex] = {
                    ...filesAfterMove[destinationIndex],
                    childrenIds: [...filesAfterMove[destinationIndex].childrenIds, fileToMove.id]
                };
            }
            return {...state, files: filesAfterMove};
        case GET_USER_FILES:
            return {...state, files: action.payload};
        default:
            return state;
    }
}