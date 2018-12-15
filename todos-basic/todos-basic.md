# Todos Basic 
-- 待办应用（基础版本）

## 课程概要

本课程主要讲解 DOM 和 事件，概括了 JavaScript 在 Web 页面中的 DOM元素操作，包括 创建、修改、删除元素，以及事件处理的应用，涉及到点击事件、键盘事件、事件绑定、委托绑定的知识点。通过本课程，完成一个基础版 Todos 待办应用，大家将对 DOM 的操作以及事件的处理有更深入的了解。

主要包含以下功能：

- 输入框输入新增待办事项，按一下回车，新增一项记录
- 点击可以切换待办事项是否完成的状态
- 点击可以删除待办事项

## 知识点
本课程涉及到的主要知识点有：

1. getElementById 获取指定的 ID 元素

```js
let todoInput = document.getElementById('todo-input');
// 获取在 HTML 中 id 为 todo-input 的元素
```

2. createElement 创建一个 HTML 元素

```js
let newElem = document.createElement('div');
// 创建了一个 div 的元素
```

3. setAttribute 为元素设置属性值

```js
let newElem = document.createElement('div');
newElem.setAttribute('class','todo-item');
newElem.setAttribute('data-index','1');
// 设置元素的 className 为 todo-item
// 设置元素的 data-index 属性值 为 1
```

4. appendChild 在末尾添加一个元素

```js
let parentElem = document.createElement('div');
let childElem = document.createElement('p');
parentElem.appendChild(childElem);
// 把 p 元素添加到 div 元素的末尾
```

5. remove 删除元素

```js
let todoInput = document.getElementById('todo-input');
todoInput.remove();
// 把 HTML中 id 为 todo-input 元素删除
```

6. innerText 元素文本内容的属性

```js
let newElem = document.createElement('div');
newElem.innerText = 'text demo';
// 为 div 的文本内容赋值为 text demo
```

7. value 输入元素的内容值

```js
let todoInput = document.getElementById('todo-input');
todoInput.value = 'value demo';
// 为 input 的输入框赋值为 value demo
```

8. indexOf 第一次出现的指定值的索引

```js
let tmpStr = 'Hello aitSchiool!'
let tmpArr = ['HTML','CSS','JavaScript'];

tmpStr.indexOf('ait');   // 6
tmpStr.indexOf('world'); // -1
tmpArr.indexOf('CSS');   // 1
tmpArr.indexOf('PHP');   // -1

// 返回指定值的第一次出现的索引，如果没有找到则返回 -1。
```

9. addEventListener、event 绑定事件与事件对象

```js
let todoInput = document.getElementById('todo-input');
todoInput.addEventListener('keyup',function(event){
  console.log('我正在在输入' + this.value)
  console.log(event.which);
})
// 为 input 元素绑定一个键盘事件，当按下键位弹起的瞬间，触发函数，打印当前输入的值。
// event 为绑定事件中默认的回调参数，我们可以在这个时间对象中获取和当前事件相关的信息，例如 event.which 可以获取到到底是按下那个键位触发的。
```

10. 委托绑定

```js
let todoList = document.getElementById('todo-list');
todoList.addEventListener('click',function(event){
  console.log(event.target);
  if( event.target.className === 'todo-item-hd'){
    console.log('bingo')
  }
})

// 委托绑定，主要使用了事件冒泡的原理和事件对象组合事项的。在某些动态生成的元素，在 HTML 不存在的时候，我们无法直接对它进行事件的绑定。但是他的父级元素是存在的，我们绑定在其父级元素上。当我们点击里面的元素时，事件会逐层的冒泡往上传递，触发我们绑定父级元素的事件。在这个时候，我们通过事件对象，获取事件实际点击触发的元素，并对其特定的属性进行判断，例如 className 。如果满足条件，则触发我们想要的逻辑事件，这就是委托绑定。
```


## 实现步骤

