<template>
<div>
<table class="table m-0">
    <thead>
        <tr>
            <th scope="col">#</th>
            <th scope="col">Utilizador</th>
            <th scope="col">Início</th>
            <th scope="col">Fim</th>
            <th scope="col"></th>
        </tr>
    </thead>
    <tbody>
        <tr v-for="lease in pendingLeases" :key="lease.id">
            <th scope="row">{{ lease.id }}</th>
            <td>{{ lease.user.firstName + ' ' + lease.user.lastName }}</td>
            <td>{{ lease.start }}</td>
            <td>{{ lease.end }}</td>
            <td>
                <ul class="list-inline m-0">
                    <li class="list-inline-item">
                        <button class="btn btn-success btn-sm rounded-0" type="button" data-toggle="tooltip" data-placement="top" title="Aprovar"><i class="bi bi-check-lg"></i></button>
                    </li>
                    <li class="list-inline-item">
                        <button class="btn btn-primary btn-sm rounded-0" type="button" data-toggle="tooltip" data-placement="top" title="Editar"><i class="bi bi-pencil"></i></button>
                    </li>
                    <li class="list-inline-item">
                        <button @click.prevent="cancelLease(lease.id)" class="btn btn-danger btn-sm rounded-0" type="button" data-toggle="tooltip" data-placement="top" title="Cancelar"><i class="bi bi-x-lg"></i></button>
                    </li>
                </ul>
            </td>
        </tr>
    </tbody>
</table>
</div>
</template>
<script>
import { computed } from 'vue'
import { useStore } from 'vuex'
import Swal from 'sweetalert2'
export default {
    name: 'Utilizadores | Administração',
    setup() {
        const store = useStore()
        store.dispatch('fetchStatusLeases', 'pending')
        const pendingLeases = computed(() => store.getters.getPendingLeases)
        const cancelLease = (leaseId) => {
            const sure = Swal.fire({
                title: 'Tem a certeza que deseja cancelar o pedido?',
                icon: 'warning',
                text: 'Lease: ' + leaseId,
                showCancelButton: true,
                confirmButtonText: 'Cancelar',
            }).then((sure) => {
                if (sure.isConfirmed) {
                    store.dispatch('closeLease', [leaseId, 'canceled', comment])
                    Swal.fire({
                        icon: 'success',
                        title: 'O pedido foi cancelado.',
                        text: status,
                        timer: 1500,
                    })
                }
            })
        }
        return { pendingLeases, cancelLease }
    }
}
</script>
<style>
    
</style>