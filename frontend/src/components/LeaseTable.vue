<template>
  <v-grid :source="rows" :columns="columns"/>
</template>

<script>
import VGrid from '@revolist/vue-datagrid';
export default {
  name: 'Table',
  data() {
      return {
          columns: [{ prop: 'name', name: 'First' },{ prop: 'details', name: 'Second' },],
          rows: [],
      }
  },
  components: {VGrid}
}
</script>