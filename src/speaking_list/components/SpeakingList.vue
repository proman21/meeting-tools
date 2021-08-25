<template>
  <div id="speaking-list">
    <div class="app-content">
      <transition-group tag="div" class="lists">
        <list v-for="(list, index) in lists" :key="index"
          :list="list"
          :index="index"></list>
      </transition-group>
      <fab class="fab-add-list" style="position: absolute" :click-to-toggle="true">
        <a class="btn-floating btn-large" slot="fab">
          <i class="material-icons">add</i>
        </a>
        <li key=1 @click="add_simple_list">
          <div class="tooltip">New Simple List</div>
          <a class="btn-floating blue">
            <i class="material-icons">format_list_bulleted</i>
          </a>
        </li>
        <li key=2 @click="add_progressive_list">
          <div class="tooltip">New Progressive List</div>
          <a class="btn-floating green">
            <i class="material-icons">format_list_numbered</i>
          </a>
        </li>
      </fab>
    </div>
  </div>
</template>

<script>
  import { mapState, mapMutations } from 'vuex'
  import fab from 'vue-fixed-action-button'

  import List from './List'

  export default {
    name: 'speaking-lists',
    data: function () {
      return {}
    },
    components: { List, fab },
    computed: mapState({
      lists: state => state.speaking_list.lists
    }),
    methods: {
      ...mapMutations([
        'add_simple_list',
        'add_progressive_list'
      ])
    }
  }
</script>

<style lang="scss">
  @import "~materialize-css/sass/components/color";

  .app-content {
    width: calc(100vw - (128px * 2));
    max-width: calc(100vw - (128px * 2));
    margin: auto;
  }

  .tooltip {
    @extend .grey, .darken-2;
    color: white;
    position: absolute;
    right: 55.5px;
    display: block;
    box-sizing: border-box;
    width: intrinsic;
    width: -moz-max-content;
    width: -webkit-max-content;
    text-align: right;
    margin-top: 8px;
    font-size: 10px;
    height: 22px;
    padding: 0 8px;
    opacity: 0.9;
    border-radius: 2px;
    padding-top: 4px;
    text-rendering: optimizeLegibility;
  }

  .lists {
    display: flex;
    padding: 16px;
    width: inherit;
    flex-wrap: wrap;
    align-items: flex-start;

    .v-enter {
      transform: scale(0);
      transform-origin: left top;

      header, .content {
        opacity: 0;
      }
    }

    .v-enter-active {
      // transform: scale(1);
      // transform-origin: left top;
      transition: all 200ms cubic-bezier(0.4, 0.0, 0.2, 1);

      header, .content {
        transition: opacity 80ms cubic-bezier(0.4, 0.0, 0.2, 1) 40ms;
      }
    }
  }

  .fixed-action-btn {
    ul {
      visibility: visible;

      .btn-floating {
        opacity: 1 !important;
      }
    }
  }
</style>
