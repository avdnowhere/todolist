export const addTodo = data => ({
    type: 'ADD_TODO',
    name: data.name,
    cdate: data.cdate
});

export const editTodo = data => ({
    type: 'EDIT_TODO',
    key: data.key,
    name: data.name
});

export const deleteTodo = data => ({
    type: 'DELETE_TODO',
    key: data.key
});

export const addUser = data => ({
    type: 'ADD_USER',
    name: data.name,
    email: data.email
});

export const editUser = data => ({
    type: 'EDIT_USER',
    key: data.key,
    name: data.name,
    email: data.email
});

export const deleteUser = data => ({
    type: 'DELETE_USER',
    key: data.key
});