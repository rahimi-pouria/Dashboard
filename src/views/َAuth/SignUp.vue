<template>
  <div class="signUp d-flex align-items-center justify-content-center w-100" dir="rtl">
    <div class="col-md-6">
      <div class="card p-4">
        <div class="text-center mb-4">
          <img src="https://cdn-icons-png.flaticon.com/512/295/295128.png" alt="logo" class="logo">
          <div class="form-title">ثبت‌نام در سایت</div>
        </div>

        <form>
          <div class="mb-3">
            <CustomInput v-model="userData.email" id="email-user" input-type="email" title="پست الکترونیک" placeholder="your@email.com" required/>
          </div>

          <div class="mb-3">
            <CustomInput v-model="userData.password" input-type="password" title="رمز عبور" id="password" placeholder="********" required/>
          </div>

          <div class="mb-3">
            <CustomInput v-model="userData.currentPassword" input-type="password" title="تکرار رمز عبور"  id="confirm-password" placeholder="********" required/>
          </div>
          <CustomButton id="creteUser" @click="creteUser"  type="button" label="ثبت‌نام" btn-class="btn btn-primary w-100"/>
          <div class="text-center mt-3">
            قبلاً ثبت‌نام کرده‌اید؟ <router-link to="/SignIn">وارد شوید</router-link>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { userData } from "@/core/helpers/types";
import CustomInput from "@/components/CustomInput.vue";
import CustomButton from "@/components/CustomButton.vue";
import {useVuelidate} from "@vuelidate/core";
import {showErrorAlert} from "@/core/helpers/alert.ts";
import {reactive} from "vue";
import { signUpUser as store } from '@/stores/singUp.ts'
const userData = reactive<userData>({
  email: null,
  password: null,
  currentPassword: null
})

// @ts-ignore
const v$ = useVuelidate(userData)

const creteUser = async () => {
  const isFormCorrect = await v$.value.$validate()
  if (!isFormCorrect) {
    await showErrorAlert('لطفا تمامی فیلد ها رو پر کنید')
    return
  }
  if(userData.password === userData.currentPassword) {
    store.commit('setData', {
      email: userData.email,
      password: userData.password,
      currentPassword: userData.currentPassword
    })
    try {
      await store.dispatch('signUp')
      btnLoading('creteUser', 'off')
    } catch (error) {
      await showErrorAlert('خطایی در فرآیند ثبت‌نام رخ داد')
    }
  }else {
    await showErrorAlert('رمز عبور و تکرار رمز عبور یکسان نیست')
  }
}


</script>

<style scoped lang="scss">
.card {
  border: none;
  border-radius: 1rem;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
}

.form-control:focus {
  box-shadow: none;
  border-color: #4facfe;
}

.btn-primary {
  background-color: #4facfe;
  border: none;
}

.btn-primary:hover {
  background-color: #00c6ff;
}

.form-label {
  font-weight: 500;
}

.form-title {
  font-size: 1.5rem;
  font-weight: 700;
  color: #4facfe;
}

.logo {
  width: 50px;
  height: 50px;
  object-fit: cover;
  margin-bottom: 1rem;
}
</style>