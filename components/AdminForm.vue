<template>
  <div>
    <validation-observer ref="admin_form">
      <form @submit.prevent="submit" class="card card-md">
        <h2 class="form-title text-center">{{ formTitle }}</h2>

        <validation-provider
          v-slot="validationContext"
          rules="required"
          name="Name"
          tag="div"
          class="input-div-provider"
        >
          <v-text-field
            v-model="form.name"
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
            v-model="form.email"
            label="Email"
            :error-messages="validationContext.errors[0]"
          />
        </validation-provider>
        <validation-provider
          v-slot="validationContext"
          :rules="isEdit ? '' : 'required'"
          name="Password"
          tag="div"
          class="input-div-provider"
        >
          <v-text-field
            v-model="form.password"
            type="password"
            label="Password"
            :error-messages="validationContext.errors[0]"
          />
        </validation-provider>
        <validation-provider
          v-slot="validationContext"
          name="Password Confirmation"
          tag="div"
          :rules="
            this.form.password ? 'required|email_confirmation:@Password' : ''
          "
          class="input-div-provider"
        >
          <v-text-field
            v-model="passwordConfirmation"
            type="password"
            label="Password Confirmation"
            :error-messages="validationContext.errors[0]"
          />
        </validation-provider>
        <v-row>
          <BackBtn />
          <v-btn type="submit" class="btn-form">
           <v-icon>mdi-content-save</v-icon> Salvar
          </v-btn>
        </v-row>
      </form>
    </validation-observer>
  </div>
</template>

<script >
export default {
  props: ['isEdit', 'formTitle'],
  data() {
    return {
      form: {
        name: '',
        email: '',
        password: '',
      },
      passwordConfirmation: '',
    }
  },
  methods: {
    submit: async function () {
      const isValid = await this.$refs.admin_form.validate()
      if (!isValid) {
        return
      }

      if (this.isEdit) {
        return this.editAdmin()
      }

      return this.createAdmin()
    },
    editAdmin() {
      this.$axios
        .patch(`admins/${this.$route.params.id}`, this.form)
        .then((response) => {
          this.$router.push('/admins')
          Swal.fire('Admin was updated!', '', 'success')
        })
    },
    createAdmin() {
      this.$axios.post(`admins`, this.form).then((response) => {
        this.$router.push('/admins')
        Swal.fire('Admin was updated!', '', 'success')
      })
    },
  },
  mounted() {
    if (!this.isEdit) {
      return
    }
    this.$axios
      .get(`admins/${this.$route.params.id}`, {
        headers: {
          Authorization: `${this.$auth.$storage._state['_token.local']}`,
        },
      })
      .then((response) => {
        this.form.name = response.data.name
        this.form.email = response.data.email
      })
  },
}
</script>

<style scoped>
.input-div-provider {
  margin: 0 15px 5px 15px;
}

.form-title {
  margin-top: 10px;
  text-shadow: 1px 1px 2px rgb(112, 112, 112);
}

.btn-form {
  max-width: 100px;
  margin: auto;
  margin-bottom: 25px;
}

a {
  text-decoration: none;
  color: inherit;
}
</style>
