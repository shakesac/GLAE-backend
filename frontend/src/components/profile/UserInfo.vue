<template>
<div>                 
<div class="row mb-3">
    <div class="col-md-6">
        <p class="my-1">
            <span id="key" class="mr-5">Nome:</span>
            <span id="value" class="font-italic text-muted "></span>
        </p>
        <p class="my-1">
            <span id="key" class="mr-5">Endereço de email:</span>
            <span id="value" class="font-italic text-muted "></span>
        </p>
        <p class="my-1">
            <span id="key" class="mr-5">Telemóvel:</span>
            <span id="value" class="font-italic text-muted "></span>
        </p>
        <p class="my-1">
            <span id="key" class="mr-5">Morada:</span>
            <span id="value" class="font-italic text-muted "></span>
        </p>
        <p class="my-1">
            <span id="key" class="mr-5">Permissões:</span>
            <span id="value" class="font-italic text-muted "></span>
        </p>
        <p>
            <span id="key" class="mr-5">Nome:</span>
            <span id="value" class="font-italic text-muted "></span>
        </p>
    </div>
    <hr class="d-md-none my-2">
    <div class="col-md-6">
        <p class="my-1">
            <span id="key" class="mr-5">Código de utilizador:</span>
            <span id="value" class="font-italic text-muted "></span>
        </p>
        <p class="my-1">
            <span id="key" class="mr-5">Registado desde:</span>
            <span id="value" class="font-italic text-muted "></span>
        </p>
        <p class="my-1">
            <span id="key" class="mr-5">Nome:</span>
            <span id="value" class="font-italic text-muted "></span>
        </p>
        <p class="my-1">
            <span id="key" class="mr-5">Endereço de email:</span>
            <span id="value" class="font-italic text-muted "></span>
        </p>
        <p class="my-1">
            <span id="key" class="mr-5">Telemóvel:</span>
            <span id="value" class="font-italic text-muted "></span>
        </p>
        <p class="my-1">
            <span id="key" class="mr-5">Morada:</span>
            <span id="value" class="font-italic text-muted "></span>
        </p>
        <p class="my-1">
            <span id="key" class="mr-5">Permissões:</span>
            <span id="value" class="font-italic text-muted "></span>
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
</template>
<script>
export default {
    
}
</script>
<style>
    
</style>