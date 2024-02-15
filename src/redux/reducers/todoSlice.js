import { createSlice, nanoid } from "@reduxjs/toolkit";

const initialState = {
    todoList: [],   // contains all todos (original todo array)
    searchedTodoList: [],   // temporary storage for searched todos using search query or sorting based on date and time
    importantTodoList: [],
    unimportantTodoList: [],
    findQuery: "",  // search query
}

export const todoSlice = createSlice({
    name: "todo",
    initialState,
    reducers: {
        createTodo: (state, action) => {
            const padZero = (num) => (num < 10 ? '0' + num : num); // function to pad zero

            const newTodo = {
                id: nanoid(),
                subject: action.payload.subject,
                description: action.payload.description,
                bgColor: action.payload.bgColor,
                starredTodo: action.payload.markImportant,
                // time: `${padZero(new Date().getHours() % 12 || 12)}:${padZero(new Date().getMinutes())}:${padZero(new Date().getSeconds())}`,
                time: `${padZero(new Date().getHours() % 12 || 12)}:${padZero(new Date().getMinutes())}:${padZero(new Date().getSeconds())}`,
                date: `${new Date().getFullYear()}-${padZero(new Date().getMonth() + 1)}-${padZero(new Date().getDate())}`,// month is zero-indexed
                indianStandardDate: `${padZero(new Date().getDate())}/${padZero(new Date().getMonth() + 1)}/${new Date().getFullYear()}` // month is zero-indexed
            }
            state.todoList.unshift(newTodo)
        },

        removeTodo: (state, action) => {
            state.todoList = state.todoList.filter(todo => todo.id !== action.payload.id);
            state.searchedTodoList = state.searchedTodoList.filter((todo) => todo.id !== action.payload.id);
        },

        updateTodo: (state, action) => {
            // index of the todo to be updated
            const todoIndex = state.todoList.findIndex(todo => todo.id === action.payload.id);

            // check whether there is search query or not
            const todoIndex2 = state.findQuery ? state.searchedTodoList.findIndex(todo => todo.id === action.payload.id) : 0;

            // add 0 to the beginning of the single digit number
            const padZero = (num) => (num < 10 ? '0' + num : num);

            // updated todo
            const updatedTodo = {
                id: action.payload.id,
                subject: action.payload.subject,
                description: action.payload.description,
                bgColor: action.payload.bgColor,
                starredTodo: action.payload.markImportant,
                time: `${padZero(new Date().getHours() % 12 || 12)}:${padZero(new Date().getMinutes())}:${padZero(new Date().getSeconds())}`,
                date: `${new Date().getFullYear()}-${padZero(new Date().getMonth() + 1)}-${padZero(new Date().getDate())}`, // month is zero-indexed
                indianStandardDate: `${padZero(new Date().getDate())}/${padZero(new Date().getMonth() + 1)}/${new Date().getFullYear()}` // month is zero-indexed

            }

            if (todoIndex !== -1) {
                // remove the todo from its current position in the todoList array (original array)
                state.todoList.splice(todoIndex, 1);

                // remove the todo from its current position in the searchedTodoList array
                state.findQuery && state.searchedTodoList.splice(todoIndex2, 1)

                // add the updated todo to the beginning of the todoList array
                state.todoList.unshift(updatedTodo);

                // add the updated todo to the beginning of the searchedTodoList array
                state.findQuery && state.searchedTodoList.unshift(updatedTodo)
            }
        },

        searchTodo: (state, action) => {
            const { query } = action.payload;
            if (query === null || query.trim() === '') {
                // if the query is empty, restore the original todo list
                state.searchedTodoList = [];
            }
            else {
                // filter the todo list based on the search query
                state.searchedTodoList = state.todoList.filter(todo => {
                    const subject = todo.subject ? todo.subject.toLowerCase() : ''; // Handle null or undefined subject
                    const description = todo.description ? todo.description.toLowerCase() : ''; // Handle null or undefined description
                    const lowerCaseQuery = query.toLowerCase();
                    return subject.includes(lowerCaseQuery) || description.includes(lowerCaseQuery);
                });
            }
            state.findQuery = action.payload.query;
        },

        sortByDateAndTimeInIncreasingOrder: (state, action) => {
            // check whether there is search query or not
            state.searchedTodoList = state.findQuery ? [...state.searchedTodoList] : [...state.todoList]

            // sort todos based on time and date 
            state.searchedTodoList.sort((a, b) => {
                const dateA = new Date(`${a.date} ${a.time}`);
                const dateB = new Date(`${b.date} ${b.time}`);
                return dateA - dateB;
            });
        },

        sortByDateAndTimeInDecreasingOrder: (state, action) => {
            // check whether there is search query or not
            state.searchedTodoList = state.findQuery ? [...state.searchedTodoList] : [...state.todoList]

            // sort todos based on time and date 
            state.searchedTodoList.sort((a, b) => {
                const dateA = new Date(`${a.date} ${a.time}`);
                const dateB = new Date(`${b.date} ${b.time}`);
                return dateB - dateA;
            });
        },
        markTodoImportant: (state, action) => {
            // Find the index of the todo to be updated in the todoList
            const todoIndex = state.todoList.findIndex(todo => todo.id === action.payload.id);

            if (todoIndex !== -1) {
                // Update the todo's isImportant property in the todoList
                state.todoList[todoIndex].starredTodo = action.payload.markImportant;
            }

            // Check if there is an active search query
            if (state.searchedTodoList.length > 0) {
                // Find the index of the todo in the searchedTodoList
                const searchedTodoIndex = state.searchedTodoList.findIndex(todo => todo.id === action.payload.id);

                if (searchedTodoIndex !== -1) {
                    // Update the todo's isImportant property in the searchedTodoList
                    state.searchedTodoList[searchedTodoIndex].starredTodo = action.payload.markImportant;
                }
            }
        },

        showAllStarredTodos: (state, action) => {
            if (!state.findQuery) {
                state.searchedTodoList = state.todoList.filter((todo) => todo.starredTodo === true);
            }

            if (state.findQuery && state.searchedTodoList.length > 0) {
                state.unimportantTodoList = state.searchedTodoList.filter((todo) => todo.starredTodo !== true);
                state.searchedTodoList = state.searchedTodoList.filter((todo) => todo.starredTodo === true);
            }
            if (state.findQuery && state.searchedTodoList.length == 0) {
                state.searchedTodoList = [...state.importantTodoList];
            }
        },

        showAllUnStarredTodos: (state, action) => {
            if (!state.findQuery) {
                state.searchedTodoList = state.todoList.filter((todo) => todo.starredTodo !== true);
            }

            if (state.findQuery && state.searchedTodoList.length > 0) {
                state.importantTodoList = state.searchedTodoList.filter((todo) => todo.starredTodo === true);
                state.searchedTodoList = state.searchedTodoList.filter((todo) => todo.starredTodo !== true);
            }
            if (state.findQuery && state.searchedTodoList.length == 0) {
                state.searchedTodoList = [...state.unimportantTodoList];
            }
        },


        removeAllStarredTodos: (state, action) => {
            if (!state.findQuery) {
                state.todoList = state.todoList.filter((todo) => todo.starredTodo !== true)
            }
            if (state.searchedTodoList.length > 0) {
                const unstarred = state.searchedTodoList.filter((todo) => todo.starredTodo === true);
                state.searchedTodoList = state.searchedTodoList.filter((todo) => todo.starredTodo !== true);
                state.todoList = state.todoList.filter(todo => !unstarred.some(item => item.id === todo.id));
            }

        },

        removeAllUnstarredTodos: (state, action) => {
            if (!state.findQuery) {
                state.todoList = state.todoList.filter((todo) => todo.starredTodo === true)
            }

            if (state.searchedTodoList.length > 0) {
                const unstarred = state.searchedTodoList.filter((todo) => todo.starredTodo !== true);
                state.searchedTodoList = state.searchedTodoList.filter((todo) => todo.starredTodo === true);
                state.todoList = state.todoList.filter(todo => !unstarred.some(item => item.id === todo.id));
            }
        }
    }
})

export const { createTodo,
    removeTodo,
    updateTodo,
    searchTodo,
    markTodoImportant,
    showAllStarredTodos,
    showAllUnStarredTodos,
    removeAllStarredTodos,
    removeAllUnstarredTodos,
    sortByDateAndTimeInDecreasingOrder,
    sortByDateAndTimeInIncreasingOrder } = todoSlice.actions;

export default todoSlice.reducer;