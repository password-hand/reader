<template>
    <el-button type="text" @click="$emit('open')">
    </el-button>
</template>

<script src="//unpkg.com/vue/dist/vue.js"></script>
<script src="//unpkg.com/element-ui@2.2.0/lib/index.js"></script>
<script>
    export default {
        name: '',
        props: ['change'],
        data() {
            return {

            }
        }
    }
</script>


<style lang="scss" scoped>
    @import url("//unpkg.com/element-ui@2.2.0/lib/theme-chalk/index.css");
</style>
