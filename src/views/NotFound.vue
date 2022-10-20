<script setup lang="ts">
    import { RouterLink } from "vue-router"
</script>

<template>
    <main>
        <div class="not-found-container">
            <p><font-awesome-icon icon="fa-solid fa-ghost" size="5x" /></p>
            <h1>Sorry, that page can't be found!</h1>
            <RouterLink to="/" class="btn">Home</RouterLink>
        </div>
    </main>
</template>

<style scoped>
    main {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        height: calc(100vh - 135px);
        width: 100%;
        background: url('../assets/NetMinded_Hero_Bk.svg') 50% 40% no-repeat, linear-gradient(108.69deg, #092842 13.22%, #0C0527 86.57%);
        background-size: cover;
        padding: 40px;
    }

    .not-found-container {
        width: 100%;
        text-align: center;
    }

    .fa-ghost {
        color: rgba(255, 255, 255, 0.3)
    }

    h1 {
        font-family: 'Poppins', sans-serif;
        font-weight: 800;
        color: #FFFFFF;
        margin-bottom: 20px;
    }

    .btn {
        background: #0d6af6;
        border: 0 solid transparent;
        border-radius: 50px;
        box-shadow: 0 4px 16px rgb(32 19 104 / 25%);
        color: #fff;
        font-family: "Poppins", sans-serif;
        font-size: 14px;
        font-weight: 600;
        padding: 10px 20px;
        text-transform: uppercase;
        transition-timing-function: ease-in;
        transition: 0.5s;
        text-decoration: none;
        cursor: pointer;
    }

    .btn:hover {
        background: #0c54c0;
    }

</style>