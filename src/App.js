import React, { useState } from 'react';
import './App.css';
import { ADD_NEW_TODO_TO_LIST, DELETE_NEW_TODO_TO_LIST, UPDATE_NEW_TODO_TO_LIST } from './reducers/todolist'
import store from './store';
import { LABEL } from './constants/index';
import TableList from './components/tableList';

const App = () => {
  const [list, setList] = useState([]);
  const [isEdit, setIsEdit] = useState(false);
  const [sortBy, setSortBy] = useState(false);
  const [editId, setEditId] = useState('');

  const handleAddTodo = (e) => {
    // e.preventDefault();
    const title = document.getElementById('title').value;
    const description = document.getElementById('description').value;
    store.dispatch({
      type: ADD_NEW_TODO_TO_LIST,
      payload: {
        title,
        description,
        status: false
      }
    });
    document.getElementById('title').value = '';
    document.getElementById('description').value = '';
    setList(store.getState().todoList.requiredTodoList);
  };

  const handleEditTodo = (e) => {
    setIsEdit(false);
    // e.preventDefault();
    const title = document.getElementById('title').value;
    const description = document.getElementById('description').value;
    const updatedList = list.map((e) => {
      if (e.id === editId) {
        return {
          ...e,
          title,
          description,
        }
      } return e;
    })
    setList(updatedList);
    store.dispatch({
      type: UPDATE_NEW_TODO_TO_LIST,
      payload: updatedList
    });
    document.getElementById('title').value = '';
    document.getElementById('description').value = '';
    setList(store.getState().todoList.requiredTodoList);
  };

  const handleStatus = (checked, id) => {
    const statusList = list.map((e) => {
      if (e.id === id) {
        return {
          ...e,
          status: checked ? true : false
        }
      }
      return e;
    })
    setList(statusList);
    store.dispatch({
      type: UPDATE_NEW_TODO_TO_LIST,
      payload: statusList
    });
  };

  const handleEdit = (data) => {
    setEditId(data.id);
    setIsEdit(true);
    document.getElementById('title').value = data.title;
    document.getElementById('description').value = data.description;
  };

  const handleDelete = (id) => {
    const updatedList = list.filter(e => e.id !== id);
    setList(updatedList);
    store.dispatch({
      type: DELETE_NEW_TODO_TO_LIST,
      payload: updatedList
    });
  };

  const handleTable = (type) => {
    switch (type) {
      case 'All': setList(store.getState().todoList.requiredTodoList); break;
      case 'Completed': {
        const reqlist = store.getState().todoList.requiredTodoList.filter(e => e.status);
        console.log('reqList', reqlist);
        setList(reqlist);
        break;
      }
      case 'Not Completed': {
        const reqlist = store.getState().todoList.requiredTodoList.filter(e => !e.status);
        setList(reqlist);
        break;
      }
      default:
        break;
    }
  };

  const handleArraySort = () => {
    const data = store.getState().todoList.requiredTodoList;
    const uncompletedList = data.filter(e => !e.status);
    const completedList = data.filter(e => e.status);
    let reqList;
    if (sortBy) {
      reqList = completedList.concat(uncompletedList);
      setSortBy(false);
    }
    if (!sortBy) {
      reqList = uncompletedList.concat(completedList);
      setSortBy(true);
    }
    console.log('reqList', reqList);
    setList(reqList);
  };

  return (
    <div className="container">
      <div className="col-12">
        <div className="d-flex justify-content-center fs-18 fw-600 mt-2">
          {LABEL.TODO_LIST}
        </div>
        <form name="myForm" className="card p-2">
          <div className="col-12 row p-2">
            <div className="col-4 justify-content-center items-align-center">Title:</div>
            <div className="col-8 form-group">
              <input id="title" type="text" className="form-control" required/>
            </div>
          </div>
          <div className="col-12 row p-2">
            <div className="col-4 justify-content-center items-align-center">Description:</div>
            <div className="col-8 form-group">
              <textarea id="description" className="form-control" required/>
            </div>
          </div>
          <div className="row justify-content-center mt-2">
          <button className="col-4 btn btn-primary" type="submit" onClick={(e) => !isEdit ? handleAddTodo(e) : handleEditTodo(e)}>
            {isEdit ? LABEL.ADD : LABEL.UPDATE}
          </button>
        </div>
        </form>
      </div>
      {!isEdit && (
        <select className="col-4 form-control mt-2" onClick={e => handleTable(e.target.value)}>
          <option>All</option>
          <option>Completed</option>
          <option>Not Completed</option>
        </select>
      )}
      {!isEdit && <TableList list={list} handleDelete={handleDelete} handleStatus={handleStatus} handleEdit={handleEdit} handleArraySort={handleArraySort} />}
    </div>
  );
}

export default App;
