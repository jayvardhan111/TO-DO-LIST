import './App.css';
import Header from "./MyComponents/Header";
import {Footer} from "./MyComponents/Footer";
import {Todos} from "./MyComponents/Todos";
import {AddTodo} from "./MyComponents/AddTodo";
import {About} from "./MyComponents/About";
import React, {useState, useEffect} from 'react';
import{
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";

function App() {
  let initTodo;
  if(localStorage.getItem("todos")===null){
    initTodo=[];
  }
  else{
    initTodo= JSON.parse(localStorage.getItem("todos"));
  }
  const onDelete = (todo)=>{
    console.log("onDelete of todo", todo);
    // deleting this way in react cant work
    // let index = todos.indexOf(todo);
    // todos.splice(index, 1);
    setTodos(todos.filter((e) =>{
      return e!==todo;
    }));
    console.log("deleted",todos);
    localStorage.getItem("todos", JSON.stringify(todos));
  }

  const addTodo = (title,desc) =>{
    console.log("adding a todo", title, desc);
    let sno;
    if(todos.length===0){
      sno = 0;
    }
    else{
      sno = todos[todos.length-1].sno + 1;
    }
    
    const myTodo = {
      sno: sno,
      title: title,
      desc: desc,
    }
    setTodos([...todos, myTodo]);
    console.log(myTodo);

    localStorage.setItem("todos", JSON.stringify(todos));
  }

  const[todos, setTodos] = useState(initTodo);
  
  useEffect(()=>{
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]) 
  return (
    <>
    <Router>
      <Header title="My Todos List" searchBar={false}/>
      <Switch>
        <Route exact path="/" render={()=>{
          return(
          <>
            <AddTodo addTodo={addTodo}/>
            <Todos todos={todos} onDelete={onDelete}/>
          </>)
        }}>
        </Route>
        <Route path="/about">
          <About/>
        </Route>
      </Switch>
      <Footer/>

      </Router>
    </>
  );
}

export default App;

