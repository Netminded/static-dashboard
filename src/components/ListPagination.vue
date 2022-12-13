<script setup lang="ts">
    import { storeToRefs } from 'pinia'
    import { useDepsStore } from '@/stores/deps'

    const depsStore = useDepsStore()
    const { currentPage, getNumPages } = storeToRefs(depsStore)
    const { incrementCurrentPage, decrementCurrentPage } = depsStore

</script>

<template>
    <div className="content-pagination">
        <div class="content-page-pagination-prev">
            <button v-if="getNumPages > 1 && currentPage !== 1" class="btn" @click="decrementCurrentPage" aria-label="Previous Page"><font-awesome-icon icon="fa-solid fa-chevron-left" /><span>Prev</span></button>
        </div>
        <div v-if="getNumPages > 1">
            <p className="content-page-pagination-total">{{currentPage}}/{{getNumPages}}</p>
        </div>
        <div class="content-page-pagination-next">
            <button v-if="currentPage !== getNumPages" class="btn" @click="incrementCurrentPage" aria-label="Next Page"><span>Next</span><font-awesome-icon icon="fa-solid fa-chevron-right" /></button>
        </div>
    </div>
</template>

<style scoped>

    .content-pagination {
        display: flex;
        justify-content: space-between;
        margin-top: 30px;
        margin-bottom: 15px;
        padding-left: 20px;
        padding-right: 20px;
        width: 100%;
    }

    .content-page-pagination div {
        flex: 1;
    }

    .content-pagination .btn {
        background: #0d6af6;
        color: #FFFFFF;
        border: 0 solid transparent;
        border-radius: 50px;
        box-shadow: 0 4px 16px rgb(32 19 104 / 25%);
        font-family: "Poppins", sans-serif;
        font-size: 12px;
        font-weight: 600;
        padding: 10px 20px;
        text-transform: uppercase;
        text-decoration: none;
        transition-timing-function: ease-in;
        transition: 0.5s;
        cursor: pointer;
        margin-top: -18px;
    }

    .content-pagination .btn:hover {
        box-shadow: 0 4px 16px rgb(32 19 104 / 50%);
    }

    @media screen and (max-width: 500px) {
        .content-pagination .btn {
            padding: 10px 15px;
            margin-top: -8px;
        }
    }

    @media screen and (max-width: 500px) {
        .content-pagination .btn span {
            display: none;
        }
    }

    .content-page-pagination-prev {
        text-align: left;
        min-width: 65px;
    }

    .fa-chevron-left {
        padding-right: 5px;
    }

    .content-page-pagination-total {
        text-align: center;
        color: #4c4d55;
        font-family: "Poppins", sans-serif;
        font-size: 18px;
        font-weight: 600;
    }

    @media screen and (max-width: 500px) {
        .content-page-pagination-total {
            font-size: 18px;
        }
    }

    .content-page-pagination-next {
        text-align: right;
        min-width: 65px;
    }

    .fa-chevron-right {
        padding-left: 5px;
    }

</style>