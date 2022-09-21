<template>
  <v-btn type="button" class="btn-form" @click="goToPrev()">
    <v-icon>mdi-arrow-left-bold</v-icon>Voltar
  </v-btn>
</template>

<script>
export default {
  methods: {
     goToPrev() {
      this.$router.go(-1)
    },
  }
}
</script>

<style>
</style>
