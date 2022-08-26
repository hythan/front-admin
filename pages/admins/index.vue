<template>
  <div>
    <v-data-table
      :headers="headers"
      :items="admins"
      item-key="name"
      class="elevation-1"
      :search="search"
      :custom-filter="filterOnlyCapsText"
    >
      <template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title>Admins</v-toolbar-title
          ><v-divider class="mx-4" inset vertical></v-divider>
          <v-spacer></v-spacer>
          <nuxt-link to="/admins/create" class="btn-create">
            <v-btn color="primary" class="mb-2"> Create Admin</v-btn>
          </nuxt-link>
        </v-toolbar>
         <v-text-field
            v-model="search"
            label="Search (UPPER CASE ONLY)"
            class="mx-4"
          ></v-text-field>
      </template>
      <template v-slot:[`item.actions`]="{ item }">
        <nuxt-link :to="{path: '/admins/edit', query: {id: item.id}}"><v-icon small class="mr-2"> mdi-pencil </v-icon></nuxt-link>
        <v-icon small @click="deleteItem(item)"> mdi-delete </v-icon>
      </template>
    </v-data-table>
  </div>
</template>

<script>
export default {
  middleware: ['auth'],
  data() {
    return {
      search: '',
      calories: '',
      admins: [],
    }
  },
  computed: {
    headers() {
      return [
        {
          text: 'Id',
          align: 'start',
          sortable: false,
          value: 'id',
        },
        {
          text: 'Name',
          value: 'name',
        },
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
        value.toString().toLocaleUpperCase().indexOf(search) !== -1
      )
    },
  },
  mounted() {
    if (!this.$auth.$storage._state['_token.local']) {
      return
    }

    this.$axios
      .get('admins', {
        headers: {
          Authorization: `${this.$auth.$storage._state['_token.local']}`,
        },
      })
      .then((response) => {
        this.admins = response.data
      })
  },
}
</script>

<style>
</style>
