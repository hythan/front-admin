<template>
  <div>
    <v-data-table
      :headers="headers"
      :items="classes"
      item-key="name"
      class="elevation-1"
      :search="search"
      :custom-filter="filterOnlyCapsText"
    >
      <template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title>Classes</v-toolbar-title
          ><v-divider class="mx-4" inset vertical></v-divider>
          <v-spacer></v-spacer>
          <nuxt-link to="/classes/create" class="btn-create">
            <v-btn color="primary" class="mb-2">Create Class</v-btn>
          </nuxt-link>
        </v-toolbar>
        <v-text-field
          v-model="search"
          label="Search"
          class="mx-4"
        ></v-text-field>
      </template>
      <template v-slot:[`item.actions`]="{ item }">
        <nuxt-link :to="{ path: `/classes/${item.id}/certifications` }">
          <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
              <v-icon color="blue" small class="mr-2" v-bind="attrs" v-on="on">
                mdi-account-school
              </v-icon>
            </template>
            <span>Certifications</span>
          </v-tooltip>
        </nuxt-link>

        <nuxt-link :to="{ path: `/classes/${item.id}/registrations` }">
          <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
              <v-icon color="green" small class="mr-2" v-bind="attrs" v-on="on">
                mdi-account-plus
              </v-icon>
            </template>
            <span>Registrations</span>
          </v-tooltip>
        </nuxt-link>

        <nuxt-link :to="{ path: `/classes/${item.id}` }">
          <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
              <v-icon
                color="light-blue"
                small
                class="mr-2"
                v-bind="attrs"
                v-on="on"
              >
                mdi-eye
              </v-icon>
            </template>
            <span>Class Info</span>
          </v-tooltip>
        </nuxt-link>

        <nuxt-link :to="{ path: `/classes/${item.id}/edit` }">
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
            <span>Edit Class</span>
          </v-tooltip>
        </nuxt-link>
        <v-tooltip bottom>
          <template v-slot:activator="{ on, attrs }">
            <v-icon
              color="red"
              small
              @click="deleteClass(item.id)"
              v-bind="attrs"
              v-on="on"
            >
              mdi-delete
            </v-icon>
          </template>
          <span>Delete Class</span>
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
      classes: [],
    }
  },
  computed: {
    headers() {
      return [
        { text: 'Name', value: 'name', align: 'center' },
        { text: 'Curso', value: 'courseId', align: 'center' },
        { text: 'Start Date', value: 'startDate', align: 'center' },
        { text: 'Registrations', value: 'registrations', align: 'center' },
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
    deleteClass(id) {
      Swal.fire({
        title: 'Are you sure to delete this class?',
        confirmButtonText: 'Remove',
        showCancelButton: true,
      }).then((result) => {
        if (!result.value) {
          return
        }

        this.$axios.delete(`classes/${id}`).then((response) => {
          Swal.fire('Class was removed!', '', 'success')
          this.getOrUpdateClassesList()
        })
      })
    },
    getOrUpdateClassesList() {
      this.$axios
        .get('classes', {
          headers: {
            Authorization: `${this.$auth.$storage._state['_token.local']}`,
          },
        })
        .then((response) => {
          this.classes = response.data
        })
        .finally(() => {
          this.setClassListDatas()
        })
    },

    setClassListDatas() {
      this.classes.forEach((element) => {
        element.startDate = element.startDate.substr(0, 10)
        element.courseId = element.course.name
        element.registrations = element.registrations.length
      })
    },
  },
  mounted() {
    if (!this.$auth.$storage._state['_token.local']) {
      return
    }

    this.getOrUpdateClassesList()
  },
}
</script>
