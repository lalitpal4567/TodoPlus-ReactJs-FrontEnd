import React, { useEffect, useState } from 'react'
import Todo from './Todo'
import "./TodoList.css"
import AddIcon from '@mui/icons-material/Add';
import { useDispatch, useSelector } from 'react-redux';
import { createTodo } from '../redux/reducers/todoSlice.js';

const TodoList = () => {
    const [newTodo, setNewTodo] = useState({});
    const todoList = useSelector((state) => state.todo.todoList);
    const searchTodos = useSelector((state) => state.todo.searchedTodoList);
    const [displayTodos, setDisplayTodos] = useState([]);
    const dispatch = useDispatch();

    const generateBg = () => {
        const backgroundColors = ['#FFE4C4', '#ADD8E6', '#98FB98', '#FFD700', '#F0E68C', "#FFB996",
            "#FDFF00", "#A7FFE4", "#CDF0EA", "#FECD70", "#F0E161", "#FFDEB4", "#98EECC", "#B1BCE6",
            "#B2C8BA", "#F9B572", "#45FFCA", "#F7A4A4", "#FF8DC7", "#B3FFAE", "#FFC5C5", "#D0A2F7",
            "#F0EDD4", "#E8A0BF", "#FEFF86", "#F8CBA6", "#FFEA20", "#C780FA", "#7FE9DE", "#9CFF2E",
            "#45FFCA", "#D67BFF", "#A8DF8E", "#FFE5E5", "#D0BFFF", "#FFD9C0", "#FDFFAE", "#98EECC",
            "#38E54D", "#D9EDBF", "#FDFFAB",
        ];
        // generate a random index to pick a color from the array
        const randomIndex = Math.floor(Math.random() * backgroundColors.length);
        return backgroundColors[randomIndex]
    }
    const handleAddNewTodo = (e) => {
        const todoBgColor = generateBg();
        // dispatch(createTodo(newTodo));
        dispatch(createTodo({
            subject: newTodo.subject,
            description: newTodo.description,
            bgColor: todoBgColor,
        }));
        setNewTodo({ subject: '', description: '' });
    }

    useEffect(() => {
        if (searchTodos.length > 0) {
            setDisplayTodos(searchTodos);
            console.log("running searchTodos");
            // console.log(searchTodos);
        } else {
            setDisplayTodos(todoList);
            console.log("running todoList");
        }
    }, [searchTodos, todoList])


    useEffect(() => {
        const myModal = document.getElementById('staticBackdrop')
        const myInput = document.getElementById('recipient-name')

        myModal.addEventListener('shown.bs.modal', () => {
            myInput.focus()
        })
    }, [])

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewTodo({
            ...newTodo,
            [name]: value
        })
    }

    return (
        <div className=''>
            <div className='container d-flex justify-content-evenly justify-content-sm-start flex-wrap column-gap-4 row-gap-4 py-4 noteList'>

                {
                    searchTodos.length === 0 &&
                    <div role='button' data-bs-toggle="modal" data-bs-target="#staticBackdrop" className='d-flex justify-content-center align-items-center bg-body-secondary rounded-3 create-todo'>
                        <div className=' rounded-circle' style={{ width: 100, height: 100, backgroundColor: "#DDDDDD" }} >
                            <AddIcon className=' fs-1 m-auto d-block h-100' />
                        </div>
                    </div>
                }
                {
                    displayTodos.map((todo) => {
                        return <Todo key={todo.id} todoData={todo} />
                    })
                }
            </div>

            {/* modal  */}
            <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content p-3" style={{ backgroundColor: "#A0E9FF" }}>
                        <div className="d-flex">
                            <h1 className="modal-title fs-5" id="staticBackdropLabel">Todo</h1>
                            <button type="button" className="btn-close ms-auto" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="">
                            <form>
                                <div className="mb-2">
                                    <label for="recipient-name" className="col-form-label">Subject:</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="recipient-name"
                                        name="subject"
                                        value={newTodo.subject}
                                        onChange={handleInputChange}
                                        placeholder='enter subject'
                                    />
                                </div>
                                <div className="mb-3">
                                    <label for="message-text" className="col-form-label">Description:</label>
                                    <textarea
                                        className="form-control"
                                        id="message-text"
                                        name="description"
                                        onChange={handleInputChange}
                                        value={newTodo.description}>
                                    </textarea>
                                </div>
                            </form>
                        </div>
                        <div className="d-flex justify-content-end column-gap-3">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                            <button type="button" onClick={handleAddNewTodo} className="btn btn-primary" data-bs-dismiss="modal">Create</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TodoList

