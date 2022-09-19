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
         <nuxt-link :to="{ path: `/classes/${item.id}` }"
          ><v-icon small class="mr-2"> mdi-eye </v-icon></nuxt-link
        >
        <nuxt-link :to="{ path: `/classes/${item.id}/edit` }"
          ><v-icon small class="mr-2"> mdi-pencil </v-icon></nuxt-link
        >
        <v-icon small @click="deleteClass(item.id)"> mdi-delete </v-icon>
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
        { text: 'Name', value: 'name' },
        { text: 'Curso', value: 'courseId' },
        { text: 'Start Date', value: 'startDate' },
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
          console.log(response.data);
          this.classes = response.data;
          this.classes.forEach(element => {
            element.startDate = element.startDate.substr(0, 10);
          });
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
