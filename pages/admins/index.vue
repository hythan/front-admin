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
      <h2 class="text-center">Admins</h2>
        <v-text-field
          v-model="search"
          label="Search (UPPER CASE ONLY)"
          class="mx-4"
        ></v-text-field>
      </template>
    </v-data-table>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        search: '',
        calories: '',
        admins: [],
      }
    },
    computed: {
      headers () {
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
        ]
      },
    },
    methods: {
      filterOnlyCapsText (value, search, item) {
        return value != null &&
          search != null &&
          typeof value === 'string' &&
          value.toString().toLocaleUpperCase().indexOf(search) !== -1
      },
    },
    mounted() {
      console.log(this.$auth.user);
    // this.$axios.get('admins',{},{ headers: {
    //    'Authorization': `Bearer Token ${this.$auth.user}`
    // }}).then((response) => {
    //   console.log(response);
    //   // this.$store.commit('getUsers', users)
    //   // this.loading = false
    // })
  },
  }
</script>

<style>
</style>
