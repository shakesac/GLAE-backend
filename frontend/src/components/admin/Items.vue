<template>
<div class="tab-pane fade shadow rounded bg-white p-5" id="v-pills-users" role="tabpanel" aria-labelledby="v-pills-users-tab">
    <h4 class="font-italic mb-4">Utilizadores</h4>
<table class="table m-0">
    <thead>
        <tr>
            <th scope="col">#</th>
            <th scope="col">Item</th>
            <th scope="col">Data compra</th>
            <th scope="col">Created By</th>
            <th scope="col"></th>
        </tr>
    </thead>
    <tbody>
        <tr v-for="item in items" :key="item">
            <th scope="row">{{ item.id }}</th>
            <td>{{ item.name }}</td>
            <td>{{ item.purchasedAt }}</td>
            <td>{{ item.createdAt }}</td>
            <td>
                <ul class="list-inline m-0">
                    <li class="list-inline-item">
                        <button class="btn btn-primary btn-sm rounded-0" type="button" data-toggle="tooltip" data-placement="top" title="Editar"><i class="bi bi-pencil"></i></button>
                    </li>
                    <li class="list-inline-item">
                        <button v-on:click.prevent="deleteUser(user.id)" class="btn btn-danger btn-sm rounded-0" type="button" data-toggle="tooltip" data-placement="top" title="Eliminar"><i class="bi bi-trash"></i></button>
                    </li>
                </ul>
            </td>
        </tr>
    </tbody>
</table>
    </div>
</template>
<script scoped>
import { computed } from 'vue'
import { useStore } from 'vuex'
import Swal from 'sweetalert2'
export default {
    name: 'Utilizadores | Administração',
    setup() {
        const store = useStore()
        store.dispatch('fetchStatusLeases', 'inProgress')
        const items = computed(() => store.getters.getAllItems)
        console.log(items)
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
        return { items, closeLease }
    }
}
</script>
<style>
        .nav-pills-custom .nav-link {
    color: #aaa;
    background: #fff;
    position: relative;
}

.nav-pills-custom .nav-link.active {
    color: #45b649;
    background: #fff;
}


/* Add indicator arrow for the active tab */
@media (min-width: 992px) {
    .nav-pills-custom .nav-link::before {
        content: '';
        display: block;
        border-top: 8px solid transparent;
        border-left: 10px solid #fff;
        border-bottom: 8px solid transparent;
        position: absolute;
        top: 50%;
        right: -10px;
        transform: translateY(-50%);
        opacity: 0;
    }
}

.nav-pills-custom .nav-link.active::before {
    opacity: 1;
}
</style>