import axios from 'axios';

const state = {
    todos: []
};

const getters = {
    allTodos: state => state.todos
};

const actions = {
    async fetchTodos({ commit }) {
        const response = await axios.get(
            'https://jsonplaceholder.typicode.com/todos'
        );

        commit('setTodos', response.data);
    },

    async addTodo({ commit }, title) {
        const response = await axios.post(
            'https://jsonplaceholder.typicode.com/todos',
            { title, completed: false }
        );

        commit('newTodo', response.data);
    },

    async deleteTodo({ commit }, id) {
        await axios.delete(`https://jsonplaceholder.typicode.com/todos/${id}`);

        commit('removeTodo', id);
    },

    async filterTodos({ commit }, ev) {
        const limit = parseInt(
            ev.target.options[ev.target.options.selectedIndex].innerText
        );
        const response = await axios.get(
            `https://jsonplaceholder.typicode.com/todos?_limit=${limit}`
        );

        commit('setTodos', response.data);
    },

    async updateTodo({ commit }, updatedTodo) {
        const response = await axios.put(
            `https://jsonplaceholder.typicode.com/todos/${updatedTodo.id}`, updatedTodo
        );

        commit('updTodo', response.data);
    }
};

const mutations = {
    setTodos: (state, todos) => (state.todos = todos),
    newTodo: (state, todo) => state.todos.unshift(todo),
    removeTodo: (state, id) =>
        (state.todos = state.todos.filter(t => id !== t.id)),
    updTodo: (state, todo) => {
        const index = state.todos.findIndex(t => t.id === todo.id);

        if (index !== -1) {
            state.todos.splice(index, 1, todo);
        }
    }
};

export default {
    state,
    getters,
    actions,
    mutations
};
