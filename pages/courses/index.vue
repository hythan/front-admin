<template>
  <div>
    <v-data-table
      :headers="headers"
      :items="courses"
      item-key="name"
      class="elevation-1"
      :search="search"
      :custom-filter="filterOnlyCapsText"
    >
      <template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title>Courses</v-toolbar-title
          ><v-divider class="mx-4" inset vertical></v-divider>
          <v-spacer></v-spacer>
          <nuxt-link to="/courses/create" class="btn-create">
            <v-btn color="primary" class="mb-2">Create Course</v-btn>
          </nuxt-link>
        </v-toolbar>
        <v-text-field
          v-model="search"
          label="Search"
          class="mx-4"
        ></v-text-field>
      </template>
      <template v-slot:[`item.actions`]="{ item }">
         <nuxt-link :to="{ path: `/courses/${item.id}` }"
          ><v-icon small class="mr-2"> mdi-eye </v-icon></nuxt-link
        >
        <nuxt-link :to="{ path: `/courses/${item.id}/edit` }"
          ><v-icon small class="mr-2"> mdi-pencil </v-icon></nuxt-link
        >
        <v-icon small @click="deleteTeacher(item.id)"> mdi-delete </v-icon>
      </template>
    </v-data-table>
  </div>
</template>

<script>
import Swal from 'sweetalert2'

export default {
  middleware: ['auth'],
  data() {
    return {
      search: '',
      courses: [],
    }
  },
  computed: {
    headers() {
      return [
        { text: 'Name',value: 'name' },
        { text: 'Actions', value: 'actions' },
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
    deleteTeacher(id) {
      Swal.fire({
        title: 'Are you sure to delete this course?',
        confirmButtonText: 'Remove',
        showCancelButton: true,
      }).then((result) => {
        if (!result.value) {
          return
        }

        this.$axios.delete(`courses/${id}`).then((response) => {
          Swal.fire('Course was removed!', '', 'success')
          this.getOrUpdateCoursesList()
        })
      })
    },
    getOrUpdateCoursesList() {
      this.$axios
        .get('courses', {
          headers: {
            Authorization: `${this.$auth.$storage._state['_token.local']}`,
          },
        })
        .then((response) => {
          this.courses = response.data
        })
    },
  },
  mounted() {
    if (!this.$auth.$storage._state['_token.local']) {
      return
    }

    this.getOrUpdateCoursesList()
  },
}
</script>
