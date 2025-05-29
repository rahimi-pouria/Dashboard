<template>
  <div class="container d-flex align-items-center justify-content-center">
    <div class="col-md-5">
      <div class="login-card text-center">
        <img src="https://cdn-icons-png.flaticon.com/512/747/747376.png" alt="logo" class="logo" />
        <div class="form-title mb-4">ورود به حساب کاربری</div>

        <form dir="rtl">
          <div class="mb-3 text-end">
            <CustomInput id="email" v-model="login.email" input-type="email" title="ایمیل" placeholder="ایمیل خود را وارد کنید" required/>
          </div>

          <div class="mb-3 text-end">
            <CustomInput id="password" v-model="login.password" input-type="password" title="رمز عبور" placeholder="رمز عبور" required/>
          </div>

          <div class="d-flex justify-content-between align-items-center mb-3">
            <div class="form-check">
              <input class="form-check-input" type="checkbox" id="rememberMe">
              <label class="form-check-label" for="rememberMe">مرا به خاطر بسپار</label>
            </div>
            <router-link to="/SignIn" class="small text-decoration-none">فراموشی رمز عبور؟</router-link>
          </div>
          <custom-button @click="loginUser" id="submit" type="button" btn-class="btn btn-primary w-100" label="ورود"/>

          <div class="mt-4 text-center">
            حساب کاربری ندارید؟ <router-link to="/SignUp" >ثبت‌نام کنید</router-link>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">

import CustomInput from "@/components/CustomInput.vue";
import CustomButton from "@/components/CustomButton.vue";
import type {login} from '@/core/helpers/types'
import {reactive} from "vue";
import {showErrorAlert} from "@/core/helpers/alert.ts";
import { signInUser as store } from '@/stores/signIn.ts'
import {useVuelidate} from "@vuelidate/core";
import router from "@/router";

const login = reactive<login>({
    email: null,
    password: null,
    token: null,
    refreshToken:null
})

// @ts-ignore
const v$ = useVuelidate(login)



const loginUser = async () => {
  const isFormCorrect = await v$.value.$validate()
  if (!isFormCorrect) {
    await showErrorAlert('لطفا تمامی فیلد ها رو پر کنید')
    return
  }

  store.commit('setData', {
    email: login.email,
    password: login.password
  })

  try {
    const login = await store.dispatch('loginUser')

    if (login?.access_token) {
      sessionStorage.setItem('token', login.access_token)
    }
  await router.push('/')
  } catch (error) {
    await showErrorAlert('خطایی در فرآیند ورود رخ داد')
  }
}



</script>

<style scoped lang="scss">
.login-card {
  border: none;
  border-radius: 1rem;
  padding: 2rem;
  background-color: #ffffff;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
}

.form-control:focus {
  box-shadow: none;
  border-color: #667eea;
}

.btn-primary {
  background-color: #667eea;
  border: none;
}

.btn-primary:hover {
  background-color: #5a67d8;
}

.form-title {
  font-size: 1.5rem;
  font-weight: 700;
  color: #667eea;
}

.logo {
  width: 50px;
  height: 50px;
  margin-bottom: 1rem;
}
</style>