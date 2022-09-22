<template>
  <div>
    <v-btn color="primary" class="ma-2" dark @click="dialog2 = true">
      Open Dialog 2
    </v-btn>
    <v-dialog v-model="dialog2" max-width="500px">
      <v-card>
        <v-card-title> Dialog 2 </v-card-title>
        <v-card-text>
          <v-select
            :items="students"
            label="Select a Student"
            item-value="id"
            item-text="cpf"
          ></v-select>
        </v-card-text>
        <v-card-actions>
          <v-btn color="primary" text @click="dialog2 = false"> Close </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  props: ['studentsIds'],
  data() {
    return {
      dialog2: false,
      students: [],
    }
  },
  mounted() {
    const studentsIdsJson = JSON.parse(JSON.stringify(this.$store.state.students.studentsIds));
    this.$axios
      .get('students', {
        params: {
          students_ids: studentsIdsJson
        }
      })
      .then((response) => {
        this.students = response.data
      })
  },
}
</script>

<style>
</style>
