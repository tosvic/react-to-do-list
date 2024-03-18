import { useState } from "react";



function Todo() {
    const [todos, setTodos] = useState([]);
    const [inputValue, setInputValue] = useState('');
    const [editingId, setEditingId] = useState('');
    const [editedText, setEditedText] = useState('');

    const handleInputChange = (event) => {
        setInputValue(event.target.value);
    };

    const handleAddTodo = () => {
        if (inputValue.trim() !== '') {
            const newTodo = {
                id: Date.now(),
                text: inputValue.trim(),
            };
            setTodos([...todos, newTodo]);
            setInputValue('');
        }
    };

    const handleEditStart = (id, text) => {
        setEditingId(id);
        setEditedText(text);
    };

    const handleEditChange = (event) => {
        setEditedText(event.target.value);
    };

    const handleEditSubmit = (id) => {
        const updatedTodos = todos.map(todo =>
            todo.id === id ? { ...todo, text: editedText } : todo
        );
        setTodos(updatedTodos);
        setEditingId('');
        setEditedText('');
    };

    const handleDeleteTodo = (id) => {
        const updatedTodos = todos.filter(todo => todo.id !== id);
        setTodos(updatedTodos);
        // If the deleted item is being edited, cancel the edit
        if (editingId === id) {
            setEditingId('');
            setEditedText('');
        }
    };

    return (
        <div className="container">
            <h1>To-Do List App</h1>
            <div className="input-container">
                <input type="text" placeholder="Enter a task" value={inputValue} onChange={handleInputChange} />
                <button onClick={handleAddTodo}>Add</button>
            </div>

            <ol className="todo-list">
                {todos.map(todo => (
                    <li key={todo.id}>
                        {editingId === todo.id ? (
                            <input type="text" value={editedText} onChange={handleEditChange} />

                        ) : (<span>{todo.text}</span>
                        )}

                        <div className="button-container">
                            {editingId === todo.id ? (
                                <button onClick={() => handleEditSubmit(todo.id)}>Save</button>
                            ) : (
                                <button onClick={() => handleEditStart(todo.id, todo.text)}>Edit</button>
                            )}
                            <button onClick={() => handleDeleteTodo(todo.id)}>Delete</button>
                        </div>
                    </li>
                ))}
            </ol>
        </div>
    );
}

export default Todo