<template>
    <div>{{ message }}</div>
</template>

<script>
export default {
    name: "FlashMessage",
    props: {
        message: {
            type: String,
        },
    },
}
</script>