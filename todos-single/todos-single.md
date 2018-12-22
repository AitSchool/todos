# Todos Single
-- 待办应用（单例版本）

## 课程概要

本课程主要讲解 JavaScript 单例模式的使用方法，概括了 JavaScript 中单例、对象 的知识点。通过本课程，完成一个单例版 Todos 待办应用，大家将对单例模式，以及 JavaScript 的书写方法有更深入的了解。

主要包含以下功能：

- 把基础版的代码转化为单例模式

## 知识点
本课程涉及到的主要知识点有：

1. 对象结构

对象的结构由属性和属性值构成，类型的值可以存储任意类型的值，例如还可以是一个函数。

```js
const PAGE = {
  string: 'String',
  number: 99,
  boolean: true,
  array: [1,2,3],
  object: {
    id: 1,
    name: 'Jax'
  },
  sum: function(a, b) {
    return a + b
  }
}
```

2. 单例模式

单例模式确保在变量中只有一个类，同时在闭包中执行防止对全局的变量污染。在 JavaScript 中，我们可以通过对象来实现，把需要存储的数据、方法都放在该对象的属性值中，通过引用对象的属性来使用。

```js
// 全局的使用方法，有两个方法，这样全局就有两个变量。
let sum = function(a, b) {
  return a + b
}

let minus = function(a, b) {
  return a + b
}

sum(1,2);
minus(3,2);

// 单例子使用方法，无论有多少个方法，全局还是只有一个变量。
const PAGE = {
  sum: function(a, b) {
    return a + b
  },
  minus: function(a, b) {
    return a + b
  }
}

PAGE.sum(1,2);
PAGE.minus(3,2);
```

3. 委托绑定封装

在上一节的内容中，我们为 todoList 进行了委托绑定，单我们不仅仅绑定一类元素和事件，在这里我们有 2 个，分别是切换状态和删除，以后甚至会有更多个。或者说我们其他地方也会用到委托绑定，因此，我们更应该把委托绑定的方法封装起来，让事件的使用更有条理。

我们封装一个 onEventListener 函数，传入父级元素、触发行为、子级元素的 className ，还有回调函数。在 onEventListener 函数中使用 addEventListener 为父级元素绑定 action 的行为，在回调函数中判断实际触发的元素的 className 是否拥有目标子级元素的 className。如果有，就出发 callback 回调函数。这样在之后的委托绑定中，只要直接使用我们的 onEventListener 就都不需要自己在内部进行 className 的判断了。

```js
// 封装前
let todoList = document.getElementById('#todos-list');
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
```

```js
// 封装后
function onEventListener(parentNode,action,childClassName,callback) {
  parentNode.addEventListener(action,function(e){
    if(e.target.className.indexOf(childClassName) >= 0){
      callback(e);
    }
  })
}

let todoList = document.getElementById('#todos-list');
onEventListener(todoList,'click','todo-item-hd',function(e){
  let todoItem = e.target.parentNode;
  let isActive = todoItem.className.indexOf('active');
  if(isActive > 0){
    todoItem.className = 'todo-item';
  }else{
    todoItem.className += ' active';
  }
})
onEventListener(todoList,'click','todo-item-hd',function(e){
  let todoItem = e.target.parentNode;
  todoItem.remove();
})
```

## 实现步骤

1. 构建单例子框架对象
2. 把绑定事件放在 bind 方法内执行
3. 分离事件到其他的属性中
4. 委托绑定的封装

### 单例对象

1. 创建一个 PAGE 全局对象
2. 添加为 PAGE 添加 init 属性，其属性值为函数，用于作为启动方法
3. 添加为 PAGE 添加 bind 属性，其属性值为函数，用于作为绑定方法
4. 在 init 方法总调用 bind 方法
5. 在外部调用 PAGE 的 init 方法

