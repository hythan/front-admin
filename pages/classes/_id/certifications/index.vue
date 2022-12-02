<template>
  <div>
    <v-data-table
      v-model="selected"
      :headers="headers"
      :items="students"
      item-key="name"
      class="elevation-1"
      :search="search"
      :custom-filter="filterOnlyCapsText"
      show-select
    >
      <template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title>{{ className }}</v-toolbar-title
          ><v-divider class="mx-4" inset vertical></v-divider>
          <v-spacer />
          <v-btn class="success" @click="generateCertifications">
            Generate Certifications
          </v-btn>
        </v-toolbar>
        <v-text-field
          v-model="search"
          label="Search"
          class="mx-4"
        ></v-text-field>
      </template>
      <template v-slot:[`item.actions`]="{ item }">
        <v-tooltip bottom>
          <template v-slot:activator="{ on, attrs }">
            <v-icon
              :color="checkCertification(item.studentId) ? 'green' : 'gray'"
              small
              @click="viewCertification(item.studentId)"
              v-bind="attrs"
              v-on="on"
              :disabled="!checkCertification(item.studentId)"
            >
              mdi-school
            </v-icon>
            <StudentCertification
              :certification="getCertification(item.studentId)"
            />
          </template>
          <span>Student Certification</span>
        </v-tooltip>
      </template>
    </v-data-table>
  </div>
</template>

<script>
import Swal from 'sweetalert2'
import StudentCertification from '../../../../components/StudentCertification.vue'

export default {
  data() {
    return {
      className: '',
      search: '',
      students: [],
      studentsIds: [],
      selected: [],
      studentsCertifications: [],
      component: StudentCertification,
    }
  },
  computed: {
    headers() {
      return [
        { text: 'Name', value: 'name', align: 'center' },
        { text: 'CPF', value: 'cpf', align: 'center' },
        { text: 'Actions', value: 'actions', align: 'center' },
      ]
    },
  },
  methods: {
    checkCertification(id) {
      return this.studentsIds.includes(id)
    },
    filterOnlyCapsText(value, search, item) {
      return (
        value != null &&
        search != null &&
        typeof value === 'string' &&
        value.toString().toLocaleLowerCase().indexOf(search) !== -1
      )
    },

    generateCertifications() {
      if (!this.selected.length) {
        return
      }

      this.$axios
        .post('certifications', {
          certificationsList: this.selected,
        })
        .then((response) => {
          if (response.data.status === 304) {
            return Swal.fire({
              position: 'center',
              type: 'error',
              title: response.data.message,
              showConfirmButton: false,
              timer: 3000,
            })
          }

          Swal.fire({
            position: 'center',
            type: 'success',
            title: response.data.message,
            text: 'Obs: Ignored duplicated values',
            showConfirmButton: false,
            timer: 5000,
          })
          this.getOrUpdateRegistrationsList();
        })
    },

    getStudentsCertifications() {
      let studens_ids = this.students.map((student) => student.id)
      this.$axios
        .get('certifications', {
          params: {
            course_id: this.students[0].courseId,
            studens_ids: JSON.parse(JSON.stringify(studens_ids)),
          },
        })
        .then((response) => {
          this.studentsIds = response.data.map(
            (cetification) => cetification.studentId
          )
          this.studentsCertifications = response.data
        })
    },

    async getOrUpdateRegistrationsList() {
      this.$axios
        .get(`classes/${this.$route.params.id}`, {
          headers: {
            Authorization: `${this.$auth.$storage._state['_token.local']}`,
          },
        })
        .then((response) => {
          this.className = response.data.name
          this.students = []
          this.setStudentsListData(response.data.registrations)
        })
        .finally(() => this.getStudentsCertifications())
    },

    setStudentsListData(registrations) {
      registrations.forEach((element) => {
        let studentObjAux = {}
        studentObjAux.id = element.id
        studentObjAux.studentId = element.student.id
        studentObjAux.courseId = element.class.courseId
        studentObjAux.name = element.student.name
        studentObjAux.cpf = element.student.cpf
        studentObjAux.teacherName = element.class.teacher.name
        this.students.push(studentObjAux)
      })
    },

    getCertification(id) {
      const certification = this.studentsCertifications.filter(
        (certification) => certification.studentId == id
      )

      return certification[0] ? certification[0] : null;
    },

    viewCertification(id) {
      const certification = this.getCertification(id)
      this.$nuxt.$emit('generateCertification', certification.id);
    },
  },
  beforeMount() {
    if (!this.$auth.$storage._state['_token.local']) {
      return
    }

    this.getOrUpdateRegistrationsList()
  },
}
</script>
