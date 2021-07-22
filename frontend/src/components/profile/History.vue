<template>
<table class="table m-0">
    <thead>
        <tr>
            <th scope="col">#</th>
            <th scope="col">Início</th>
            <th scope="col">Fim</th>
            <th scope="col">Estado</th>
            <th scope="col"></th>
        </tr>
    </thead>
    <tbody>
        <tr v-for="(lease, index) in userLeases" :key="index">
            <th scope="row">{{ lease.id }}</th>
            <td>{{ lease.start }}</td>
            <td>{{ lease.end }}</td>
            <td>{{ lease.lease_statuses.status }}</td>
            <td>
                <ul class="list-inline m-0">
                    <li class="list-inline-item">
                        <button class="btn btn-success btn-sm rounded-0" type="button" data-toggle="tooltip" data-placement="top" title="Aprovar"><i class="bi bi-check-lg"></i></button>
                    </li>
                    <li class="list-inline-item">
                        <button class="btn btn-primary btn-sm rounded-0" type="button" data-toggle="tooltip" data-placement="top" title="Editar"><i class="bi bi-pencil"></i></button>
                    </li>
                    <li class="list-inline-item">
                        <button class="btn btn-danger btn-sm rounded-0" type="button" data-toggle="tooltip" data-placement="top" title="Apaga"><i class="bi bi-trash"></i></button>
                    </li>
                </ul>
            </td>
        </tr>
    </tbody>
</table>
</template>


<script scoped>
import { mapActions, mapState, mapMutations, mapGetters} from 'vuex'
import Swal from 'sweetalert2'
export default {
  name: 'Perfil | Histórico',
  components: {
  },
  data() {
      return {
          leaseIndex: ''
          
      }
  },
  computed: {
      ...mapState(['userLeases']) ,
  },
  methods: {
  },
}
</script>
<style scoped>
.bi {
    margin-right: 8px;
}  
</style>