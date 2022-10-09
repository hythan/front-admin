<template>
  <div>
    <v-btn color="primary" class="ma-2" dark @click="dialog = true">
      Add Student
    </v-btn>
    <v-dialog v-model="dialog" max-width="500px">
      <validation-observer ref="registration_form">
        <form @submit.prevent="submit">
          <v-card>
            <v-card-text>
              <v-card-title> Add Student Registration </v-card-title>

              <validation-provider
                v-slot="validationContext"
                rules="required"
                name="Select a Student"
                tag="div"
              >
                <v-select
                  v-model="studentId"
                  :items="students"
                  label="Select a Student"
                  item-value="id"
                  item-text="cpf"
                  :error-messages="validationContext.errors[0]"
                ></v-select>
              </validation-provider>
            </v-card-text>
            <v-card-actions>
              <v-btn color="primary" text @click="dialog = false">
                Close
              </v-btn>
              <v-spacer />
              <v-btn color="success" text @click="addStudentToClass()">
                Add
              </v-btn>
            </v-card-actions>
          </v-card>
        </form>
      </validation-observer>
    </v-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      dialog: false,
      students: [],
      studentId: null,
    }
  },
  methods: {
    async addStudentToClass() {
      const isValid = await this.$refs.registration_form.validate()

      if (!isValid) {
        return
      }
      this.$axios
        .post('registrations', {
          studentId: this.studentId,
          classId: this.$route.params.id,
        })
        .then(() => {
          this.dialog = false
          this.$emit('saved')
        })
    },
  },
  mounted() {
    const studentsIdsJson = JSON.parse(
      JSON.stringify(this.$store.state.students.studentsIds)
    )
    this.$axios
      .get('students', {
        params: {
          students_ids: studentsIdsJson,
        },
      })
      .then((response) => {
        this.students = response.data
      })
  },
}
</script>

<style>
</style>
