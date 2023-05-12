 //referencias en el HTML

import { todoList } from "..";
import { Todo, TodoList } from "../classes";

const divTodoList =  document.querySelector('.todo-list');
const txtInput = document.querySelector('.new-todo');
const btnBorrar = document.querySelector('.clear-completed');
const ulFiltros = document.querySelector('.filters');
const anchorFiltros = document.querySelectorAll('.filtro');


export const crearTodoHtml = ( todo ) => {
    const htmlTodo = `
        <li class="${ (todo.completado)? 'completed':'' }" data-id="${ todo.id }">
            <div class="view">
                <input class="toggle" type="checkbox" ${ (todo.completado)? 'checked':'' }>
                <label>${ todo.tarea }</label>
                <button class="destroy"></button>
            </div>
            <input class="edit" value="Create a TodoMVC template">
        </li>`;

    const div = document.createElement('div');
    div.innerHTML = htmlTodo;

    divTodoList.append( div.firstElementChild ); //elimina el div, y regresa el primer elemento "li"

    return div;

}

//Eventos
txtInput.addEventListener('keyup', (event)=>{

    if ( event.keyCode === 13 && txtInput.value.length>0){
        const nuevoTodo = new Todo( txtInput.value );
        todoList.nuevoTodo( nuevoTodo );

        crearTodoHtml( nuevoTodo );
        txtInput.value = '';
    }

});

divTodoList.addEventListener('click', ( event)=>{

    console.log(event.target.localName);    
    console.log(event.target.parentElement.parentElement.getAttribute('data-id'));

    const nombreElemento    = event.target.localName;
    const todoElemento      = event.target.parentElement.parentElement;
    const todoId            = event.target.parentElement.parentElement.getAttribute('data-id');

    if (nombreElemento.includes('input')){ //click en el check
        todoList.marcarCompletado( todoId );
        todoElemento.classList.toggle('completed');
    }

    if (nombreElemento.includes('button')){ //Eliminar el todo
        todoList.eliminarTodo( todoId );
        divTodoList.removeChild(todoElemento);
    }
    

});


btnBorrar.addEventListener('click', ()=>{
    todoList.eliminarCompletados();

    for (let i = divTodoList.children.length-1; i >= 0; i--) {
        const element = divTodoList.children[i];

        if (element.classList.contains('completed')){
            divTodoList.removeChild(element);
        }        
    }
});


ulFiltros.addEventListener('click', (event)=>{
    
    const filtro =  event.target.text;
    if (!filtro) return;

    anchorFiltros.forEach(elem => elem.classList.remove('selected'));
    event.target.classList.add('selected');



    for (const elemento of divTodoList.children) {
        
        elemento.classList.remove('hidden');
        const completado = elemento.classList.contains('completed');

        switch ( filtro ) {
            case 'Pendientes':
                if ( completado )
                    elemento.classList.add('hidden');
                break;

                case 'Completados':
                    if ( !completado )
                        elemento.classList.add('hidden');
                    break;
            default:
                break;
        }
        
        
    }




    

});