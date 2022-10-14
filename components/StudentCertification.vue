<template>
  <v--pdf
    v-if="certification"
    :show-layout="false"
    :float-layout="true"
    :enable-download="true"
    :preview-modal="true"
    :paginate-elements-by-height="1400"
    filename="myPDF"
    :pdf-quality="2"
    :manual-pagination="false"
    pdf-format="a4"
    pdf-orientation="landscape"
    pdf-content-width="750px"
    :ref="`html2Pdf${certification.id}`"
  >
    <section slot="pdf-content">
      <div class="container">
        <div class="certification-body">
          <div class="marquee">Certificado de Conclusão</div>

          <div class="assignment">Este certificado é entregue à</div>

          <div class="person">{{ certification.student.name }}</div>

          <div class="reason">
            Por concluir o treinamento {{ certification.course.name }}<br />
            com total de {{ certification.course.duration }} horas em
            {{ certification.createAt }}
          </div>
          <div class="row">
            <div class="teacher-assignment">
              {{ certification.teacherName }}
            </div>
            <div class="organization-assignment">
              Maxiambiental Treinamentos
            </div>
          </div>
        </div>
      </div>
    </section>
  </v--pdf>
</template>
<script>
export default {
  props: ['certification'],
  created() {
    this.$nuxt.$on('generateCertification', ($event) => {
      if (!this.$refs[`html2Pdf${$event}`]) {
        return
      }

      this.$refs[`html2Pdf${$event}`].generatePdf()
    })
  },
}
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: 20px solid #b9e85c;
  border-radius: 5px;
  width: 1120px;
  height: 790px;
  background: url('~/assets/imgs/maxi-logo.png');
  background-position: center;
  background-repeat: no-repeat;
  opacity: 0.7;
}

.certification-body {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.marquee {
  color: black;
  font-size: 58px;
  margin: 20px;
  font-weight: bold;
}

.assignment {
  font-size: 30px;
  font-weight: 500;
  margin: 20px;
}

.person {
  border-bottom: 2px solid black;
  font-size: 42px;
  font-style: italic;
  font-weight: 600;
  margin: 20px auto;
}

.reason {
  font-size: 30px;
  font-weight: 500;
  margin: 20px;
}

.row {
  margin-top: 120px;
  display: flex;
  width: 650px;
  justify-content: space-between;
}

.teacher-assignment,
.organization-assignment {
  border-bottom: 2px solid black;
  font-weight: 700;
}
</style>
