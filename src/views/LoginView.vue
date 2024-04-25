<script setup lang="ts">
import userStorage from "@/stores/userStorage";
import {useToast} from "primevue/usetoast";
import {data} from "autoprefixer";
const toast = useToast();


const userStore =  userStorage()
const onSubmit = async  () => {
   const response = await userStore.login()
  if (response.data) {
     userStore.setToken(response.data.access_token)
    location.reload()
  }else if (response.message) {
    toast.add({
      severity: 'error',
      summary: response.message,
      life: 100000
    });
  }
 }
</script>

<template>
  <main class="flex ">
    <Card style="width: 25rem; overflow: hidden" class="m-auto">
  >
      <template #title>Login</template>
      <template #content>
       <form @submit.prevent="onSubmit">
         <div>

           <div class="flex flex-col gap-2 mb-5">
             <label for="username">Email</label>
             <InputText id="username" type="email" placeholder="demo@demo.com" class="w-full md:w-30rem" v-model="userStore.form.email" />
            <template v-if="userStore.errores.email.length > 0">
              <small v-for="(err, index) in userStore.errores.email" :key="index"> {{err}} </small>
            </template>

           </div>
           <div class="flex flex-col gap-2">
             <label for="password">Clave</label>
             <Password id="password"
                       v-model="userStore.form.password"
                       placeholder="Password"
                       :toggleMask="true"
                       class="w-full "
                       inputClass="w-full"/>

           </div>
         </div>
       </form>
      </template>
      <template #footer>
        <div class=" grid grid-cols-1 gap-2">
          <Button :label="'Login '" outlined severity="success" size="small"
                  @click="onSubmit" :loading="userStore.isLoading"
                  :disabled="userStore.isLoading"
          />
        </div>
      </template>
    </Card>
  </main>
</template>
<style>
 main {
   height: 100vh;
   width: 100vw;
 }
</style>
