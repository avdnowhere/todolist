let nextUserId = 0;

const users = (state = [], action) => {
    switch (action.type) {
        case 'ADD_USER':
            nextUserId += state.length;
            return [
                ...state,
                {
                    key: nextUserId,
                    name: action.name,
                    email: action.email
                }
            ]
        case 'EDIT_USER':
            return state.map(user =>
                user.key === action.key ? { ...user, name: action.name, email: action.email } : user
            );
        case 'DELETE_USER':
            return state.filter(user => user.key !== action.key);
        default:
            return state;
    }
}
  
export default users;