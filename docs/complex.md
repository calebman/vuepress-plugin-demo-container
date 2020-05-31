# Complex example

Here are two examples of complex scenarios that Demo Container can support well. The specific effects are as follows:

## TodoMVC example

`demo-container` provides good support for the example. This example is taken from the more complicated` TodoMVC` in the example of the `Vue` official document, and its display effect [Click here to view](https://vuejs.org/v2/examples/todomvc.html)

After copying the official code and transforming it into `template`, use the following syntax to quote

```html
::: demo `TodoMVC` is an example provided in the official documentation of` Vue`, which covers many `API` calls such as` data, watch, computed, methods, directives`, etc.
```html
// Omit TodoMVC related code...
` ` ` <= Remove the left space
:::
```

The rendering result is as follows

::: demo `TodoMVC` is an example provided in the official documentation of` Vue`, which covers many `API` calls such as` data, watch, computed, methods, directives`, etc.
```html
<template>
  <div class="todo-list-exp">
    <section class="todoapp">
      <header class="header">
        <h1>todos</h1>
        <input
          class="new-todo"
          autocomplete="off"
          placeholder="What needs to be done?"
          v-model="newTodo"
          @keyup.enter="addTodo"
        />
      </header>
      <section class="main" v-show="todos.length" v-cloak>
        <input id="toggle-all" class="toggle-all" type="checkbox" v-model="allDone" />
        <label for="toggle-all"></label>
        <ul class="todo-list">
          <li
            v-for="todo in filteredTodos"
            class="todo"
            :key="todo.id"
            :class="{ completed: todo.completed, editing: todo == editedTodo }"
          >
            <div class="view">
              <input class="toggle" type="checkbox" v-model="todo.completed" />
              <label @dblclick="editTodo(todo)">{{ todo.title }}</label>
              <button class="destroy" @click="removeTodo(todo)"></button>
            </div>
            <input
              class="edit"
              type="text"
              v-model="todo.title"
              v-todo-focus="todo == editedTodo"
              @blur="doneEdit(todo)"
              @keyup.enter="doneEdit(todo)"
              @keyup.esc="cancelEdit(todo)"
            />
          </li>
        </ul>
      </section>
      <footer class="footer" v-show="todos.length" v-cloak>
        <span class="todo-count">
          <strong>{{ remaining }}</strong>
          {{ remaining | pluralize }} left
        </span>
        <ul class="filters">
          <li>
            <a href="#/all" :class="{ selected: visibility == 'all' }">All</a>
          </li>
          <li>
            <a href="#/active" :class="{ selected: visibility == 'active' }">Active</a>
          </li>
          <li>
            <a href="#/completed" :class="{ selected: visibility == 'completed' }">Completed</a>
          </li>
        </ul>
        <button
          class="clear-completed"
          @click="removeCompleted"
          v-show="todos.length > remaining"
        >Clear completed</button>
      </footer>
    </section>
    <footer class="info">
      <p>Double-click to edit a todo</p>
      <p>
        Written by
        <a href="http://evanyou.me">Evan You</a>
      </p>
      <p>
        Part of
        <a href="http://todomvc.com">TodoMVC</a>
      </p>
    </footer>
  </div>
</template>

<script>
// Full spec-compliant TodoMVC with localStorage persistence
// and hash-based routing in ~120 effective lines of JavaScript.

// localStorage persistence
var STORAGE_KEY = "todos-vuejs-2.0";
var todoStorage = {
  fetch: function() {
    var todos = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
    todos.forEach(function(todo, index) {
      todo.id = index;
    });
    todoStorage.uid = todos.length;
    return todos;
  },
  save: function(todos) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
  }
};

// visibility filters
var filters = {
  all: function(todos) {
    return todos;
  },
  active: function(todos) {
    return todos.filter(function(todo) {
      return !todo.completed;
    });
  },
  completed: function(todos) {
    return todos.filter(function(todo) {
      return todo.completed;
    });
  }
};
export default {
  data() {
    return {
      todos: [],
      newTodo: "",
      editedTodo: null,
      visibility: "all"
    };
  },

  // watch todos change for localStorage persistence
  watch: {
    todos: {
      handler: function(todos) {
        todoStorage.save(todos);
      },
      deep: true
    }
  },

  // computed properties
  // http://vuejs.org/guide/computed.html
  computed: {
    filteredTodos: function() {
      return filters[this.visibility](this.todos);
    },
    remaining: function() {
      return filters.active(this.todos).length;
    },
    allDone: {
      get: function() {
        return this.remaining === 0;
      },
      set: function(value) {
        this.todos.forEach(function(todo) {
          todo.completed = value;
        });
      }
    }
  },

  filters: {
    pluralize: function(n) {
      return n === 1 ? "item" : "items";
    }
  },

  // methods that implement data logic.
  // note there's no DOM manipulation here at all.
  methods: {
    addTodo: function() {
      var value = this.newTodo && this.newTodo.trim();
      if (!value) {
        return;
      }
      this.todos.push({
        id: todoStorage.uid++,
        title: value,
        completed: false
      });
      this.newTodo = "";
    },

    removeTodo: function(todo) {
      this.todos.splice(this.todos.indexOf(todo), 1);
    },

    editTodo: function(todo) {
      this.beforeEditCache = todo.title;
      this.editedTodo = todo;
    },

    doneEdit: function(todo) {
      if (!this.editedTodo) {
        return;
      }
      this.editedTodo = null;
      todo.title = todo.title.trim();
      if (!todo.title) {
        this.removeTodo(todo);
      }
    },

    cancelEdit: function(todo) {
      this.editedTodo = null;
      todo.title = this.beforeEditCache;
    },

    removeCompleted: function() {
      this.todos = filters.active(this.todos);
    },

    // handle routing
    onHashChange() {
      var visibility = window.location.hash.replace(/#\/?/, "");
      if (filters[visibility]) {
        this.visibility = visibility;
      } else {
        window.location.hash = "";
        this.visibility = "all";
      }
    }
  },

  // a custom directive to wait for the DOM to be updated
  // before focusing on the input field.
  // http://vuejs.org/guide/custom-directive.html
  directives: {
    "todo-focus": function(el, binding) {
      if (binding.value) {
        el.focus();
      }
    }
  },

  mounted() {
    this.todos = todoStorage.fetch();
    window.addEventListener("hashchange", this.onHashChange);
  },

  destroyed() {
    window.removeEventListener("hashchange", this.onHashChange);
  }
};
</script>

<style>
.todo-list-exp {
  margin: 0;
  padding: 0;
}

.todo-list-exp button {
  margin: 0;
  padding: 0;
  border: 0;
  background: none;
  font-size: 100%;
  vertical-align: baseline;
  font-family: inherit;
  font-weight: inherit;
  color: inherit;
  -webkit-appearance: none;
  appearance: none;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.todo-list-exp {
  font: 14px "Helvetica Neue", Helvetica, Arial, sans-serif;
  line-height: 1.4em;
  color: #4d4d4d;
  min-width: 230px;
  max-width: 550px;
  margin: 0 auto;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  font-weight: 300;
}

:focus {
  outline: 0;
}

.hidden {
  display: none;
}

.todoapp {
  background: #fff;
  margin: 130px 0 40px 0;
  position: relative;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2), 0 25px 50px 0 rgba(0, 0, 0, 0.1);
}

.todoapp input::-webkit-input-placeholder {
  font-style: italic;
  font-weight: 300;
  color: #aaa;
}

.todoapp input::-moz-placeholder {
  font-style: italic;
  font-weight: 300;
  color: #aaa;
}

.todoapp input::input-placeholder {
  font-style: italic;
  font-weight: 300;
  color: #aaa;
}

.todoapp h1 {
  position: absolute;
  top: -155px;
  width: 100%;
  font-size: 100px;
  font-weight: 100;
  text-align: center;
  color: #f5222db8;
  -webkit-text-rendering: optimizeLegibility;
  -moz-text-rendering: optimizeLegibility;
  text-rendering: optimizeLegibility;
}

.new-todo,
.edit {
  position: relative;
  margin: 0;
  width: 100%;
  font-size: 24px;
  font-family: inherit;
  font-weight: inherit;
  line-height: 1.4em;
  border: 0;
  color: inherit;
  padding: 6px;
  border: 1px solid #999;
  box-shadow: inset 0 -1px 5px 0 rgba(0, 0, 0, 0.2);
  box-sizing: border-box;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.new-todo {
  padding: 16px 16px 16px 60px;
  border: none;
  background: rgba(0, 0, 0, 0.003);
  box-shadow: inset 0 -2px 1px rgba(0, 0, 0, 0.03);
}

.main {
  position: relative;
  z-index: 2;
  border-top: 1px solid rgba(0, 0, 0, 0.65);
}

.toggle-all {
  width: 1px;
  height: 1px;
  border: none; /* Mobile Safari */
  opacity: 0;
  position: absolute;
  right: 100%;
  bottom: 100%;
}

.toggle-all + label {
  width: 60px;
  height: 34px;
  font-size: 0;
  position: absolute;
  top: -52px;
  left: -13px;
  -webkit-transform: rotate(90deg);
  transform: rotate(90deg);
}

.toggle-all + label:before {
  content: "❯";
  font-size: 22px;
  color: rgba(0, 0, 0, 0.65);
  padding: 10px 27px 10px 27px;
}

.toggle-all:checked + label:before {
  color: #737373;
}

.todo-list {
  margin: 0;
  padding: 0;
  list-style: none;
}

.todo-list li {
  position: relative;
  font-size: 24px;
  border-bottom: 1px solid #ededed;
}

.todo-list li:last-child {
  border-bottom: none;
}

.todo-list li.editing {
  border-bottom: none;
  padding: 0;
}

.todo-list li.editing .edit {
  display: block;
  width: calc(100% - 43px);
  padding: 12px 16px;
  margin: 0 0 0 43px;
}

.todo-list li.editing .view {
  display: none;
}

.todo-list li .toggle {
  text-align: center;
  width: 40px;
  /* auto, since non-WebKit browsers doesn't support input styling */
  height: auto;
  position: absolute;
  top: 0;
  bottom: 0;
  margin: auto 0;
  border: none; /* Mobile Safari */
  -webkit-appearance: none;
  appearance: none;
}

.todo-list li .toggle {
  opacity: 0;
}

.todo-list li .toggle + label {
  /*
		Firefox requires `#` to be escaped - https://bugzilla.mozilla.org/show_bug.cgi?id=922433
		IE and Edge requires *everything* to be escaped to render, so we do that instead of just the `#` - https://developer.microsoft.com/en-us/microsoft-edge/platform/issues/7157459/
	*/
  background-image: url("data:image/svg+xml;utf8,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20width%3D%2240%22%20height%3D%2240%22%20viewBox%3D%22-10%20-18%20100%20135%22%3E%3Ccircle%20cx%3D%2250%22%20cy%3D%2250%22%20r%3D%2250%22%20fill%3D%22none%22%20stroke%3D%22%23ededed%22%20stroke-width%3D%223%22/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: center left;
}

.todo-list li .toggle:checked + label {
  background-image: url("data:image/svg+xml;utf8,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20width%3D%2240%22%20height%3D%2240%22%20viewBox%3D%22-10%20-18%20100%20135%22%3E%3Ccircle%20cx%3D%2250%22%20cy%3D%2250%22%20r%3D%2250%22%20fill%3D%22none%22%20stroke%3D%22%23bddad5%22%20stroke-width%3D%223%22/%3E%3Cpath%20fill%3D%22%235dc2af%22%20d%3D%22M72%2025L42%2071%2027%2056l-4%204%2020%2020%2034-52z%22/%3E%3C/svg%3E");
}

.todo-list li label {
  word-break: break-all;
  padding: 15px 15px 15px 60px;
  display: block;
  line-height: 1.2;
  transition: color 0.4s;
}

.todo-list li.completed label {
  color: #d9d9d9;
  text-decoration: line-through;
}

.todo-list li .destroy {
  display: none;
  position: absolute;
  top: 0;
  right: 10px;
  bottom: 0;
  width: 40px;
  height: 40px;
  margin: auto 0;
  font-size: 30px;
  color: #cc9a9a;
  margin-bottom: 11px;
  transition: color 0.2s ease-out;
}

.todo-list li .destroy:hover {
  color: #af5b5e;
}

.todo-list li .destroy:after {
  content: "×";
}

.todo-list li:hover .destroy {
  display: block;
}

.todo-list li .edit {
  display: none;
}

.todo-list li.editing:last-child {
  margin-bottom: -1px;
}

.footer {
  color: #777;
  padding: 10px 15px;
  height: 41px;
  text-align: center;
  border-top: 1px solid #aaa;
}

.footer:before {
  content: "";
  position: absolute;
  right: 0;
  bottom: 0;
  left: 0;
  height: 50px;
  overflow: hidden;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.2), 0 8px 0 -3px #f6f6f6,
    0 9px 1px -3px rgba(0, 0, 0, 0.2), 0 16px 0 -6px #f6f6f6,
    0 17px 2px -6px rgba(0, 0, 0, 0.2);
}

