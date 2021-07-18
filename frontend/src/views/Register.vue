<template>
<base-layout>
  <div class="container">
    <div id="title" class="row border-bottom mb-3">
      <h3>Registo</h3>
    </div>
    <div class="row">
      <form
        align="align-items-center"
        novalidade
        data-vv-scope="create-user-form"
      >
        <div class="row">
          <div class="col-md-4 mx-auto">
            <div class="form-label-group">
              <input
                type="text"
                v-model="firstName"
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
                v-model="lastName"
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
                v-model="phoneNumber"
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
                v-model="address"
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
                v-model="email"
                id="email"
                class="form-control"
                placeholder="Endereço de email"
                required
              />
              <label for="email">Endereço de email</label>
            </div>
            <div class="form-label-group">
              <input
                type="password"
                v-model="password"
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
                v-model="confirmPassword"
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
            <select class="form-select" v-model="selectedSection" v-on:change="getSubsections">
              <option disabled selected>Secção</option>
              <option
                v-for="section in getSections"
                :value="section.id"
                :key="section.id"
              >
                {{ section.section }}
              </option>
            </select>
            <select class="form-select" v-model="selectedSubsection" v-if="selectedSection">
              <option disabled selected>Grupo</option>
              <option
              v-for="subsection in getSubsectionsFromSection"
              :value="subsection.id"
              :key="subsection.id"
              >{{ subsection.subsection }}</option>
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
              v-on:click="saveUser"
            >
              Entrar
            </button>
            <div class="text-center mt-1">
              <router-link to="/login" class="link small"
                >Já tens conta?</router-link
              >
            <p>{{ selectedSection }}</p>
            </div>
          </div>
        </div>
      </form>
    </div>
  </div>
  </base-layout>
</template>

<script>
import BaseLayout from './Base.vue'
import { mapActions, mapGetters } from "vuex";
export default {
  name: "Register",
  components: { BaseLayout },
  data() {
    return {
      selectedSection: null,
      selectedSubsection: null,
      firstName: '',
      lastName: '',
      email: '',
      address: '',
      phoneNumber: '',
      password: '',
      confirmPassword: '',
      subsectionId: this.selectedSection + this.selectedSubsection
    }
  },
  created() {
    this.fetchSections();
  },
  computed: {
    ...mapGetters(['getSections', 'getSubsectionsFromSection']),
  },
  methods: {
    ...mapActions([
      'fetchSections',
      'fetchSubsectionsFromSection',
      'registerUser',
      ]),
    async saveUser() {
      const payload = {
        firstName: this.firstName,
        lastName: this.lastName,
        email: this.email,
        address: this.address,
        phoneNumber: this.phoneNumber,
        password: this.password,
        confirmPassword: this.confirmPassword,
        subsectionId: this.subsectionId
      };
      await this.registerUser(payload).catch((err) => {
        console.log(err);
      });
    },
    async getSubsections() {
      await this.fetchSubsectionsFromSection(this.selectedSection).catch((err) => {
        console.log(err);
      })
      this.router.push('/')
    },
  },
};
</script>

<style scoped>
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