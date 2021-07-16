<template>
  <div class="center-container d-flex text-center text-white bg-dark">
    <div class="cover-container w-100 p-3 mx-auto justify-content-center d-flex flex-column">
    <main class="px-3 d-flex flex-column">
        <div class="col-8 mx-auto">
            <div class="card card-signin my-5">
                <div class="card-body">
                    <h5 class="card-title">Iniciar sessão</h5>
                    <form>
                        <div class="mb-3">
                            <label for="exampleInputEmail1" class="form-label">Endereço de email</label>
                            <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp">
                            <div id="emailHelp" class="form-text">We'll never share your email with anyone else. Palavra de escuteiro!</div>
                        </div>
                        <div class="mb-5">
                            <label for="exampleInputPassword1" class="form-label">Palavra-passe</label>
                            <input type="password" class="form-control" id="exampleInputPassword1">
                        </div>
                        <button type="submit" class="btn btn-success">Entrar</button>
                    </form>
                </div>
            </div>
        </div>
    </main>
    </div>
  </div>
</template>

<script>
export default {
    
}
</script>

<style>
  .center-container {
      background-image: url('../assets/background.jpg');
      background-position: center;
      background-repeat: no-repeat;
      background-size: cover;      
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
</style>