.todo-count {
  float: left;
  text-align: left;
}

.todo-count strong {
  font-weight: 300;
}

.filters {
  margin: 0;
  padding: 0;
  list-style: none;
  position: absolute;
  right: 0;
  left: 0;
}

.filters li {
  display: inline;
}

.filters li a {
  color: inherit;
  margin: 3px;
  padding: 3px 7px;
  text-decoration: none;
  border: 1px solid transparent;
  border-radius: 3px;
}

.filters li a:hover {
  border-color: rgba(175, 47, 47, 0.1);
}

.filters li a.selected {
  border-color: rgba(175, 47, 47, 0.2);
}

.clear-completed,
html .clear-completed:active {
  float: right;
  position: relative;
  line-height: 20px;
  text-decoration: none;
  cursor: pointer;
}

.clear-completed:hover {
  text-decoration: underline;
}

.info {
  margin: 65px auto 0;
  color: rgba(0, 0, 0, 0.85);
  font-size: 15px;
  text-shadow: 0 1px 0 rgba(255, 255, 255, 0.5);
  text-align: center;
}

.info p {
  line-height: 1;
}

.info a {
  color: inherit;
  text-decoration: none;
  font-weight: 400;
}

.info a:hover {
  text-decoration: underline;
}

/*
	Hack to remove background from Mobile Safari.
	Can't use it globally since it destroys checkboxes in Firefox
*/
@media screen and (-webkit-min-device-pixel-ratio: 0) {
  .toggle-all,
  .todo-list li .toggle {
    background: none;
  }

  .todo-list li .toggle {
    height: 40px;
  }
}

