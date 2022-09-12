<template>
  <validation-observer ref="teacher_form">
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
          :readonly="isShow"
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
          :readonly="isShow"
        />
      </validation-provider>
      <validation-provider
        v-slot="validationContext"
        rules="required"
        name="Curriculum"
        tag="div"
        class="input-div-provider"
      >
        <v-textarea
          v-model="form.curriculum"
          label="Curriculum"
          type="tel"
          :error-messages="validationContext.errors[0]"
          :readonly="isShow"
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

      <v-row>
        <v-btn type="submit" class="btn-form">
          <nuxt-link :to="{ path: `/students` }">
            <v-icon>mdi-arrow-left-bold</v-icon>Voltar
          </nuxt-link>
        </v-btn>
        <v-btn type="submit" class="btn-form">
          <nuxt-link :to="{ path: `/students/${this.$route.params.id}/edit` }">
            <v-icon>mdi-pencil</v-icon>Editar
          </nuxt-link>
        </v-btn>
      </v-row>
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
        curriculum: '',
        email: '',
        password: '',
      },
      passwordConfirmation: '',
    }
  },
  methods: {
    submit: async function () {
      const isValid = await this.$refs.teacher_form.validate()

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
    if (!this.isEdit && !this.isShow) {
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
