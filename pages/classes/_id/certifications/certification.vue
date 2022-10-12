<template>
  <div class="container">
    <div class="certification-body">
      <div class="marquee">Certificate of Completion</div>

      <div class="assignment">This certificate is presented to</div>

      <div class="person">Student Name</div>

      <div class="reason">
        For deftly defying the laws of gravity<br />
        and flying high
      </div>
      <div class="row">
        <div class="teacher-assignment">Teacher Name</div>
        <div class="organization-assignment">Organization</div>
      </div>
    </div>
  </div>
</template>
<style scoped>
.container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: 20px solid #b9e85c;
  border-radius: 5px;
  width: 750px;
  height: 563px;
  background: url('~/assets/imgs/maxi-logo.png');
  background-position: center;
  background-repeat: no-repeat;
  opacity: 0.8;
}

.certification-body {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.marquee {
  color: black;
  font-size: 48px;
  margin: 20px;
  font-weight: bold;
}

.assignment {
  font-size: 20px;
  font-weight: 500;
  margin: 20px;
}

.person {
  border-bottom: 2px solid black;
  font-size: 32px;
  font-style: italic;
  font-weight: 600;
  margin: 20px auto;
}

.reason {
  font-size: 20px;
  font-weight: 500;
  margin: 20px;
}

.row {
  margin-top: 80px;
  display: flex;
  width: 500px;
  justify-content: space-between;
}

.teacher-assignment,
.organization-assignment {
  border-bottom: 2px solid black;
  font-weight: 700;
}
</style>
