<template>
    <div>
<table class="table m-0">
    <thead>
        <tr>
            <th scope="col">#</th>
            <th scope="col">Nome</th>
            <th scope="col">Email</th>
            <th scope="col"></th>
            <th scope="col"></th>
        </tr>
    </thead>
    <tbody>
        <tr v-for="(user, index) in users" :key="index">
            <th scope="row">{{ user.id }}</th>
            <td>{{ user.firstName + ' ' + user.lastName }}</td>
            <td>{{ user.email }}</td>
            <td>{{ user.phoneNumber}}</td>
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
<script>
import { computed } from 'vue'
import { useStore } from 'vuex'
import Swal from 'sweetalert2'
export default {
      name: 'Utilizadores | Administração',
    setup() {
        const store = useStore()
        store.dispatch('fetchAllUsers')
        const users = computed(() => store.getters.getAllUsers)
        const deleteUser = (userId) => {
            const sure = Swal.fire({
                title: 'Tem a certeza que deseja eliminar?',
                icon: 'warning',
                text: 'User: ' + userId,
                showCancelButton: true,
                confirmButtonText: 'Delete',
            }).then((sure) => {
                if (sure.isConfirmed) {
                    console.log(userId)
                    store.dispatch('deleteUser', userId)
                }
            })
        }
        return { users, deleteUser }
    }
}
</script>
<style>
    
</style>