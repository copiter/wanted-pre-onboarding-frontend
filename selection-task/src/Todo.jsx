import React, { useState, useEffect } from 'react'
import { useNavigate } from "react-router-dom";
import api from './api';

const AUTHORIZATION = `Bearer ${localStorage.getItem("access_token")}`;

function Todo() {
  const navigate = useNavigate();
  const [todos, setTodos] = useState([]);
  const [rerender, setRerender] = useState(false);
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    fetch(api.getTodos(), {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: AUTHORIZATION,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setTodos(data);
      });
  }, []);

  // useEffect(() => {
  //   const checkJwt = localStorage.getItem("access_token");

  //   if (checkJwt === null) {
  //     navigate("/");
  //   }
  // }, [navigate]);

  function handleInput(e) {
    setInputValue(e.target.value);
  }

  function handleCreateTodo() {
    fetch(api.createTodo(), {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: AUTHORIZATION,
      },
      body: JSON.stringify({todo: inputValue})
    })
      .then((res) => {
        console.log(res);
        if (res.status === 201) {
          return res.json();
        } 
      })
      .then((data) => {
        setTodos([...todos, data])
      });
  }

  function handleDeleteTodo(serverId, arrayId) {
    fetch(api.deleteTodo(serverId), {
      method: "DELETE",
      headers: {
        Authorization: AUTHORIZATION,
      },
    }).then((res) => {
      console.log(res);
      if (res.status === 204) {
        todos.splice(arrayId, 1);
        setTodos(todos.filter((item,idx) => idx !== arrayId));
      } else {
        alert("삭제 되지 않았습니다.");
      }
    });
      
  }


  return (
    <>
      <ul>
        {todos.map((item, idx) => (
          <li key={idx}>
            <input
              type="checkbox"
              checked={item.isCompleted}
              // onChange={handleUpdateTodo}
            />
            <span>{item.todo}</span>
            <button>수정</button>
            <button>제출</button>
            <button>수정취소</button>
            <button onClick={() => handleDeleteTodo(item.id, idx)}>삭제</button>
          </li>
        ))}
      </ul>
      <div>
        <label htmlfor="create">추가</label>
        <input
          type="text"
          name="create"
          value={inputValue}
          onChange={handleInput}
        />
        <button
          type="button"
          onClick={handleCreateTodo}
        >
          추가
        </button>
      </div>
    </>
  );
}

export default Todo