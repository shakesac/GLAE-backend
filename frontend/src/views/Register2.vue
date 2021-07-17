<template>
    <div class="container">
    <div class="row border border-warning align-items-center my-2 p-1 justify-content-center">
    <h5>Linha 1</h5>
    </div>
    <div class="row border border-warning align-items-center my-2 p-1 justify-content-center">
      <h5>Linha 2</h5>
      <form>
          <div class="row" justify-content-center>
            <div class="col border border-danger">
                <div class="form-label-group">
        <input
          type="text"
          id="firstName"
          class="form-control"
          placeholder="Nome"
          required
          autofocus
        />
        <label for="firstName">Nome</label>
      </div>
      <div class="form-label-group">
        <input
          type="text"
          id="lastName"
          class="form-control"
          placeholder="Apelido"
          required
        />
        <label for="lastName">Apelido</label>
      </div>
      <div class="form-label-group">
        <input
          type="text"
          id="address"
          class="form-control"
          placeholder="Morada"
          required
        />
        <label for="address">Morada</label>
      </div>
      <select class="form-select" aria-label="sections">
        <option selected>Secção</option>
        <option
          v-for="section in sections"
          value="{{ section.id }}"
          :key="section.id"
        >
          {{ section.section }}
        </option>
      </select>
      <select class="form-select" aria-label="subsection">
        <option selected>Grupo</option>
        <option value="1">Exemplo1</option>
        <option value="2">Exemplo2</option>
        <option value="3">Exemplo3</option>
      </select>
            </div>
            <div class="col border border-danger">
                    <div class="form-label-group">
        <input
          type="password"
          id="inputPassword"
          class="form-control"
          placeholder="Palavra-passe"
          required
        />
        <label for="inputPassword">Palavra-passe</label>
      </div>
                </div>
            </div>
        </form>
    </div>
</div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
    name: 'Register',
    data() {
        return {
           users: {
            firstName: '',
            lasName: '',
            email: '',
            address: '',
            phoneNumber: '',
            password: '' 
           }
        };
    },
    computed: {
        ...mapState(['sections']),
    }, 
    async created() {
        await this.loadSections();
    },
    methods: {
        ...mapActions(['getSections', 'registerUserAction']),
        async saveUser() {
            this$validator.validateAll('create-user-form').then(async (valid) => {
               if (valid) {
                   if (this.getUserByEmail(this.user.email) === undefined) {
                       await this.registerUserAction(this.user);
                       this.$router.push({ name: 'Home'});
                   } else {
                       notifier.alert(
                         `utilizador não criado porque <b>${this.user.email}</b? já existe`
                       );
                   }
               }
            });
        },
    }
}
</script>

<style>
.form {
    display: inline-block;
}
.form-label-group input:not(:placeholder-shown) {
  padding-top: calc(var(--input-padding-y) + var(--input-padding-y) * (2 / 3));
  padding-bottom: calc(var(--input-padding-y) / 3);
}

.form-label-group input:not(:placeholder-shown) ~ label {
  padding-top: calc(var(--input-padding-y) / 3);
  padding-bottom: calc(var(--input-padding-y) / 3);
  font-size: 12px;
  color: #777;
}
</style>