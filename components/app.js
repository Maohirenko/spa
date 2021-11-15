import ReactDOM from "react-dom";
import React from 'react';
ß
let id = 0

const Todo = props => (
  <li className="todo-container">
    <input className='todo-checkbox' type="checkbox" checked={props.todo.checked} onChange={props.onToggle} />
    <button className="button center todo-delete"  onClick={props.onDelete}>delete</button>
    <span className="todo-text">{props.todo.text}</span>
  </li>
)



class App extends React.Component {
  constructor() {
    super()
    this.myRef = React.createRef();
    this.state = {
      todos: [],
      
    }
  }
 
 
   componentWillMount() {

     if (JSON.parse(localStorage.getItem('tasks'))) {

      this.state.todos = JSON.parse(localStorage.getItem('tasks'));
 
     }

   }
 
  addTodo() {
    
   const text = this.myRef.current.value;
  
    this.setState({
      todos: [
        ...this.state.todos,
        {id: id++, text: text, checked: false},
      ], 
    },() => this.resetStore())
 

    this.myRef.current.value=""
  }
  
 resetStore(){
  localStorage.setItem('tasks', JSON.stringify(this.state.todos) );
  
  }

  removeTodo(id) {
    this.setState({
      todos: this.state.todos.filter(todo => todo.id !== id)
    },() => this.resetStore())
 
  }

  toggleTodo(id) {
    this.setState({
      todos: this.state.todos.map(todo => {
        if (todo.id !== id) return todo
        return {
          id: todo.id,
          text: todo.text,
          checked: !todo.checked,
        }
      })
    },() => this.resetStore())

  }

  render() {
    return (
      <div class="container center">
         <h1 class="center title">My TODO App</h1>
         <input ref={this.myRef}  type="sumbit" placeholder="addToDo"   style={{height: "20px"}} />
        
        <div className="flow-right controls">
        <div >Todo count: {this.state.todos.length}</div>
        <div>Unchecked todo count: {this.state.todos.filter(todo => !todo.checked).length}</div>
        </div>
        <button className="button center" onClick={() => this.addTodo()}>Add TODO</button>
        <ul className="todo-list">
          {this.state.todos.map(todo => (
            <Todo
              onToggle={() => this.toggleTodo(todo.id)}
              onDelete={() => this.removeTodo(todo.id)}
              todo={todo}
            />
          ))}
        </ul>
      </div>
    )
  }
}

const app = document.getElementById('app');
if(app){
    ReactDOM.render(<App/>, app);
}
