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
          <v-toolbar-title>{{className}}</v-toolbar-title
          ><v-divider class="mx-4" inset vertical></v-divider>
          <v-spacer></v-spacer>
          <nuxt-link :to="{ path: `/classes/${$route.params.id}/registrations/create` }" class="btn-create">
            <v-btn color="primary" class="mb-2">Create Registration</v-btn>
          </nuxt-link>
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
    approveRegistration(id) {
      Swal.fire({
        title: 'Are you sure to mark this registration as COMPLETE?',
        confirmButtonText: 'Update',
        showCancelButton: true,
      }).then((result) => {
        if (!result.value) {
          return
        }
        this.updateRegistrationStatus(id, true)
      })
    },
    cancelRegistration(id) {
      Swal.fire({
        title: 'Are you sure to mark this registration as INCOMPLETE?',
        confirmButtonText: 'Update',
        showCancelButton: true,
      }).then((result) => {
        if (!result.value) {
          return
        }
        this.updateRegistrationStatus(id, false)
      })
    },
    updateRegistrationStatus(id, status) {
      this.$axios
        .patch(`registrations/${id}`, { complete: status })
        .then(() => {
          Swal.fire('Status was updated!', '', 'success')
          this.getOrUpdateClassesList()
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
          this.className = response.data.name;
          this.registrations = [];
          this.setClassListDatas(response.data.registrations);
        })
    },

    setClassListDatas(registrations) {
      registrations.forEach((element) => {
        let objAux = {
          id: '',
          name: '',
          status: '',
        }
        objAux.id = element.id
        objAux.name = element.student.name
        objAux.status = element.complete ? 'Complete' : 'Incomplete'
        this.registrations.push(objAux)
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
