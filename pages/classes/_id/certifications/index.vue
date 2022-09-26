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
        <v-icon small @click="approveRegistration(item.id)">
          mdi-check-bold
        </v-icon>
        <v-icon small @click="cancelRegistration(item.id)">
          mdi-close-thick
        </v-icon>
      </template>
    </v-data-table>
  </div>
</template>

<script>
import Swal from 'sweetalert2'

export default {
  data() {
    return {
      className: '',
      search: '',
      students: [],
      studentsIds: [],
      selected: [],
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
        return;
      }

      if (this.selected.length == 1) {
        this.$axios
          .post('certifications', {
            courseId: this.selected[0].courseId,
            studentId: this.selected[0].studentId,
            teacherName: this.selected[0].teacherName,
          })
          .then(() => {
            return;
          })

      }

      this.$axios
        .post('certifications', {
          certificationsList: this.selected,
        })
        .then((response) => {
          console.log(response)
        })
    },

    async getOrUpdateRegistrationsList() {
      await this.$axios
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
  },
  beforeMount() {
    if (!this.$auth.$storage._state['_token.local']) {
      return
    }

    this.getOrUpdateRegistrationsList()
  },
}
</script>
