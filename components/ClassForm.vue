<template>
  <validation-observer ref="class_form">
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
        name="Course"
        tag="div"
        class="input-div-provider"
      >
        <v-select
          v-model="form.courseId"
          :items="courses"
          item-text="name"
          item-value="id"
          label="Course"
          :error-messages="validationContext.errors[0]"
          required
        ></v-select>
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
        name="Location"
        tag="div"
        class="input-div-provider"
      >
        <v-text-field
          v-model="form.location"
          label="Location"
          :error-messages="validationContext.errors[0]"
          :readonly="isShow"
        />
      </validation-provider>
      <validation-provider
        v-slot="validationContext"
        rules="required"
        name="Class Time"
        tag="div"
        class="input-div-provider"
      >
        <v-text-field
          v-model="form.classTimes"
          label="Class Time"
          :error-messages="validationContext.errors[0]"
          :readonly="isShow"
        />
      </validation-provider>
      <validation-provider
        v-slot="validationContext"
        rules="required"
        name="Teacher"
        tag="div"
        class="input-div-provider"
      >
        <v-select
          v-model="form.teacherId"
          :items="teachers"
          item-text="name"
          item-value="id"
          label="Teacher"
          :error-messages="validationContext.errors[0]"
          required
        ></v-select>
      </validation-provider>
      <validation-provider
        rules="required"
        name="Start Date"
        tag="div"
        class="input-div-provider"
      >
        <v-menu
          v-model="menu"
          :close-on-content-click="false"
          transition="scale-transition"
          offset-y
          max-width="290px"
          min-width="auto"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-text-field
              v-model="computedDateFormatted"
              label="Start Date"
              prepend-icon="mdi-calendar"
              readonly
              v-bind="attrs"
              v-on="on"
            ></v-text-field>
          </template>
          <v-date-picker
            v-model="form.startDate"
            no-title
            @input="menu = false"
            :readonly="isShow"
          ></v-date-picker>
        </v-menu>
      </validation-provider>
      <v-row>
        <v-btn type="submit" class="btn-form">
          <nuxt-link :to="{ path: `/classes` }">
            <v-icon>mdi-arrow-left-bold</v-icon>Voltar
          </nuxt-link>
        </v-btn>
        <v-btn :type="this.isShow ? 'button' : 'submit'" class="btn-form">
          <div v-if="this.isShow">
            <nuxt-link :to="{ path: `/classes/${this.$route.params.id}/edit` }">
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
      menu: false,
      form: {
        name: '',
        courseId: '',
        information: '',
        location: '',
        startDate: new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
          .toISOString()
          .substr(0, 10),
        classTimes: '',
        teacherId: '',
      },
      courses: [],
      teachers: [],
    }
  },
  methods: {
    submit: async function () {
      const isValid = await this.$refs.class_form.validate()

      if (!isValid) {
        return
      }

      if (this.isEdit) {
        return this.updateClass()
      }

      return this.createClass()
    },

    createClass() {
      this.$axios.post('classes', this.form).then(() => {
        this.$router.push('/classes')
        Swal.fire('Class was created!', '', 'success')
      })
    },

    updateClass() {
      this.$axios
        .patch(`classes/${this.$route.params.id}`, this.form)
        .then(() => {
          this.$router.push('/classes')
          Swal.fire('Class was updated!', '', 'success')
        })
    },

    formatDate(date) {
      if (!date) return null

      const [year, month, day] = date.split('-')
      return `${day}/${month}/${year}`
    },

    getAllTeachers() {
      this.$axios.get(`teachers`).then((response) => {
        this.teachers = response.data
      })
    },

    getAllCourses() {
      this.$axios.get(`courses`).then((response) => {
        this.courses = response.data
      })
    },
  },
  computed: {
    computedDateFormatted() {
      return this.formatDate(this.form.startDate)
    },
  },
  mounted() {
    this.getAllTeachers()
    this.getAllCourses()

    if (!this.isEdit && !this.isShow) {
      return
    }

    this.$axios.get(`classes/${this.$route.params.id}`).then((response) => {
      this.form = response.data
      this.form.startDate = this.form.startDate.substr(0, 10);
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
