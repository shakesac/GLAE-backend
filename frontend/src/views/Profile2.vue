<template>
<base-layout>
<section class="py-5 header">
  <div class="container py-4">
    <div class="row">
      <div class="col-md-3">
          <div class="nav flex-column nav-pills nav-pills-custom" id="v-pills-tab" role="tablist" aria-orientation="vertical">
            <profile-button :title="'Informações pessoais'" />
            <profile-button :title="'Histórico'" />
            <profile-button :title="'Avançadas'" />
          </div>
      </div>
      <profile-content />
    </div>
  </div>
</section>
</base-layout>
</template>


<script scoped>
import BaseLayout from './Base.vue'
import ProfileButton from '@/components/profile/profile-button.vue'
import ProfileContent from '@/components/profile/profile-content.vue'
import {useStore} from 'vuex'
import { useRouter } from 'vue-router'
export default {
  name: 'Perfil',
  components: {
    BaseLayout,
    ProfileButton,
    ProfileContent,
  },
  setup() {
    //const store = useStore()
    //const router = useRouter()
    //const profile = computed(() => store.getters.getProfile)
  }
}
</script>
<style scoped>
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