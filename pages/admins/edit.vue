<template>
  <div>
    <validation-observer ref="admin_edit">
      <form @submit.prevent="submit" class="card card-md">
        <validation-provider
          v-slot="validationContext"
          rules="required"
          name="Name"
          tag="div"
          class="input-div-provider"
        >
          <v-text-field
            v-model="name"
            label="Name"
            :error-messages="validationContext.errors[0]"
          />
        </validation-provider>
        <validation-provider
          v-slot="validationContext"
          rules="required|email"
          name="Email"
          tag="div"
          class="input-div-provider"
        >
          <v-text-field
            v-model="email"
            label="Email"
            :error-messages="validationContext.errors[0]"
          />
        </validation-provider>
        <validation-provider
          v-slot="validationContext"
          name="Password"
          tag="div"
          class="input-div-provider"
        >
          <v-text-field
            v-model="password"
            type="password"
            label="Password"
            :error-messages="validationContext.errors[0]"
          />
        </validation-provider>
        <validation-provider
          v-slot="validationContext"
          name="Password"
          tag="div"
          class="input-div-provider"
        >
          <v-text-field
            v-model="passwordConfirmation"
            type="password"
            label="Password Confirmation"
            :error-messages="validationContext.errors[0]"
          />
        </validation-provider>
        <v-btn class="btn-form-edit" type="submit"><v-icon>mdi-content-save</v-icon> Salvar</v-btn>
      </form>
    </validation-observer>
  </div>
</template>

<script >
export default {
  data() {
    return {
      name: '',
      email: '',
      password: '',
      passwordConfirmation: '',
    }
  },
  methods: {
    submit() {},
  },
  mounted() {
    console.log(this.$route.query);
  }
}
</script>

<style scoped>
.input-div-provider {
  margin: 0 15px 5px 15px;
}

.btn-form-edit {
    max-width: 100px;
    margin: auto;
    margin-bottom: 15px;
}

</style>