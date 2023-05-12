import './styles.css';

import { Todo, TodoList } from "./classes"; //index.js por omisión
import { crearTodoHtml } from './js/componentes';


export const todoList = new TodoList();

// const tarea = new Todo('Aprender javascript');
// todoList.nuevoTodo( tarea );

// console.log( todoList );

//crearTodoHtml( tarea );

//todoList.todos.array.forEach(todo => crearTodoHtml( todo ));
todoList.todos.forEach(crearTodoHtml); // se puede simplificar porque es solo un argumento


