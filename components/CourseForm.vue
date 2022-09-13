<template>
  <validation-observer ref="course_form">
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
        rules="required"
        name="Goal"
        tag="div"
        class="input-div-provider"
      >
        <v-text-field
          v-model="form.goal"
          label="Goal"
          :error-messages="validationContext.errors[0]"
          :readonly="isShow"
        />
      </validation-provider>
      <validation-provider
        v-slot="validationContext"
        rules="required"
        name="Information"
        tag="div"
        class="input-div-provider"
      >
        <v-textarea
          v-model="form.information"
          label="Information"
          :error-messages="validationContext.errors[0]"
          :readonly="isShow"
        />
      </validation-provider>
      <validation-provider
        v-slot="validationContext"
        rules="required"
        name="Requirements"
        tag="div"
        class="input-div-provider"
      >
        <v-textarea
          v-model="form.requirements"
          label="Requirements"
          :error-messages="validationContext.errors[0]"
          :readonly="isShow"
        />
      </validation-provider>
      <validation-provider
        v-slot="validationContext"
        rules="required"
        name="Duration"
        tag="div"
        class="input-div-provider"
      >
        <v-text-field
          v-model="form.duration"
          label="Duration"
          type="number"
          :error-messages="validationContext.errors[0]"
          :readonly="isShow"
        />
      </validation-provider>
      <validation-provider
        v-slot="validationContext"
        rules="required"
        name="Price"
        tag="div"
        class="input-div-provider"
      >
        <v-text-field
          v-model="form.price"
          label="Price"
          :error-messages="validationContext.errors[0]"
          :readonly="isShow"
          type="number"
        />
      </validation-provider>
      <v-row>
        <v-btn type="submit" class="btn-form">
          <nuxt-link :to="{ path: `/teachers` }">
            <v-icon>mdi-arrow-left-bold</v-icon>Voltar
          </nuxt-link>
        </v-btn>
        <v-btn :type="this.isShow ? 'button' : 'submit'" class="btn-form">
          <div v-if="this.isShow">
            <nuxt-link
              :to="{ path: `/teachers/${this.$route.params.id}/edit` }"
            >
              <v-icon>mdi-pencil</v-icon>Editar
            </nuxt-link>
          </div>
          <div v-else><v-icon>mdi-content-save</v-icon> Salvar</div>
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
        information: '',
        goal: '',
        requirements: '',
        duration: '',
        price: '',
      },
    }
  },
  methods: {
    submit: async function () {
      const isValid = await this.$refs.course_form.validate()

      if (!isValid) {
        return
      }

      if (this.isEdit) {
        return this.updateTeacher()
      }

      return this.createTeacher()
    },

    createTeacher() {
      this.$axios.post('teachers', this.form).then((response) => {
        this.$router.push('/teachers')
        Swal.fire('Teacher was created!', '', 'success')
      })
    },

    updateTeacher() {
      this.$axios
        .patch(`teachers/${this.$route.params.id}`, this.form)
        .then((response) => {
          this.$router.push('/teachers')
          Swal.fire('Teacher was updated!', '', 'success')
        })
    },
  },
  mounted() {
    if (!this.isEdit && !this.isShow) {
      return
    }

    this.$axios.get(`teachers/${this.$route.params.id}`).then((response) => {
      this.form.name = response.data.name
      this.form.curriculum = response.data.curriculum
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
