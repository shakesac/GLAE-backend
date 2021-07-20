<template>
    <nav class="navbar navbar-expand-lg sticky-top navbar-dark bg-dark">
        <div class="container">
        <router-link to="/" class="navbar-brand">1240</router-link>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">

        <!-- ##### VISITANTE ##### -->
        <ul v-if="isLoggedIn == false" class="navbar-nav me-auto mb-2 mb-lg-0">
            <li class="nav-item">
            <router-link to="/about" class="nav-link">About</router-link>
            </li>
        </ul>

        <!-- ##### UTILIZADOR ##### -->
        <ul v-if="isLoggedIn == true" class="navbar-nav me-auto mb-2 mb-lg-0">
            <li class="nav-item">
            <router-link to="/about" class="nav-link"></router-link>
            </li>
            <li class="nav-item">
            <router-link to="/teste" class="nav-link"></router-link>
            </li>
            <li class="nav-item dropdown">
            <a v-if="isAdmin" class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                Pedidos
            </a>
            <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
                <li><a class="dropdown-item" href="#">Ver pedidos</a></li>
                <li><a class="dropdown-item" href="#">Gerir pedidos</a></li>
            </ul>
            </li>
            <li class="nav-item dropdown">
            <a v-if="isAdmin" class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                Material
            </a>
            <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
                <li><a class="dropdown-item" href="#">Ver itens</a></li>
                <li><a class="dropdown-item" href="#">Gerir itens</a></li>
                <li><hr class="dropdown-divider"></li>
                <li><a class="dropdown-item" href="#">Gerir categorias</a></li>
                <li><a class="dropdown-item" href="#">Gerir tipos</a></li>
            </ul>
            </li>
            <li class="nav-item">
            <a class="nav-link disabled" href="#" tabindex="-1" aria-disabled="true">Disabled</a>
            </li>
        </ul>
        <div class="dropdown" v-if="isLoggedIn == true">
            <button type="button" class="btn btn-success btn-circle btn-lg" id=loggedDropdown data-bs-toggle="dropdown"><i class="bi bi-person-circle"></i></button>
            <ul class="dropdown-menu" aria-labelledby="loggedDropdown">
                <li><a class="dropdown-item disabled"></a></li>
                <li><hr class="dropdown-divider"></li>
                <li><a v-if="isAdmin == true" class="dropdown-item disabled">Administrador</a></li>
                <li><hr v-if="isAdmin == true" class="dropdown-divider"></li>
                <li><a class="dropdown-item" href="#">Perfil</a></li>
                <li><a v-on:click.prevent="logout" class="dropdown-item" href="#">Logout</a></li>
            </ul>
        </div>
            <div class="dropdown" v-if="isLoggedIn == false">
            <button type="button" class="btn btn-success btn-circle btn-lg" id=unloggedDropdown data-bs-toggle="dropdown"><i class="bi bi-person-circle"></i></button>
            <ul class="dropdown-menu" aria-labelledby="unloggedDropdown">
                <li><router-link to="/login" class="dropdown-item">Iniciar sessão</router-link></li>
                <li><hr class="dropdown-divider"></li>
                <li><router-link to="/registo" class="dropdown-item">Registo</router-link></li>
            </ul>
            </div>
        </div>
        </div>
    </nav>
</template>
<script>
import {computed} from 'vue'
import {useStore} from 'vuex'
import { useRouter } from 'vue-router'
export default {
    name: 'NavBar',
    setup() {
        const store = useStore()
        const router = useRouter()
        const isLoggedIn = computed(() => store.getters.isLoggedIn)
        const isAdmin = computed(() => store.getters.isAdmin)
        const name = computed(() => store.getters.getProfileName)
        console.log('Name: ', name, 'isLogged: ', isLoggedIn)
        const logout = async () => {
            await store.dispatch('logout')
            router.push('/login')
        }
        return {
            isLoggedIn,
            isAdmin,
            name,
            logout,
        }
    }
}
</script>
<style scoped>
.btn-circle {
    width: 30px;
    height: 30px;
    padding: 0px 0px;
    border-radius: 15px;
    text-align: center;
    font-size: 21px;
    line-height: 1.42857;
}
</style>