<template>
  <validation-observer ref="student_form">
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
        rules="required|cpf"
        name="CPF"
        tag="div"
        class="input-div-provider"
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
        class="input-div-provider"
      >
        <v-text-field
          v-model="form.email"
          label="Email"
          :error-messages="validationContext.errors[0]"
        />
      </validation-provider>
      <div v-if="!isShow">
        <validation-provider
          v-slot="validationContext"
          :rules="this.isEdit ? '' : 'required'"
          name="Password"
          tag="div"
          class="input-div-provider"
        >
          <v-text-field
            v-model="form.password"
            label="Password"
            type="password"
            :error-messages="validationContext.errors[0]"
          />
        </validation-provider>
        <validation-provider
          v-slot="validationContext"
          :rules="
            this.form.password ? 'required|email_confirmation:@Password' : ''
          "
          name="PasswordConfirmation"
          tag="div"
          class="input-div-provider"
        >
          <v-text-field
            v-model="passwordConfirmation"
            label="Password Confirmation"
            type="password"
            :error-messages="validationContext.errors[0]"
          />
        </validation-provider>
      </div>

      <v-btn type="submit" class="btn-form-save"
        ><v-icon>mdi-content-save</v-icon>Salvar</v-btn
      >
    </form>
  </validation-observer>
</template>

<script>
import Swal from 'sweetalert2'

export default {
  props: ['formTitle', 'isEdit', 'isShow'],
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
    submit: async function () {
      const isValid = await this.$refs.student_form.validate()

      if (!isValid) {
        return
      }
      if (this.isEdit) {
        this.updateStudent()
      }
      this.createStudent()
    },

    createStudent() {
      this.$axios.post('students', this.form).then((response) => {
        this.$router.push('/students')
        Swal.fire('Student was created!', '', 'success')
      })
    },

    updateStudent() {
      this.$axios
        .patch(`students/${this.$route.params.id}`, this.form)
        .then((response) => {
          this.$router.push('/students')
          Swal.fire('Student was updated!', '', 'success')
        })
    },
  },
  mounted() {
    if (!this.isEdit) {
      return
    }

    this.$axios.get(`students/${this.$route.params.id}`).then((response) => {
      this.form.name = response.data.name
      this.form.cpf = response.data.cpf
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

.btn-form-save {
  max-width: 100px;
  margin: auto;
  margin-bottom: 15px;
}
</style>
