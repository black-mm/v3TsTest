<template>
  <div class="login-box">
    <div class="theme h-[48px]">文A</div>
    <el-card class="w-400px">
      <el-form :model="loginData" ref="loginRef" :rules="loginRules">
        <div class="title">vue3-element-admin</div>
        <!-- 用户名 -->
        <el-form-item prop="username">
          <div class="flex-y-center wh-full">
            <i-ep-user class="mx-2" />
            <el-input v-model="loginData.username" placeholder="用户名" class="h-[48px]" />
          </div>
        </el-form-item>

        <!-- 密码 -->
        <el-form-item prop="password">
          <div class="flex-y-center wh-full">
            <i-ep-lock class="mx-2" />
            <el-input v-model="loginData.password" placeholder="用户名" class="h-[48px]" />
          </div>
        </el-form-item>

        <!-- 验证码 -->
        <el-form-item prop="captchaCode">
          <div class="flex-y-center wh-full">
            <svg-icon icon-class="captcha" class="ml-10px mr-8px text-25px" />
            <el-input v-model="loginData.captchaCode" placeholder="验证码" class="h-[48px]" />
            <el-image @click="getCaptcha" :src="captchaBase64" class="h-[48px] w-200px" />
          </div>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" class="h-40px w-100% mb-40px" @click="handleLogin">登录</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <div class="text-center text-12px">
      <div>Copyright © 2021 - 2024 youlai.tech All Rights Reserved. 有来技术 版权所有</div>
      <div class="my-10px ">皖ICP备20006496号-3</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { FormInstance, FormRules } from "element-plus";
import { LoginData } from "@/api/auth";
import AuthAPI from "@/api/auth";
import { useUserStore } from "@/store/index";

const loginRef = ref<FormInstance>();
const loginData = reactive<LoginData>({
  username: "",
  password: "",
  captchaCode: "",
  captchaKey: "",
});
const loginRules = reactive<FormRules<LoginData>>({
  username: [
    { required: true, message: "Please input username", trigger: "blur" },
  ],
  password: [
    { required: true, message: "Please input password", trigger: "blur" },
  ],
  captchaCode: [
    { required: true, message: "Please input captchaCode", trigger: "blur" },
  ],
});
let captchaBase64 = ref();
let userStore = useUserStore();
let router = useRouter();

//业务
const handleLogin = () => {
  loginRef.value?.validate(async (valid) => {
    if (valid) {
      userStore.login(loginData).then(() => {
        router.push("/");
        userStore.getUserInfo();
      });
    }
  });
};
//获取验证码
async function getCaptcha() {
  let res = await AuthAPI.getCaptcha();
  loginData.captchaKey = res.captchaKey;
  captchaBase64.value = res.captchaBase64;
}

onMounted(() => {
  getCaptcha();
});
</script>

<style scoped lang="scss">
.login-box {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  height: 100vh;
  background: url(/src/assets/images/login-background-light.jpg) no-repeat center right;
}

.el-card {
  background: transparent;
  border-radius: 4%;
}

.theme {
  width: 100%;
  text-align: right;
}

.title {
  text-align: center;
  font-size: 24px;
  font-weight: 800;
  margin: 15px 0 25px 0;
}

:deep(.el-input) {
  .el-input__wrapper {
    box-shadow: none;
    background: transparent;
  }

  &:hover {
    box-shadow: none;
  }
}

:deep(.el-form-item.is-error .el-input__wrapper) {
  box-shadow: none !important;
}

.el-form-item {
  border-radius: 5px;
}

.wh-full {
  border: 1px solid var(--el-border-color);
  border-radius: 5px;
}
</style>
