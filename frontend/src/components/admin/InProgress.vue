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
        <tr v-for="lease in inProgressLeases" :key="lease.id" v-bind:class="{'table-danger': (Date.parse(lease.end) < Date.now())}">
            <th scope="row">{{ lease.id }}</th>
            <td>{{ lease.user.firstName + ' ' + lease.user.lastName }}</td>
            <td>{{ lease.start }}</td>
            <td>{{ lease.end }}</td>
            <td>
                <ul class="list-inline m-0">
                    <li class="list-inline-item">
                        <button @click.prevent="closeLease(lease.id)" class="btn btn-danger btn-sm rounded-0" type="button" data-toggle="tooltip" data-placement="top" title="Terminar/entregue"><i class="bi bi-box-arrow-in-down-right"></i></button>
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
        store.dispatch('fetchStatusLeases', 'inProgress')
        const inProgressLeases = computed(() => store.getters.getInProgressLeases)
        const closeLease = async (leaseId) => {
            const { value: comment } = await Swal.fire({
            input: 'textarea',
            inputLabel: 'Comentário:',
            inputPlaceholder: 'Escreva uma breve descrição...',
            inputAttributes: {
                'aria-label': 'Escreva uma breve descrição'
            },
            text: 'Máximo de 1000 caracteres.',
            showCancelButton: true
            })
            store.dispatch('closeLease', [leaseId, 'canceled', comment])
            Swal.fire({
                icon: 'success',
                title: 'O pedido foi terminado.',
                text: status,
                timer: 1500,
            })
        }
        return { inProgressLeases, closeLease }
    }
}
</script>
<style>

</style>