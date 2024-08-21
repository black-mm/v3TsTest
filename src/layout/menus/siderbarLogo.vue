<template>
    <!-- logo图标 -->
    <div class="animate__animated animate__fadeInLeft">
        <el-menu-item index="/dashboard" v-if="!collapse"  class="logo-container">
            <img src="@/assets/logo.png" alt="" class="logo">
        </el-menu-item>

        <el-menu-item index="/dashboard" v-if="collapse"  class="logo-container">
            <img src="@/assets/logo.png" alt="" class="logo">
            <span class="logo-title" v-if="collapse">vue3-element-admin</span>
        </el-menu-item>
    </div>
</template>
<script setup lang='ts'>
let props = defineProps(['collapse'])
</script>

<style scoped lang="scss">
.logo-container {
    height: 56px;
    display: flex;
    align-items: center;
    font-size: 14px;

    img {
        width: 20px;
        height: 20px;
        margin-right: 5px;
    }

   span {
        color: #fff;
        font-weight: bold;
    }
}
.el-menu-item:hover {
  background-color: var(--menu-hover);
}
</style>