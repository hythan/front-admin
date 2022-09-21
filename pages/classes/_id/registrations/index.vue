<template>
  <div>
    <v-data-table
      :headers="headers"
      :items="registrations"
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
        <v-icon small @click="approveRegistration(item.id)"> mdi-check-bold </v-icon>
        <v-icon small @click="cancelRegistration(item.id)"> mdi-close-thick </v-icon>
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
      registrations: [],
    }
  },
  computed: {
    headers() {
      return [
        { text: 'Name', value: 'name', align: 'center' },
        { text: 'Situation', value: 'status', align: 'center' },
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
    cancelRegistration(id) {
      console.log(id);
      Swal.fire({
        title: 'Are you sure to mark this registration as NOT completed?',
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
        .get(`classes/${this.$route.params.id}`, {
          headers: {
            Authorization: `${this.$auth.$storage._state['_token.local']}`,
          },
        })
        .then((response) => {
          this.setClassListDatas(response.data.registrations)
        })
        .finally(() => {})
    },

    setClassListDatas(registrations) {
      const obj = {
        id: '',
        name: '',
        status: '',
      }
      registrations.forEach((element) => {
        obj.id = element.id
        obj.name = element.student.name
        obj.status = element.complete ? 'Complete' : 'Incomplete'
        console.log(obj);

        this.registrations.push(obj)
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