```js
// 1. 创建一个 PAGE 全局对象
const PAGE = {
  // 2. 添加为 PAGE 添加 init 属性，其属性值为函数
  init: function() {
    // 4. 在 init 方法总调用 bind 方法
    this.bind();
  },
  // 3. 添加为 PAGE 添加 bind 属性，其属性值为函数
  bind: function() {
    console.log('binggo')
  }
}

// 5. 在外部调用 PAGE 的 init 方法
PAGE.init();
```

我们回顾一下代码的执行书序，这样我们声明了一个 PAGE 对象，里面包含 init 和 bind 方法。我们仅仅是声明，里面的两个方法是不会被运行的。然后我们执行了 PAGE.init 启动方法，启动方法接着执行了 this.bind 绑定方法。因此控制台就执行了绑定方法中的 console ，打印了 binggo 。

### 把绑定事件放在 bind 方法内执行
我们把在上一节 todos 基础版本的代码，放置在 bind 中执行。

```js
const PAGE = {
  init: function() {
    this.bind();
  },
  bind: function() {
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
  }
}

PAGE.init();
```

## 事件分离
把点击的回调函数，分离到一个新的属性方法中

1. 分离键盘事件绑定的方法到 addTodo 属性中。
2. 在键盘的绑定事件的回调中，引用 addTodo 方法。
3. 分离点击事件绑定的方法到 changeTodo 属性中。
4. 在点击的绑定事件的回调中，引用 changeTodo 方法。

```js
const PAGE = {
  init: function() {
    this.bind();
  },
  bind: function() {
    let todoInput = document.getElementById('todo-input');
    let todoList = document.getElementById('todos-list');
    // 2. 在键盘的绑定事件的回调中，引用 addTodo 方法。
    todoInput.addEventListener('keyup',this.addTodo);
    // 4. 在点击的绑定事件的回调中，引用 changeTodo 方法。
    todoList.addEventListener('click',this.changeTodo);
  },
  // 1. 分离键盘事件绑定的方法到 addTodo 属性中。
  addTodo: function(e) {
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
    // 注意获取 todoList
    let todoList = document.getElementById('todos-list');
    todoList.appendChild(todoItem);
    this.value = '';
  },
  // 3. 分离点击事件绑定的方法到 changeTodo 属性中。
  changeTodo: function(e) {
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
  }
}

PAGE.init();
```

### 委托绑定的封装

1. 添加 onEventListener 委托绑定方法
2. 在 bind 中使用 onEventListener ，分离出 toggleTodo 和 removeTodo 两个方法
3. 在 changeTodo 方法中分离出 toggleTodo 方法
4. 在 changeTodo 方法中分离出 toggleTodo 方法

```js
const PAGE = {
  init: function() {
    this.bind();
  },
  bind: function() {
    let todoInput = document.getElementById('todo-input');
    let todoList = document.getElementById('todos-list');
    todoInput.addEventListener('keyup',this.addTodo);
    // todoList.addEventListener('click',this.changeTodo);
    // 2. 使用 onEventListener ，分离出 toggleTodo 和 removeTodo 两个方法
    this.onEventLister(todoList,'click','todo-item-hd',this.toggleTodo);
    this.onEventLister(todoList,'click','todo-item-ft',this.removeTodo);
  },
  // 1. 添加 onEventListener 委托绑定方法
  onEventLister(parentNode,action,childClassName,callback) {
    parentNode.addEventListener(action,function(e){
      if(e.target.className.indexOf(childClassName) >= 0){
        callback(e);
      }
    })
  },
  addTodo: function(e) {
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
    // 注意获取 todoList
    let todoList = document.getElementById('todos-list');
    todoList.appendChild(todoItem);
    this.value = '';
  },
  // 3. 在 changeTodo 方法中分离出 toggleTodo 方法
  toggleTodo: function(e){
    let todoItem = e.target.parentNode;
    let isActive = todoItem.className.indexOf('active');
    if(isActive >= 0){
      todoItem.className = 'todo-item';
    }else{
      todoItem.className += ' active';
    }
  },
  // 4. 在 changeTodo 方法中分离出 toggleTodo 方法
  removeTodo: function(e){
    let todoItem = e.target.parentNode;
    todoItem.remove();
  },
  changeTodo: function(e) {
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
  }
}

PAGE.init();
```