1. HTML & CSS
2. 添加项目
3. 切换和删除项目

### HTML & CSS
完成 HTML 和 CSS 结构和样式（ 包含项目否完成两个状态的样式 ）

1. HTML

```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>Todes</title>
</head>
<body>
  <div class="todos-container">
    <h1 class="todos-title">todos</h1>
    <div class="todos-content">
      <div class="todos-input-cell">
        <input class="todos-input" id="todo-input" type="text" name="todo" placeholder="请输入计划事项">
      </div>
      <div class="todos-list" id="todos-list">
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
</body>
</html>
```

2. css

```css
*{
  margin: 0;
  padding: 0;
  font: 24px Helvetica, Arial, sans-serif;
  font-weight: 400;
  color: #666;
  box-sizing: border-box;
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
```

### 添加项目
输入框元素绑定键盘事件 keyup 当按下 ENTER 按键时候触发，主要有以下逻辑：

1. 获取输入框的输入值
2. 获取当前按下的键位
3. 如果按下的不是 ENTER 键或者输入框没有输入值，返回结束
4. 创建项目所包含元素
5. 为创建的元素添加 className 属性
6. 为创建的元素添加文本值
7. 把新建的项目元素添加到列表中
8. 把输入框元素的值设置为空

```js
let todoInput = document.getElementById('todo-input');
let todoList = document.getElementById('todos-list');

// 输入框元素绑定键盘事件 keyup
todoInput.addEventListener('keyup',function(e){
  // 1. 获取输入框的输入值
  let value = this.value.trim();
  // 2. 获取当前按下的键位
  let key = e.which;
  // 3. 如果按下的不是 ENTER 键或者输入框没有输入值，返回结束
  if (e.which !== 13 || !value) {
    return;
  }
  // 4. 创建项目所包含元素
  let todoItem = document.createElement('div');
  let todoItemHd = document.createElement('div');
  let todoItemBd = document.createElement('div');
  let todoItemFt = document.createElement('div');
  // 5. 为所创建的元素添加 className 属性
  todoItem.setAttribute('class','todo-item');
  todoItemHd.setAttribute('class','todo-item-hd');
  todoItemBd.setAttribute('class','todo-item-bd');
  todoItemFt.setAttribute('class','todo-item-ft');
  // 6. 为创建的元素添加文本值
  todoItemBd.innerText = value;
  todoItemFt.innerText = 'x';
  // 7. 把新建的项目元素添加到列表中
  todoItem.appendChild(todoItemHd);
  todoItem.appendChild(todoItemBd);
  todoItem.appendChild(todoItemFt);
  todoList.appendChild(todoItem);
  // 8. 把输入框元素的值设置为空
  this.value = '';
})
```

### 切换和删除项目
由于点击的待办项目在一开始时候没有创建出来，设置是没有，因此我们需要使用委托绑定，为其父元素 todo-list 绑定点击事件。

1. 获取实际点击的元素 className
2. 获取实际点击项目的父级元素
3. 如果点击的是项目的状态元素，则切换其项目的状态
4. 如果点击的是项目的关闭元素，删除其父级元素

```js
let todoList = document.getElementById('#todos-list');

...

// 为其父元素 todo-list 绑定点击事件
todoList.addEventListener('click',function(e){
  // 1. 获取实际点击的元素 className
  let className = e.target.className;
  // 2. 获取实际点击项目的父级元素
  let todoItem = e.target.parentNode;
  // 3. 如果点击的是项目的状态元素，则切换其项目的状态
  if(className === 'todo-item-hd'){
    let isActive = todoItem.className.indexOf('active');
    if(isActive > 0){
      todoItem.className = 'todo-item';
    }else{
      todoItem.className += ' active';
    }
  // 4. 如果点击的是项目的关闭元素，删除其父级元素
  }else if(className === 'todo-item-ft'){
    todoItem.remove();
  }
})
```

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
  </script>
</body>
</html>
```
