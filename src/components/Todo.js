import React, { useEffect, useState } from 'react'
import "./Todo.css"
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import StarIcon from '@mui/icons-material/Star';
import StarOutlineIcon from '@mui/icons-material/StarOutline';
import { useDispatch, useSelector } from 'react-redux';
import { markTodoImportant, removeTodo, updateTodo } from '../redux/reducers/todoSlice.js';

const Todo = ({ todoData }) => {
    const dispatch = useDispatch();
    const [editTodo, setEditTodo] = useState({ ...todoData });
    const [isImportant, setIsImportant] = useState(false);
    const searchQuery = useSelector((state) => state.todo.findQuery);

    // function to delete todo
    const handleRemoveTodo = () => {
        dispatch(removeTodo({ id: editTodo.id }));
    }

    // store the values of input fields into states
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditTodo(prevState => ({
            ...prevState,
            [name]: value
        }));
    }

    const handleUpdateTodo = () => {
        dispatch(updateTodo(editTodo))
    }

    // function to highlight the search query within the text
    const highlightSearchQuery = (text, query) => {
        if (!query || !text) return text;
        const parts = text.split(new RegExp(`(${query})`, 'gi'));
        return parts.map((part, index) =>
            part.toLowerCase() === query.toLowerCase() ? <mark key={index} style={{ backgroundColor: 'white', fontWeight: "bold" }}>{part}</mark> : part
        );
    };

    const handleCopyText = () => {
        // copy the todo description to the clipboard
        navigator.clipboard.writeText(todoData.subject + "\n" + todoData.description);
    }

    const handleToggleImportant = () => {
        // toggle the important state
        const updatedIsImportant = !isImportant;
        setIsImportant(updatedIsImportant);

        // dispatch the markTodoImportant action with the updatedIsImportant value
        dispatch(markTodoImportant({
            id: todoData.id,
            markImportant: updatedIsImportant,
        }));
    }

    return (
        <>
            <div className='card rounded-3 overflow-hidden card-main-container border-0'>
                <div className='subject-container d-inline-block d-flex align-items-center'>
                    <h1 className=' fs-6 px-2 py-3 m-0 overflow-hidden  text-truncate' style={{ height: 51.2 }}>{todoData.subject}</h1>
                    {todoData.starredTodo ? (
                        <StarIcon className='tool-icon ms-auto me-1' role="button" onClick={handleToggleImportant} style={{ color: "#FFA500	" }} />
                    ) : (
                        <StarOutlineIcon className='tool-icon ms-auto me-1' role="button" onClick={handleToggleImportant} style={{ color: "#FFD700" }} />
                    )}
                </div>
                <div role='button' data-bs-toggle="modal" data-bs-target={`#exampleModal-${todoData.id}`} data-bs-whatever="@mdo" className='card-body description-container' style={{ backgroundColor: `${todoData.bgColor}` }} >
                    <p className='m-0 description'>{highlightSearchQuery(todoData.description, searchQuery)}</p>
                </div>
                <div className='d-flex p-2 flex-wrap sub-bg-color bottom-bar'>
                    <div className=' fw-medium'>
                        <p className='m-0 text-body-tertiary' style={{ fontSize: 12 }}>{todoData.indianStandardDate}</p>
                        <p className='m-0 text-body-tertiary' style={{ fontSize: 12 }}>{todoData.time}</p>
                    </div>
                    <div className='d-flex justify-content-evenly ms-auto align-items-center flex-wrap column-gap-3'>
                        <DeleteIcon className='tool-icon' role="button" data-bs-toggle="modal" data-bs-target={`#confirmDelete-${todoData.id}`} />
                        <EditIcon className='tool-icon' role="button" data-bs-toggle="modal" data-bs-target={`#staticBackdrop1-${todoData.id}`} />
                    </div>
                </div>
            </div>

            {/* expand todo modal */}
            <div className="modal fade" id={`exampleModal-${todoData.id}`} tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content p-3" style={{ backgroundColor: "#A0E9FF" }}>
                        <div className="">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">Description</h1>
                        </div>
                        <div className="modal-body px-0">
                            <p>{todoData.subject}</p>
                            <p>{todoData.description}</p>
                        </div>
                        <div className=" d-flex flex-wrap justify-content-end column-gap-3">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={handleCopyText}>Copy text</button>
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        </div>
                    </div>
                </div>
            </div>

            {/* delete todo confirm modal */}
            <div className="modal fade" id={`confirmDelete-${todoData.id}`} tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content px-3 py-2">
                        <div className="">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">Confirm</h1>
                        </div>
                        <div className="py-2">
                            Are you sure ? You want to delete this todo?
                        </div>
                        <div className="d-flex justify-content-end column-gap-3 py-2">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={handleRemoveTodo}>Confirm</button>
                        </div>
                    </div>
                </div>
            </div>

            {/* update todo modal */}
            <div className="modal fade" id={`staticBackdrop1-${todoData.id}`} data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content" style={{ backgroundColor: "#A0E9FF" }}>
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="staticBackdropLabel">Update Todo</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form>
                                <div className="mb-3">
                                    <label for="recipient-name" className="col-form-label">Subject:</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="recipient-name"
                                        name="subject"
                                        value={editTodo.subject}
                                        onChange={handleInputChange}
                                        placeholder='enter subject'
                                        required
                                    />
                                </div>
                                <div className="mb-3">
                                    <label for="message-text" className="col-form-label">Description:</label>
                                    <textarea
                                        className="form-control"
                                        id="message-text"
                                        name="description"
                                        onChange={handleInputChange}
                                        value={editTodo.description}>
                                    </textarea>
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                            <button type="button" className="btn btn-primary" data-bs-dismiss="modal" onClick={handleUpdateTodo}>Update</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Todo