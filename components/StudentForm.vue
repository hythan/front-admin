<template>
  <validation-observer ref="student_form">
    <form @submit.prevent="submit">
      <v-toolbar-title>Student Form</v-toolbar-title>
      <validation-provider
        v-slot="validationContext"
        rules="required"
        name="Name"
        tag="div"
      >
        <v-text-field
          v-model="form.name"
          label="Name"
          :error-messages="validationContext.errors[0]"
        />
      </validation-provider>
      <validation-provider
        v-slot="validationContext"
        rules="required|cpf"
        name="CPF"
        tag="div"
      >
        <v-text-field
          v-model="form.cpf"
          label="CPF"
          type="tel"
          :error-messages="validationContext.errors[0]"
          v-mask="'###.###.###-##'"
        />
      </validation-provider>
      <validation-provider
        v-slot="validationContext"
        rules="required|email"
        name="Email"
        tag="div"
      >
      <v-text-field
      v-model="form.email"
      label="Email"
      :error-messages="validationContext.errors[0]"
     />
      </validation-provider>
          <validation-provider
        v-slot="validationContext"
        rules="required"
        name="Password"
        tag="div"
      >
      <v-text-field
      v-model="form.password"
      label="Password"
      type="password"
      :error-messages="validationContext.errors[0]"
     />
      </validation-provider>
        </validation-provider>
          <validation-provider
        v-slot="validationContext"
        rules=""
        name="PasswordConfirmation"
        tag="div"
      >
      <v-text-field
      v-model="passwordConfirmation"
      label="Password Confirmation"
      type="password"
      :error-messages="validationContext.errors[0]"
     />
      </validation-provider>
    </form>
  </validation-observer>
</template>

<script>
export default {
  data() {
    return {
      form: {
        name: '',
        cpf: '',
        email: '',
        password: '',
      },
      passwordConfirmation: '',
    }
  },
  methods: {
    submit: async function () {},
  },
}
</script>

<style>
</style>