@media (max-width: 430px) {
  .footer {
    height: 50px;
  }

  .filters {
    bottom: 10px;
  }
}
</style>
```
:::

## Example of combined component library

As a **component example plug-in**, most of its usage scenarios are used as component library document sample construction when developing a component library. Here we will demonstrate the document sample writing based on [AntDeisgnVue](https://www.antdv.com/docs/vue/introduce/) component library

First we introduce the `AntDesignVue` component library in` Vuepress`:

```bash
yarn add ant-design-vue
```

Then edit the `.vuepress/enhanceApp.js` file (create if it does not exist):

```js
import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css'
export default ({
  Vue
}) => {
  Vue.use(Antd)
}
```

At this point, the introduction of the component library is completed. Now you can find a `Markdown` file and type the following code

```html
::: demo  `AntDesignVue` xxx component example, **please note xxx**
```html
<template>
	<a-button type="primary">Primary</a-button>
	<a-button type="danger">Danger</a-button>
	<a-config-provider :auto-insert-space-in-button="false">
		<a-button type="primary">Button</a-button>
	</a-config-provider>
</template>
` ` ` <= Remove the left space
:::
```

The rendering result is shown below

::: demo  `AntDesignVue` xxx component example, **please note xxx**
```html
<template>
	<a-button type="primary">Primary</a-button>
	<a-button type="danger">Danger</a-button>
	<a-config-provider :auto-insert-space-in-button="false">
		<a-button type="primary">Button</a-button>
	</a-config-provider>
