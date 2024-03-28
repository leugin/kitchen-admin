<script setup lang="ts">
import TheWelcome from '../components/TheWelcome.vue'

const userStore = {
  form:{
    email: null,
    password:null,
    isLoading:false

  }
}
const onSubmit = ()=> {}
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
          <Button label="Login" outlined severity="success" size="small" />
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
