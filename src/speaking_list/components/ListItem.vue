<template lang="html">
  <li class="collection-item">
    <div class="contents">
      <strong class="priority" v-if="item.priority != undefined">
        {{ item.priority }}
      </strong>
      {{ item.name || item }}
      <a class="secondary-content">
        <slot></slot>
      </a>
    </div>
  </li>
</template>

<script>
  export default {
    name: 'list-item',
    props: ['item']
  }
</script>

<style lang="scss">
  .priority {
    font-weight: bold;
  }
</style>
