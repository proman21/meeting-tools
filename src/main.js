import './materialize.scss'

import _ from 'lodash'
import Vue from 'vue'
import Vuex from 'vuex'
import VueRouter from 'vue-router'

import App from './components/App'
import SpeakingList from './speaking_list/components/SpeakingList'

Vue.use(Vuex)
Vue.use(VueRouter)

const store = new Vuex.Store({
  state: {
    speaking_list: {
      lists: [ { type: 'simple', name: 'New List', stack: [], history: [] } ]
    }
  },
  mutations: {
    add_simple_list (state) {
      return _.update(state, 'speaking_list.lists', function (lists) {
        lists.push({
          type: 'simple',
          name: 'New List',
          stack: [],
          history: []
        })
        return lists
      })
    },
    add_progressive_list (state) {
      return _.update(state, 'speaking_list.lists', function (lists) {
        lists.push({
          type: 'progressive',
          name: 'New List',
          stack: [],
          history: []
        })
        return lists
      })
    },
    remove_list (state, payload) {
      let i = payload.index
      return _.update(state, 'speaking_list.lists', function (lists) {
        lists.splice(i, 1)
        return lists
      })
    },
    edit_list_name (state, payload) {
      let i = payload.index
      let newTitle = payload.title
      return _.update(state, `speaking_list.lists[${i}].name`, function (name) {
        return newTitle
      })
    },
    add_to_stack (state, payload) {
      let i = payload.index
      let item = payload.item
      return _.update(state, `speaking_list.lists[${i}].stack`, stack => {
        if (state.speaking_list.lists[i].type === 'progressive') {
          let insertIndex = _.sortedLastIndexBy(stack, item, 'priority')
          stack.splice(insertIndex, 0, item)
        } else {
          stack.push(item)
        }
        return stack
      })
    },
    remove_from_stack (state, payload) {
      let i = payload.index
      let id = payload.id
      return _.update(state, `speaking_list.lists[${i}.stack`, stack => {
        _.remove(stack, n => n.id === id)
        return stack
      })
    },
    add_to_history (state, payload) {
      let i = payload.index
      let item = payload.item
      return _.update(state, `speaking_list.lists[${i}].history`, history => {
        if (state.speaking_list.lists[i].type === 'progressive') {
          let insertIndex = _.sortedLastIndexBy(history, item, 'priority')
          history.splice(insertIndex, 0, item)
        } else {
          history.push(item)
        }
        return history
      })
    },
    remove_from_history (state, payload) {
      let i = payload.index
      let id = payload.id
      return _.update(state, `speaking_list.lists[${i}].history`, history => {
        _.remove(history, n => n.id === id)
        return history
      })
    }
  }
})

const routes = [
  { path: '/speaking', component: SpeakingList },
  { path: '/', redirect: '/speaking' }
]

const router = new VueRouter({
  routes,
  linkActiveClass: 'active'
})

Vue.filter('capitalize', function (value) {
  if (!value) return ''
  value = value.toString()
  return value.charAt(0).toUpperCase() + value.slice(1)
})

/* eslint-disable no-new,no-unused-vars */
let app = new Vue({
  el: '#app',
  store,
  router,
  template: '<App/>',
  components: { App }
})
