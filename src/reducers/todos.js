let nextTodoId = 0;

const todos = (state = [], action) => {
    switch (action.type) {
        case 'ADD_TODO':
            nextTodoId += state.length;
            return [
                ...state,
                {
                    key: nextTodoId,
                    name: action.name,
                    cdate: action.cdate
                }
            ]
        case 'EDIT_TODO':
            return state.map(todo =>
                todo.key === action.key ? { ...todo, name: action.name } : todo
            );
        case 'DELETE_TODO':
            return state.filter(todo => todo.key !== action.key);
        default:
            return state;
    }
}
  
export default todos;