<template lang="html">
  <div class="list card-panel">
    <header>
      <div class="info">
        <h4 class="truncate" @input="edit_title($event)" contenteditable="true">
          {{ list.name }}
        </h4>
        <b class="subtitle">{{ list.type | capitalize }} List</b>
      </div>
      <span class="controls">
        <i class="material-icons" @click="delete_list()">delete</i>
      </span>
    </header>
    <div class="content">
      <transition-group tag="ul" class="stack collection">
        <list-item :item="item" v-for="item in list.stack" :key="item.id">
          <i title="Remove from speaking list"
            @click="stack_done(item.id)"
            class="material-icons list-control">done</i>
        </list-item>
        <li class="collection-item" key="input">
          <input type="text" v-model="input" placeholder="Enter a Name"
            @keyup.enter="process_input()">
        </li>
        <li v-show="list.history.length > 0" key="history" class="collection-item subtitle history-label">
          <span class="contents">History</span>
        </li>
        <list-item :item="item" v-for="item in list.history" :key="item.id">
          <i title="Add back into speaking list"
            class="material-icons list-control"
            @click="history_readd(item.id)">add</i>
          <i title="Remove from history"
            class="material-icons list-control"
            @click="history_delete(item.id)">delete</i>
        </list-item>
      </transition-group>
    </div>
  </div>
</template>

<script>
  import { mapMutations } from 'vuex'
  import _ from 'lodash'
  import Icon from 'vue-icons'
  import ListItem from './ListItem'
  import shortid from 'shortid'

  export default {
    name: 'simple-list',
    props: ['list', 'index'],
    data () {
      return {
        input: '',
        editing: false
      }
    },
    components: {
      Icon,
      ListItem
    },
    methods: {
      process_input () {
        let item = { id: shortid.generate(), name: this.input }
        if (this.list.type === 'progressive') {
          item.priority = 0
        }
        let payload = {
          index: this.index,
          item
        }
        this.add_to_stack(payload)
        this.input = ''
      },
      edit_title: _.debounce(function (e) {
        let payload = {
          index: this.index,
          title: e.target.textContent
        }
        this.edit_list_name(payload)
      }, 500),
      stack_done (id) {
        let item = _.find(this.list.stack, ['id', id])
        if (item.priority !== undefined) {
          item.priority += 1
        }
        let addPayload = {
          index: this.index,
          item
        }
        let removePayload = {
          index: this.index,
          id
        }
        this.remove_from_stack(removePayload)
        this.add_to_history(addPayload)
      },
      history_readd (id) {
        let addPayload = {
          index: this.index,
          item: _.find(this.list.history, ['id', id])
        }
        let removePayload = {
          index: this.index,
          id
        }
        this.remove_from_history(removePayload)
        this.add_to_stack(addPayload)
      },
      history_delete (id) {
        let payload = {
          index: this.index,
          id
        }
        this.remove_from_history(payload)
      },
      delete_list () {
        let payload = {
          index: this.index
        }
        this.remove_list(payload)
      },
      ...mapMutations([
        'remove_list',
        'edit_list_name',
        'add_to_stack',
        'remove_from_stack',
        'add_to_history',
        'remove_from_history'
      ])
    }
  }
</script>

<style lang="scss">
  @import "~materialize-css/sass/components/color";

  .subtitle {
    @extend .grey-text;
  }

  .list {
    display: flex;
    flex-direction: column;
    flex-basis: calc(33% - 8px);
    align-items: stretch;
    margin: 0 4px 8px;

    header {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: space-between;

      .info {
        display: flex;
        flex-direction: column;
      }
    }

    .content {
      display: flex;
      flex-direction: column;
      align-items: stretch;

      .list-control {
        cursor: pointer;
      }

      .stack {
        display: flex;
        flex-direction: column;
        align-items: stretch;

        input {
          border: none;

          &:focus {
            outline: none;
          }
        }

        .history-label {
          @extend .grey, .lighten-4;
        }

        li {
          display: flex;

          .contents {
            width: 100%;
          }
        }

        .v-enter {
          transform-origin: center top;
          transform: scale(0);

          .contents {
            opacity: 0;
          }
        }

        .v-enter-active {
          transition: all 200ms cubic-bezier(0.4, 0.0, 0.2, 1);
          transform-origin: center top;

          .contents {
            transition: opacity 100ms linear 50ms;
            opacity: 1;
          }
        }

        .v-move {
          transition: transform 500ms;
        }
      }
    }
  }
</style>
