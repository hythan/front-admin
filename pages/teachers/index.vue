<template>
  <div>
    <v-data-table
      :headers="headers"
      :items="teachers"
      item-key="name"
      class="elevation-1"
      :search="search"
      :custom-filter="filterOnlyCapsText"
    >
      <template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title>Teachers</v-toolbar-title
          ><v-divider class="mx-4" inset vertical></v-divider>
          <v-spacer></v-spacer>
          <nuxt-link to="/teachers/create" class="btn-create">
            <v-btn color="primary" class="mb-2">Create Teacher</v-btn>
          </nuxt-link>
        </v-toolbar>
        <v-text-field
          v-model="search"
          label="Search"
          class="mx-4"
        ></v-text-field>
      </template>
      <template v-slot:[`item.actions`]="{ item }">
        <nuxt-link :to="{ path: `/teachers/${item.id}` }">
          <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
              <v-icon color="blue" small class="mr-2" v-bind="attrs" v-on="on">
                mdi-eye
              </v-icon>
            </template>
            <span>Teacher Info</span>
          </v-tooltip>
        </nuxt-link>
        <nuxt-link :to="{ path: `/teachers/${item.id}/edit` }">
          <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
              <v-icon
                color="#f2e600"
                small
                class="mr-2"
                v-bind="attrs"
                v-on="on"
              >
                mdi-pencil
              </v-icon>
            </template>
            <span>Teacher Info</span>
          </v-tooltip>
        </nuxt-link>
        <v-tooltip bottom>
          <template v-slot:activator="{ on, attrs }">
            <v-icon
              color="red"
              small
              class="mr-2"
              v-bind="attrs"
              v-on="on"
              @click="deleteTeacher(item.id)"
            >
              mdi-delete
            </v-icon>
          </template>
          <span>Remove Teacher</span>
        </v-tooltip>
      </template>
    </v-data-table>
  </div>
</template>

<script>
import Swal from 'sweetalert2'

export default {
  data() {
    return {
      search: '',
      teachers: [],
    }
  },
  computed: {
    headers() {
      return [
        { text: 'Name', value: 'name' },
        { text: 'Email', value: 'email' },
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
        title: 'Are you sure to delete this teacher?',
        confirmButtonText: 'Remove',
        showCancelButton: true,
      }).then((result) => {
        if (!result.value) {
          return
        }

        this.$axios.delete(`teachers/${id}`).then((response) => {
          Swal.fire('Teacher was removed!', '', 'success')
          this.getOrUpdateTeachersList()
        })
      })
    },
    getOrUpdateTeachersList() {
      this.$axios
        .get('teachers', {
          headers: {
            Authorization: `${this.$auth.$storage._state['_token.local']}`,
          },
        })
        .then((response) => {
          this.teachers = response.data
        })
    },
  },
  mounted() {
    if (!this.$auth.$storage._state['_token.local']) {
      return
    }

    this.getOrUpdateTeachersList()
  },
}
</script>
