<template>
<base-layout>
    <div class="container py-5">
        <div class="row w-100">
            <div class="col-md-3">
                <!-- Tabs nav -->
                <div class="nav flex-column nav-pills nav-pills-custom" id="v-pills-tab" role="tablist" aria-orientation="vertical">
                    <a class="nav-link mb-3 p-3 shadow active" id="v-pills-home-tab" data-bs-toggle="pill" href="#v-pills-home" role="tab" aria-controls="v-pills-home" aria-selected="true">
                        <i class="bi bi-person-circle customPadd"></i>
                        <span class="font-weight-bold small text-uppercase">Pedidos pendentes</span></a>

                    <a class="nav-link mb-3 p-3 shadow" id="v-pills-leases-tab" data-bs-toggle="pill" href="#v-pills-leases" role="tab" aria-controls="v-pills-leases" aria-selected="false">
                        <i class="bi bi-caret-right-square customPadd"></i>
                        <span class="font-weight-bold small text-uppercase">Emprestimos em curso</span></a>

                    <a class="nav-link mb-3 p-3 shadow" id="v-pills-items-tab" data-bs-toggle="pill" href="#v-pills-items" role="tab" aria-controls="v-pills-items" aria-selected="false">
                        <i class="bi bi-archive customPadd"></i>
                        <span class="font-weight-bold small text-uppercase">Inventário</span></a>

                    <a class="nav-link mb-3 p-3 shadow" id="v-pills-users-tab" data-bs-toggle="pill" href="#v-pills-users" role="tab" aria-controls="v-pills-users" aria-selected="false">
                        <i class="bi bi-people-fill customPadd"></i>
                        <span class="font-weight-bold small text-uppercase">Utilizadores</span></a>
                    </div>
            </div>


            <div class="col-md-9">
                <!-- Tabs content -->
                <div class="tab-content" id="v-pills-tabContent">
                    <div class="tab-pane fade shadow rounded bg-white show active p-5" id="v-pills-home" role="tabpanel" aria-labelledby="v-pills-home-tab">
                        <h4 class="font-italic mb-4">Pedidos pendentes</h4>
                        <div class="table-responsive-md">
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
                                    <tr v-for="(lease, index) in getPendingLeases" :key="lease.id">
                                        <th scope="row">{{ lease.id }}</th>
                                        <td></td>
                                        <td>{{ lease.start }}</td>
                                        <td>{{ lease.end }}</td>
                                        <td>
                                            <ul class="list-inline m-0">
                                                <li class="list-inline-item">
                                                    <button v-on.click.prevent="" class="btn btn-success btn-sm rounded-0" type="button" data-toggle="tooltip" data-placement="top" title="Aprovar"><i class="bi bi-check-lg"></i></button>
                                                </li>
                                                <li class="list-inline-item">
                                                    <button class="btn btn-primary btn-sm rounded-0" type="button" data-toggle="tooltip" data-placement="top" title="Editar"><i class="bi bi-pencil"></i></button>
                                                </li>
                                                <li class="list-inline-item">
                                                    <button @click.prevent="cancel(lease.id, index)" class="btn btn-danger btn-sm rounded-0" type="button" data-toggle="tooltip" data-placement="top" title="Cancelar"><i class="bi bi-x-lg"></i></button>
                                                </li>
                                            </ul>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div class="tab-pane fade shadow rounded bg-white p-5" id="v-pills-leases" role="tabpanel" aria-labelledby="v-pills-leases-tab">
                        <h4 class="font-italic mb-4">Emprestimos</h4>
                        <p class="font-italic text-muted mb-2">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                    </div>
                    
                    <div class="tab-pane fade shadow rounded bg-white p-5" id="v-pills-items" role="tabpanel" aria-labelledby="v-pills-items-tab">
                        <h4 class="font-italic mb-4">Inventário</h4>
                        <p class="font-italic text-muted mb-2">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                    </div>
                    
                    <div class="tab-pane fade shadow rounded bg-white p-5" id="v-pills-users" role="tabpanel" aria-labelledby="v-pills-users-tab">
                        <h4 class="font-italic mb-4">Utilizadores</h4>
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
                                <!--<tbody>
                                    <tr v-for="lease in getPendingLeases" :key="lease.id">
                                        <th scope="row">{{ lease.id }}</th>
                                        <td>{{ //getAllUsers.firstName + ' ' + getAllUsers.lastName }}</td>
                                        <td>{{ getAllUsers.email }}</td>
                                        <td>{{ getAllUsers.phoneNumber }}</td>
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
                                </tbody>-->
                            </table>
                    </div>
                </div>
            </div>
        </div>
    </div>
</base-layout>
</template>


<script>
import BaseLayout from './Base.vue'
//import CrudTable from '@/components/CrudTable.vue'
import {computed, reactive} from 'vue'
import { mapGetters, mapActions, mapMutations } from 'vuex'
import { useRouter } from 'vue-router'
import Swal from 'sweetalert2'
export default {
  name: 'Administração',
  components: {
    BaseLayout,
  },
  data() {
    return {
    }
  },
  created() {
    this.fetchPendingLeases()
    //this.fetchAllUsers()
  },
  computed: {
    ...mapGetters(['getPendingLeases']),
  },
  methods: {
    ...mapActions([
      'fetchPendingLeases',
      'updateLeaseStatus',
      //'fetchAllUsers',
      ]),
  },
async cancel(id, index) {
      this.updateLeaseStatus(id, index, 'canceled')
  }
}
</script>
<style scoped>
.customPadd {
    margin-right: 8px;
}
#key {
    margin-right: 12px;
}

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