</template>
```
:::

**The following is a more comprehensive example based on the component library**

::: demo  Note that currently, the `import` syntax cannot be successfully compiled by` demo-container` when writing sample code, please avoid using this syntax in the example
```html
<template>
  <div>
    <a-card title="Dropdown" style="margin: 8px 0;">
      <a-dropdown-button @click="handleButtonClick">
        Dropdown
        <a-menu slot="overlay" @click="handleMenuClick">
          <a-menu-item key="1">
            <a-icon type="user" />1st menu item
          </a-menu-item>
          <a-menu-item key="2">
            <a-icon type="user" />2nd menu item
          </a-menu-item>
          <a-menu-item key="3">
            <a-icon type="user" />3rd item
          </a-menu-item>
        </a-menu>
      </a-dropdown-button>
      <a-dropdown-button>
        Dropdown
        <a-menu slot="overlay" @click="handleMenuClick">
          <a-menu-item key="1">
            <a-icon type="user" />1st menu item
          </a-menu-item>
          <a-menu-item key="2">
            <a-icon type="user" />2nd menu item
          </a-menu-item>
          <a-menu-item key="3">
            <a-icon type="user" />3rd item
          </a-menu-item>
        </a-menu>
        <a-icon slot="icon" type="user" />
      </a-dropdown-button>
    </a-card>
    <a-card title="Badge" style="margin: 8px 0;">
      <div id="components-badge-demo-dot">
        <a-badge dot>
          <a-icon type="notification" />
        </a-badge>
        <a-badge :count="0" dot>
          <a-icon type="notification" />
        </a-badge>
        <a-badge dot>
          <a href="#">Link something</a>
        </a-badge>
      </div>
    </a-card>
    <a-card title="Message And Modal" style="margin: 8px 0;">
      <a-button type="primary" @click="info">Display normal message</a-button>
      <a-button @click="showConfirm">Confirm</a-button>
      <a-button type="dashed" @click="showDeleteConfirm">Delete</a-button>
      <a-button type="primary" @click="visible = true">Modal</a-button>
      <a-modal v-model="visible" title="Modal" ok-text="确认" cancel-text="取消" @ok="visible = false">
        <p>Bla bla ...</p>
        <p>Bla bla ...</p>
        <p>Bla bla ...</p>
      </a-modal>
    </a-card>
    <a-card title="Date" style="margin: 8px 0;">
      <div>
        <a-radio-group v-model="size">
          <a-radio-button value="large">Large</a-radio-button>
          <a-radio-button value="default">Default</a-radio-button>
          <a-radio-button value="small">Small</a-radio-button>
        </a-radio-group>
        <a-date-picker :size="size" />
        <a-month-picker :size="size" placeholder="Select Month" />
        <a-range-picker :size="size" />
        <a-week-picker :size="size" placeholder="Select Week" />
      </div>
    </a-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      size: "default",
      visible: false
    };
  },
  methods: {
    handleButtonClick(e) {
      console.log("click left button", e);
    },
    handleMenuClick(e) {
      console.log("click", e);
    },
    info() {
      this.$message.info("This is a normal message");
    },
    showConfirm() {
      this.$confirm({
        title: "Do you Want to delete these items?",
        content: h => <div style="color:red;">Some descriptions</div>,
        onOk() {
          console.log("OK");
        },
        onCancel() {
          console.log("Cancel");
        },
        class: "test"
      });
    },
    showDeleteConfirm() {
      this.$confirm({
        title: "Are you sure delete this task?",
        content: "Some descriptions",
        okText: "Yes",
        okType: "danger",
        cancelText: "No",
        onOk() {
          console.log("OK");
        },
        onCancel() {
          console.log("Cancel");
        }
      });
    }
  }
};
</script>

<style>
#components-badge-demo-dot .anticon-notification {
  width: 16px;
  height: 16px;
  line-height: 16px;
  font-size: 16px;
}
</style>
```
:::