这样可以对着一下单例模式前后的代码，我们减少了全局的变量，同时代码变得更加的清晰和具有逻辑。从 bind 方法中，一眼就可以清晰看到我们绑定了哪些事件。同时顺着属性名可以很快的定位到具体实现的逻辑之中。

## 代码示例

```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>Todes</title>
  <style type="text/css">
    *{
      margin: 0;
      padding: 0;
      font: 24px Helvetica, Arial, sans-serif;
      font-weight: 400;
      box-sizing: border-box;
      color: #666;
    }
    .todos-container{
      margin: 100px auto;
      width: 550px;
    }
    .todos-title{
      font-size: 100px;
      text-align: center;
      font-weight: 100;
      color: rgba(175, 47, 47, 0.15);
      margin-bottom: 20px;
    }
    .todos-content{
      position: relative;
      background: #fff;
      box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2);
    }

    .todos-input{
      display: block;
      width: 100%;
      padding: 16px 16px 16px 60px;
      border: none;
      outline: none;
      font-weight: 200;
    }
    .todo-item{
      padding: 16px;
      display: flex;
      border-top: 1px solid #e4e4e4;
    }
    .todo-item-hd{
      position: relative;
      width: 28px;
      height: 28px;
      border: 1px solid #e4e4e4;
      border-radius: 50%;
      margin-right: 16px;
      cursor: pointer;
    }
    .todo-item-bd{
      flex: 1;
      color: #333;
    }
    .todo-item-ft{
      display: none;
      cursor: pointer;
    }
    .todo-item:hover .todo-item-ft{
      display: inline-block;
      color: #999;
    }
    .todo-item.active .todo-item-hd:before{
      content: '';
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%,-50%);
      width: 12px;
      height: 12px;
      border-radius: 50%;
      background: rgba(175, 47, 47, 0.15);
    }
    .todo-item.active .todo-item-bd{
      text-decoration: line-through;
      color: #999;
    }
  </style>
</head>
<body>
  <div class="todos-container">
    <h1 class="todos-title">todos</h1>
    <div class="todos-content">
      <div class="todos-input-cell">
        <input id="todo-input" class="todos-input" type="text" name="todo" placeholder="请输入计划事项">
      </div>
      <div id="todos-list" class="todos-list">
        <div class="todo-item">
          <div class="todo-item-hd"></div>
          <div class="todo-item-bd">打一瓶酱油</div>
          <div class="todo-item-ft">x</div>
        </div>
        <div class="todo-item active">
          <div class="todo-item-hd"></div>
          <div class="todo-item-bd">跑步800米</div>
          <div class="todo-item-ft">x</div>
        </div>
      </div>
    </div>
  </div>

  <script type="text/javascript">
    const PAGE = {
      init: function() {
        this.bind();
      },
      bind: function() {
        let todoInput = document.getElementById('todo-input');
        let todoList = document.getElementById('todos-list');
        todoInput.addEventListener('keyup',this.addTodo);
        this.onEventLister(todoList,'click','todo-item-hd',this.toggleTodo);
        this.onEventLister(todoList,'click','todo-item-ft',this.removeTodo);
      },
      onEventLister(parentNode,action,childClassName,callback) {
        parentNode.addEventListener(action,function(e){
          if(e.target.className.indexOf(childClassName) >= 0){
            callback(e);
          }
        })
      },
      addTodo: function(e) {
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
        let todoList = document.getElementById('todos-list');
        todoList.appendChild(todoItem);
        this.value = '';
      },
      toggleTodo: function(e){
        let todoItem = e.target.parentNode;
        let isActive = todoItem.className.indexOf('active');
        if(isActive >= 0){
          todoItem.className = 'todo-item';
        }else{
          todoItem.className += ' active';
        }
      },
      removeTodo: function(e){
        let todoItem = e.target.parentNode;
        todoItem.remove();
      }
    }

    PAGE.init();
  </script>
</body>
</html>
```
