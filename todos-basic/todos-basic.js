let todoInput = document.getElementById('todo-input');
let todoList = document.getElementById('todos-list');

todoInput.addEventListener('keyup',function(e){
  let value = this.value.trim();
  let key = e.which;
  if (e.which !== 13 || !value) {
    return;
  }
  let todoItem = document.createElement('div');
  let todoItemHd = document.createElement('div');
  let todoItemBd = document.createElement('div');
  let todoItemFt = document.createElement('div');
  todoItem.setAttribute('class','todo-item');
  todoItemHd.setAttribute('class','todo-item-hd');
  todoItemBd.setAttribute('class','todo-item-bd');
  todoItemFt.setAttribute('class','todo-item-ft');
  todoItemBd.innerText = value;
  todoItemFt.innerText = 'x';
  todoItem.appendChild(todoItemHd);
  todoItem.appendChild(todoItemBd);
  todoItem.appendChild(todoItemFt);
  todoList.appendChild(todoItem);
  this.value = '';
})

todoList.addEventListener('click',function(e){
  let className = e.target.className;
  let todoItem = e.target.parentNode;
  if(className === 'todo-item-hd'){
    let isActive = todoItem.className.indexOf('active');
    if(isActive > 0){
      todoItem.className = 'todo-item';
    }else{
      todoItem.className += ' active';
    }
  }else if(className === 'todo-item-ft'){
    todoItem.remove();
  }
})