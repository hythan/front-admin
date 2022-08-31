<template>
  <div>
      <div class="text-center">
        <validation-observer ref="login_form">
          <b-form method="post" @submit="onSubmit" class="login-form card card-md">
            <div class="card-body">
              <h2 class="card-title mb-4">Login Admin</h2>
              <validation-provider
                name="Email"
                rules="required|email"
                v-slot="validationContext"
                tag="div"
              >
                <b-form-group
                  id="email"
                  label="Email:"
                  label-for="input-email"
                  label-align="left"
                >
                  <b-form-input
                    name="email"
                    id="input-email"
                    v-model="form.email"
                    type="email"
                    placeholder="example@example.com"
                    :state="validateInputRules(validationContext)"
                  />
                  <span class="vee-errors">{{
                    validationContext.errors[0]
                  }}</span>
                </b-form-group>
              </validation-provider>
              <validation-provider
                name="Password"
                rules="required"
                v-slot="validationContext"
              >
                <b-form-group
                  id="password"
                  label="Password:"
                  label-for="input-password"
                  label-align="left"
                >
                  <b-form-input
                    id="input-password"
                    v-model="form.password"
                    placeholder="**********"
                    type="password"
                    :state="validateInputRules(validationContext)"
                  />
                  <span class="vee-errors">{{
                    validationContext.errors[0]
                  }}</span>
                </b-form-group>
              </validation-provider>
              <b-button class="login-button" type="submit" variant="primary">
                Login
              </b-button>
            </div>
          </b-form>
        </validation-observer>
      </div>
    </div>
</template>

<script>
export default {
  layout: 'login',
  data() {
    return {
      form: {
        email: '',
        password: '',
      },
    }
  },
  created: function () {
    if(this.$auth.loggedIn){
      this.$router.push('/')
    }
  },
  methods: {
    onSubmit: async function (e) {
      e.preventDefault()
      const isValid = await this.$refs.login_form.validate()
      if (!isValid) {
        return
      }

      try {
        const response = await this.$auth.loginWith('local', {
          data: {
            email: this.form.email,
            password: this.form.password,
          },
        })
      } catch (error) {
        console.log(error)
      }
    },
    validateInputRules: function (context) {
      if (context.validated) {
        return context.valid
      }

      return null
    },
  },
}
</script>

<style>
.vee-errors {
  color: red;
  font-size: 12px;
}

.login-form {
  display: block;
  margin: auto;
  margin-top: 200px;
  width: 450px;
}

.login-form h1 {
  margin-top: 20px;
  text-align: center;
}

.login-button {
  display: block;
  margin-right: auto;
  margin-left: auto;
}

</style>
