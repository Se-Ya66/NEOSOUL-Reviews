<template>
    <div class="bread-space">
        <v-breadcrumbs
        :items="items"
        ></v-breadcrumbs>
    </div>
</template>

<script>
export default {
    props: [
        'items',
    ],
}
</script>

<style>

</style>