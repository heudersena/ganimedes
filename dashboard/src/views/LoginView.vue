<script setup>
import '../assets/photon.min.css';
</script>

<template>
    <div class="flex items-center justify-center h-screen w-screen bg-gray-100 p-6">
        <form class="w-[50%]">
            <div class="form-group">
                <label>E-mail</label>
                <input type="email" class="form-control h-11" placeholder="Email">
            </div>
            <div class="form-group">
                <label>Senha</label>
                <input type="password" class="form-control h-11" placeholder="Password">
            </div>
            <div class="form-actions">
                <button type="submit" class="btn btn-large  btn-primary cursor-pointer">OK</button>
            </div>

        </form>
    </div>
</template>
