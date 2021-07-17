<template>
<div class="container">
<div id="title" class="row">
  <h5>Registo</h5>
</div>
<div class="row">
  <form align="align-items-center">
    <div class="row">
<div class="col-md-4 mx-auto">
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
          id="phoneNumber"
          class="form-control"
          placeholder="Telemóvel"
          required
        />
        <label for="phoneNumber">Telemóvel</label>
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
      
  </div>
  <div class="col-md-4 mx-auto align-middle">
        <div class="form-label-group">
        <input
          type="email"
          id="email"
          class="form-control"
          placeholder="Endereço de email"
          required
        />
        <label for="address">Endereço de email</label>
      </div>
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
          <div class="form-label-group">
        <input
          type="password"
          id="confirmPassword"
          class="form-control"
          placeholder="Confirmar palavra-passe"
          required
        />
        <label for="confirmPassword">Confirmar palavra-passe</label>
      </div>
  </div>
    </div>
    <div class="row m-2 justify-content-center">
      <div class="col-md-4 border-top border-bottom py-3">
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
  </div>
  <div class="row justify-content-center">
    <div class="col-4">
    <button
        class="
          btn btn-lg btn-primary btn-block btn-login
          text-uppercase
          font-weight-bold
          mb-2
          mt-3
          w-100
        "
        type="submit"
        @click="saveUser()"
      >
        Entrar
      </button>
      <div class="text-center mt-1">
        <router-link to="/login" class="link small"
          >Já tens conta?</router-link
        >
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
:root {
  --input-padding-x: 1.5rem;
  --input-padding-y: 0.75rem;
}
.btn-login {
  font-size: 0.9rem;
  letter-spacing: 0.05rem;
  padding: 0.75rem 1rem;
  border-radius: 2rem;
}
.form-label-group {
  position: relative;
  margin-bottom: 1rem;
}
.form-label-group > input,
.form-label-group > label {
  padding: var(--input-padding-y) var(--input-padding-x);
  height: auto;
  border-radius: 2rem;
}
.form-label-group {
  position: relative;
  margin-bottom: 1rem;
}

.form-label-group > input,
.form-label-group > label,
.form-select {
  padding: var(--input-padding-y) var(--input-padding-x);
  height: auto;
  border-radius: 2rem;
}
.form-select {
  margin-bottom: 1rem;
}

.form-label-group > label {
  position: absolute;
  top: 0;
  left: 0;
  display: block;
  width: 100%;
  margin-bottom: 0;
  /* Override default `<label>` margin */
  line-height: 1.5;
  color: #495057;
  cursor: text;
  /* Match the input under the label */
  border: 1px solid transparent;
  border-radius: 0.25rem;
  transition: all 0.1s ease-in-out;
}

.form-label-group input::-webkit-input-placeholder {
  color: transparent;
}

.form-label-group input:-ms-input-placeholder {
  color: transparent;
}

.form-label-group input::-ms-input-placeholder {
  color: transparent;
}

.form-label-group input::-moz-placeholder {
  color: transparent;
}

.form-label-group input::placeholder {
  color: transparent;
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