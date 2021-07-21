<template>
<base-layout>
    <div class="container py-5">
        <div class="row w-100">
            <div class="col-md-3">
                <div class="nav flex-column nav-pills nav-pills-custom" id="v-pills-tab" role="tablist" aria-orientation="vertical">
                    <a class="nav-link mb-3 p-3 shadow active" id="v-pills-home-tab" data-bs-toggle="pill" href="#v-pills-home" role="tab" aria-controls="v-pills-home" aria-selected="true">
                        <i class="bi bi-person-circle"></i>
                        <span class="font-weight-bold small text-uppercase">Informação pessoal</span></a>

                    <a class="nav-link mb-3 p-3 shadow" id="v-pills-profile-tab" data-bs-toggle="pill" href="#v-pills-profile" role="tab" aria-controls="v-pills-profile" aria-selected="false">
                        <i class="bi bi-calendar-minus"></i>
                        <span class="font-weight-bold small text-uppercase">Histórico</span></a>
                    </div>
            </div>
            <div class="col-md-9">
                <!-- Tabs content -->
                <div class="tab-content" id="v-pills-tabContent">
                    <div class="tab-pane fade shadow rounded bg-white show active p-5" id="v-pills-home" role="tabpanel" aria-labelledby="v-pills-home-tab">
                        <h4 class="font-italic mb-4">Informação pessoal</h4>
                        <div class="row mb-3">
                            <div class="col-md-6">
                                <p class="my-1">
                                    <span id="key" class="mr-5">Nome:</span>
                                    <span id="value" class="font-italic text-muted ">{{ name }}</span>
                                </p>
                                <p class="my-1">
                                    <span id="key" class="mr-5">Endereço de email:</span>
                                    <span id="value" class="font-italic text-muted ">{{ profile.email }}</span>
                                </p>
                                <p class="my-1">
                                    <span id="key" class="mr-5">Telemóvel:</span>
                                    <span id="value" class="font-italic text-muted ">{{ profile.phoneNumber }}</span>
                                </p>
                                <p class="my-1">
                                    <span id="key" class="mr-5">Morada:</span>
                                    <span id="value" class="font-italic text-muted ">{{ profile.address }}</span>
                                </p>
                                <p class="my-1">
                                    <span id="key" class="mr-5">Permissões:</span>
                                    <span id="value" class="font-italic text-muted ">{{ role }}</span>
                                </p>
                                <p>
                                    <span id="key" class="mr-5">Nome:</span>
                                    <span id="value" class="font-italic text-muted ">{{ name }}</span>
                                </p>
                            </div>
                            <hr class="d-md-none my-2">
                            <div class="col-md-6">
                                <p class="my-1">
                                    <span id="key" class="mr-5">Código de utilizador:</span>
                                    <span id="value" class="font-italic text-muted ">{{ profile.id }}</span>
                                </p>
                                <p class="my-1">
                                    <span id="key" class="mr-5">Registado desde:</span>
                                    <span id="value" class="font-italic text-muted ">{{ date }}</span>
                                </p>
                                <p class="my-1">
                                    <span id="key" class="mr-5">Nome:</span>
                                    <span id="value" class="font-italic text-muted ">{{ name }}</span>
                                </p>
                                <p class="my-1">
                                    <span id="key" class="mr-5">Endereço de email:</span>
                                    <span id="value" class="font-italic text-muted ">{{ profile.email }}</span>
                                </p>
                                <p class="my-1">
                                    <span id="key" class="mr-5">Telemóvel:</span>
                                    <span id="value" class="font-italic text-muted ">{{ profile.phoneNumber }}</span>
                                </p>
                                <p class="my-1">
                                    <span id="key" class="mr-5">Morada:</span>
                                    <span id="value" class="font-italic text-muted ">{{ profile.address }}</span>
                                </p>
                                <p class="my-1">
                                    <span id="key" class="mr-5">Permissões:</span>
                                    <span id="value" class="font-italic text-muted ">{{ role }}</span>
                                </p>
                                <p class="my-1">
                                    <span id="key" class="mr-5">Nome:</span>
                                    <span id="value" class="font-italic text-muted ">{{ name }}</span>
                                </p>
                            </div>
                        </div>
                        <div class="row justify-content-end">
                            <div class="col-6 d-flex justify-content-end">
                            <button type="button" class="btn btn-outline-primary mx-1"><i class="bi bi-pencil-fill"></i>Editar perfil</button>
                            <button v-on:click.prevent="delCurrentUser" type="button" class="btn btn-danger mx-1"><i class="bi bi-trash mr-2"></i>Eliminar conta</button>
                            </div>
                        </div>
                    </div>
                    
                    <div class="tab-pane fade shadow rounded bg-white p-5" id="v-pills-profile" role="tabpanel" aria-labelledby="v-pills-profile-tab">
                        <h4 class="font-italic mb-4">Bookings</h4>
                        <p class="font-italic text-muted mb-2">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                    </div>
                    
                    <div class="tab-pane fade shadow rounded bg-white p-5" id="v-pills-messages" role="tabpanel" aria-labelledby="v-pills-messages-tab">
                        <h4 class="font-italic mb-4">Reviews</h4>
                        <p class="font-italic text-muted mb-2">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                    </div>
                    
                    <div class="tab-pane fade shadow rounded bg-white p-5" id="v-pills-settings" role="tabpanel" aria-labelledby="v-pills-settings-tab">
                        <h4 class="font-italic mb-4">Confirm booking</h4>
                        <p class="font-italic text-muted mb-2">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                    </div>
                </div>
            </div>
        </div>
    </div>

</base-layout>
</template>


<script scoped>
import BaseLayout from './Base.vue'
import {computed, reactive} from 'vue'
import {useStore} from 'vuex'
import { useRouter } from 'vue-router'
import Swal from 'sweetalert2'
export default {
  name: 'Perfil',
  components: {
    BaseLayout,
  },
  setup() {
      const store = useStore()
    const router = useRouter()
    const name = computed(() => store.getters.getProfileName)
    const profile = computed(() => store.getters.getProfile)
    const role = profile.value.roleId == 1 ? 'Administrador' : 'Utilizador'
    const date = profile.value.createdAt.split('T')[0]
    const delCurrentUser = async () => {
        const result = await Swal.fire({
            title: 'Tem a certeza?',
            text: "Esta acção é irreversível!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#DC3545',
            cancelButtonColor: '#6C757D',
            confirmButtonText: 'Sim, eliminar conta!',
            cancelButtonText: 'Cancelar'
        })
        if (result.isConfirmed) {
            await store.dispatch('delCurrentUser')
            router.push('/')
        }
    }
    return{
        name,
        profile,
        role,
        date,
        delCurrentUser,
    }
  }

}
</script>
<style scoped>
.bi {
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