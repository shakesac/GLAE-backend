<template>
<main>
    <div class="container" id="loginContainer">
        <div class="row">
            <div class="col-md-4 offset-md-4">
                <div class="login-form bg-light mt-4 p-4">
                    <form action="" method="" class="row g-3">
                        <h4>Bem-vindo</h4>
                        <div class="col-12">
                            <label>Endereço de email</label>
                            <input type="text" name="username" class="form-control" placeholder="Username">
                        </div>
                        <div class="col-12">
                            <label>Palavra-passe</label>
                            <input type="password" name="password" class="form-control" placeholder="Password">
                        </div>
                        <div class="col-12">
                            <button type="submit" class="btn btn-dark float-end">Login</button>
                        </div>
                    </form>
                    <hr class="mt-4">
                    <div class="col-12">
                        <p class="text-center mb-0">Ainda não tens conta? <a href="#">Regista-te</a></p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</main>
</template>

<script>
export default {
    
}
</script>

<style>
main {
    height: calc(100vh - 116px)
}
</style>