<template>
    <div class="cover-container w-100 p-3 mx-auto justify-content-center d-flex flex-column">
    <main class="px-3 d-flex flex-column">
        <div class="col-8 mx-auto">
            <div class="card card-signin my-5">
                <div class="card-body">
                    <h5 class="card-title text-center">Iniciar sessão</h5>
                    <form>
                        <div class="form-label-group">
                        <input type="email" id="inputEmail" class="form-control" placeholder="Endereço de email" required autofocus>
                        <label for="inputEmail">Endereço de email</label>
                        </div>
                        <div class="form-label-group">
                        <input type="password" id="inputPassword" class="form-control" placeholder="Palavra-passe" required>
                        <label for="inputPassword">Palavra-passe</label>
                        </div>
                        <button class="btn btn-lg btn-primary btn-block btn-login text-uppercase font-weight-bold mb-2 mt-3 w-100" type="submit">Entrar</button>
                        <div class="text-center mt-1">
                            <router-link to="/registo" class="link small">Não tens conta?</router-link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </main>
    </div>
</template>

<script>
export default {
    
}
</script>

<style>
    :root {
    --input-padding-x: 1.5rem;
    --input-padding-y: 0.75rem;
    }
    .card-signin {
        color:black;
        padding: 1rem;
        border: 0;
        border-radius: 1rem;
        box-shadow: 0 0.5rem 1rem 0 rgba(0, 0, 0, 0.1);
    }
    .card-signin .card-title {
        margin-bottom: 2rem;
        font-weight: 300;
        font-size: 1.5rem;
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
    .form-label-group>input,
    .form-label-group>label {
        padding: var(--input-padding-y) var(--input-padding-x);
        height: auto;
        border-radius: 2rem;
    }
    .form-label-group {
        position: relative;
        margin-bottom: 1rem;
    }

    .form-label-group>input,
    .form-label-group>label {
        padding: var(--input-padding-y) var(--input-padding-x);
        height: auto;
        border-radius: 2rem;
    }

    .form-label-group>label {
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
        border-radius: .25rem;
        transition: all .1s ease-in-out;
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