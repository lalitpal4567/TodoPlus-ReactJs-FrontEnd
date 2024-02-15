import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import {
    removeAllStarredTodos,
    removeAllUnstarredTodos,
    removeTodo,
    searchTodo,
    showAllStarredTodos,
    showAllUnStarredTodos,
    sortByDateAndTimeInDecreasingOrder,
    sortByDateAndTimeInIncreasingOrder
} from '../redux/reducers/todoSlice.js';

const Navbar = () => {
    const [query, setQuery] = useState("");
    const dispatch = useDispatch();

    const handleInputChange = (e) => {
        setQuery(e.target.value);
    }

    const handleFormSubmit = (e) => {
        e.preventDefault();
        dispatch(searchTodo({ query }));
    }
    const handleShowAllTodos = () => {
        dispatch(searchTodo({ query: '' }));
        setQuery('');
    }

    const handleSortInAscending = () => {
        dispatch(sortByDateAndTimeInIncreasingOrder());
    }

    const handleSortInDescending = () => {
        dispatch(sortByDateAndTimeInDecreasingOrder());
    }

    const handleShowAllStarredTodos = () => {
        dispatch(showAllStarredTodos());
    }

    const handleShowAllUnStarredTodos = () => {
        dispatch(showAllUnStarredTodos());
    }
    const handleDeleteAllStarredTodos = () => {
        dispatch(removeAllStarredTodos());
    }

    const handleDeleteAllUnstarredTodos = () => {
        dispatch(removeAllUnstarredTodos());
    }

    return (
        <>
            <nav className="navbar navbar-expand-lg" style={{ backgroundColor: "#FEC260" }}>
                <div className="container">
                    <a role='button' className="navbar-brand" data-bs-toggle="modal" data-bs-target="#exampleModal">
                        <img className='' style={{ width: 70, height: 70 }} src="./to-do-list.png"></img>
                    </a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item dropdown d-lg-none">
                                <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    Sort by
                                </a>
                                <ul className="dropdown-menu">
                                    <li><a className="dropdown-item" role="button" onClick={handleSortInAscending}>sortTodosByDateAscending</a></li>
                                    <li><a className="dropdown-item" href="#" role="button" onClick={handleSortInDescending}>sortTodosByDateDescending</a></li>
                                </ul>
                            </li>
                            <li className="nav-item dropdown d-lg-none">
                                <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    Starred Todos
                                </a>
                                <ul className="dropdown-menu">
                                    <li><a className="dropdown-item" role="button" onClick={handleShowAllStarredTodos}>important todos</a></li>
                                    <li><a className="dropdown-item" role="button" onClick={handleShowAllUnStarredTodos}>Unimportant todos</a></li>
                                    <li><a className="dropdown-item" href="#" role="button" onClick={handleDeleteAllStarredTodos}>remove important todos</a></li>
                                    <li><a className="dropdown-item" href="#" role="button" onClick={handleDeleteAllUnstarredTodos}>remove unimportant todos</a></li>
                                </ul>
                            </li>
                        </ul>
                        <div className='d-flex ms-auto'>
                            <button className='btn bg-primary text-white me-2' onClick={handleShowAllTodos}>Show All</button>
                            <form className="d-flex m-auto" role="search">
                                <input
                                    className="form-control me-2"
                                    type="search"
                                    placeholder="Search"
                                    aria-label="Search"
                                    name="search"
                                    value={query}
                                    onChange={handleInputChange}
                                />
                                <button className='btn btn-outline-success' type="submit" onClick={handleFormSubmit}>Search</button>
                            </form>
                        </div>
                        <div className="dropdown d-none d-lg-block ms-auto me-3" style={{ right: 20 }}>
                            <button className="btn dropdown-toggle fw-semibold border-0" style={{ backgroundColor: "#7BD3EA" }} type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                Sort by
                            </button>
                            <ul className="dropdown-menu">
                                <li><a className="dropdown-item" role="button" onClick={handleSortInAscending}>sortTodosByDateAscending</a></li>
                                <li><a className="dropdown-item" href="#" role="button" onClick={handleSortInDescending}>sortTodosByDateDescending</a></li>
                            </ul>
                        </div>
                        <div className="dropdown d-none d-lg-block me-auto" style={{ right: 20 }}>
                            <button className="btn dropdown-toggle fw-semibold border-0" style={{ backgroundColor: "#7BD3EA" }} type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                Starred Todos
                            </button>
                            <ul className="dropdown-menu">
                                <li><a className="dropdown-item" role="button" onClick={handleShowAllStarredTodos}>important todos</a></li>
                                <li><a className="dropdown-item" role="button" onClick={handleShowAllUnStarredTodos}>Unimportant todos</a></li>
                                <li><a className="dropdown-item" href="#" role="button" onClick={handleDeleteAllStarredTodos}>remove important todos</a></li>
                                <li><a className="dropdown-item" href="#" role="button" onClick={handleDeleteAllUnstarredTodos}>remove unimportant todos</a></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </nav>

            {/* <!-- Modal --> */}
            <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog modal-dialog-scrollable" >
                    <div class="modal-content" style={{ backgroundColor: "#7BD3EA" }}>
                        <div class="modal-header">
                            <h1 class="modal-title fs-5" id="exampleModalLabel">TodoPulse</h1>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body" >
                            <h2>Features</h2>
                            <ul>
                                <li className=''>
                                    <p><b>Add Todos:</b> Users can add new todos with a subject, description.</p>
                                </li>
                                <li>
                                    <p><b>Delete Todos:</b> Users can delete todos individually.</p>
                                </li>
                                <li>
                                    <p><b>Edit Todos:</b> Users can edit existing todos to update their subject and description.</p>
                                </li>
                                <li>
                                    <p><b>Copy Todo Text:</b> Users can copy the text of a todo's subject and description to the clipboard.</p>
                                </li>
                                <li>
                                    <p><b>Mark Todos as Important:</b> Users can mark todos as important by toggling a star icon.</p>
                                </li>
                                <li>
                                    <p><b>Search Todos:</b> Users can search for todos based on their subject or description.</p>
                                </li>
                                <li>
                                    <p><b>Highlight Search Results: </b> The app highlights search results within the todo's subject and description.</p>
                                </li>
                                <li>
                                    <p><b>Sort Todos:</b> Sorts the todos based on date and time in ascending or descending order</p>
                                </li>
                                <li>
                                    <p><b>Filter todos:</b> Users can filters important and unimportant todos and remove them</p>
                                </li>
                            </ul>
                            <div>
                                <h5>Technolgies Used: </h5>
                                <h1 className=' fs-5'>React Js <b>+</b> Redux <b>+</b> Redux toolkit <b>+</b> BootStrap 5 <b>+</b> ChatGPT 3.5</h1>
                            </div>
                            <i className='d-block text-end' >Developed by: Lalit Pal</i>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Navbar
