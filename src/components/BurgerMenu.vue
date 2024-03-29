<script setup lang="ts">
const props = defineProps(['modelValue'])
const emit = defineEmits(['update:modelValue', 'change'])
const onChange = ()=> {
  emit('update:modelValue', !props.modelValue)
  emit('change', !props.modelValue)
}

</script>

<template>
  <Button   class="burger" severity="success" :class="{'is-active': props.modelValue}" @click="onChange">
    <span class="burger"></span>
    <span class="burger"></span>
    <span class="burger"></span>
  </Button>
</template>

<style scoped>
button.burger {
  border-radius:50%;
  width:45px;
  height:45px;
}
span.burger {
  height: 2px;
  background: white;
  width: 30px;
  position: absolute;
  left: 7px;
  transition: transform 100ms;

}
button.burger span:nth-child(1) {
  top: 12px
}
button.burger span:nth-child(3) {
  bottom: 12px
}
button.burger.is-active span:nth-child(1) {
  top: calc(50% - 1px);
  transform: rotate(45deg);
}

button.burger.is-active span:nth-child(2) {
  visibility:hidden;
}
button.burger.is-active span:nth-child(3) {
  bottom: calc(50% - 1px);
  transform: rotate(-45deg);
}
</style>