<template>
    <div class="landingPage">
      <div class='overlay'></div>
      <div class="start">
        <div class="intro-text">
          <div class="intro-flex">
            <p class="rw-text" v-if="!haveAccount">
              Create a FREE account!
            </p>
            <p class="rw-text" v-if="haveAccount">
              Welcome Back! <br />
            </p>
          </div>
        </div>
        <div class="logo">
          <span>H</span>
          <span>W</span>
          <span>D</span>
          <span>Y</span>
          <span>K</span>
          <span>M</span>
        </div>
        <div class="intro">
          <form
            v-if="!haveAccount"
            class="register"
            method="POST"
            name='register'
            id='register'
            v-on:submit="(e) => register(e)"
          >
            <div class="form-input">
              <input
                type='text'
                name='userName'
                v-model="RegUsernameData"
                placeholder="Username">
            </div>
            <div class="form-input">
              <input
              type='email'
              name='email'
              v-model="RegEmailData"
              placeholder="Email">
            </div>
            <div class="form-input">
              <input
              :type="this.showPass ? 'text' :'password'"
              name='password'
              v-model="RegPasswordData"
              placeholder="******">
               <div class="password-icon" v-on:click="() => this.togglePassword()">
                <div v-if="!this.showPass">
                  <font-awesome-icon
                  :icon="['fas', 'eye-slash']" class="black" size="lg"/>
                </div>
                <div v-if="this.showPass">
                  <font-awesome-icon :icon="['fas', 'eye']" class="black" size="lg"/>
                </div>
              </div>
            </div>
             <div class="form-submit">
              <button>{{isRequesting ? 'LOADING...' : 'REGISTER'}}</button>
            </div>
        </form>
        <form
          v-if="haveAccount"
          class="login"
          name='login'
          id='login'
          method="POST"
          v-on:submit="(e) => login(e)"
          >
            <div class="form-input">
              <input
              type='text'
              name='userName'
              v-model='LogUsernameData'
              placeholder="Username">
            </div>
            <div class="form-input">
              <input
                :type="this.showPass ? 'text' :'password'"
                name='password'
                v-model="LogPasswordData"
                placeholder="******">
               <div class="password-icon" v-on:click="() => this.togglePassword()">
                <div v-if="!this.showPass">
                  <font-awesome-icon
                  :icon="['fas', 'eye-slash']" class="black" size="lg"/>
                </div>
                <div v-if="this.showPass">
                  <font-awesome-icon :icon="['fas', 'eye']" class="black" size="lg"/>
                </div>
              </div>
            </div>
             <div class="form-submit">
              <button>{{isRequesting ? 'LOADING...' : 'LOGIN'}}</button>
            </div>
        </form>
        </div>
        <div class="turbo">
          <p v-if="!haveAccount">Already have an account?
            <a v-on:click="() => this.turbo('login')">Log In</a>
          </p>
          <p v-if="haveAccount">Don't have an account?
            <a v-on:click="() => this.turbo('register')">Register</a>
          </p>
          <p v-if="haveAccount" class="resetpas"> Forgot your password?
            <a href='https://hwdykm.xyz/rp/reset/HN_jkdjw_322'>Reset Password</a>
          </p>
        </div>
        <div class="licence">
          <p>By creating an account,
            you agree to our <a href='/terms' class="Lterms">Terms of use</a></p>
        </div>
      </div>
    </div>
</template>
<style lang="scss">
  @import url('../assets/css/landingPage.scss');
</style>
<script>
import $ from 'jquery';
import BASE_URL from '../helper/ajax';

export default {
  name: 'LandingPage',
  data() {
    return {
      haveAccount: false,
      formPage: 'register',
      showPass: false,
      isRequesting: false,
      RegUsernameData: '',
      RegPasswordData: '',
      RegEmailData: '',
      LogUsernameData: '',
      LogPasswordData: '',
      errorData: '',
    };
  },
  mounted() {
    this.haveAccount = this.$route.params.haveAccountAlready || false;
  },
  beforeMount() {
    document.title = 'Welcome - HWDYKM || Anonymous responses to your desired questions';
  },
  methods: {
    turbo(page) {
      this.formPage = page;
      this.haveAccount = !this.haveAccount;
    },
    togglePassword() {
      this.showPass = !this.showPass;
    },
    register(e) {
      e.preventDefault();
      if (
        !this.RegUsernameData
        || !this.RegPasswordData
        || !this.RegEmailData
      ) {
        return;
      }
      this.isRequesting = true;
      let formData = $('#register').serializeArray();
      formData = formData.reduce((acc, curr) => {
        acc[curr.name] = curr.value;
        return acc;
      }, {});
      $.ajax({
        type: 'POST',
        url: `${BASE_URL}/register`,
        data: JSON.stringify(formData),
        dataType: 'json',
        contentType: 'application/json',
        error: (req) => {
          const errorResponse = req.responseText;
          this.isRequesting = false;
          this.showRegError = true;
          if (JSON.parse(errorResponse).error) {
            this.errorData = JSON.parse(errorResponse).error;
            this.$swal({
              icon: 'error',
              title: 'Oops...',
              html: `<h4>${this.errorData}</h4>`,
            });
          } else {
            this.errorData = JSON.parse(errorResponse).errors;
            this.$swal({
              icon: 'error',
              title: 'Oops...',
              html: `
                <ul>
                  ${this.errorData.map((error) => `<li>${error.msg}</li>`)}
                </ul>
              `,
            });
          }
          setTimeout(() => {
            this.showRegError = false;
            this.errorData = '';
          }, 4000);
        },
      }).then((data) => {
        this.isRequesting = false;
        localStorage.setItem('api__hwdykm_inkR',
          data.token.split('').splice(0, 34).reverse().join(''));
        localStorage.setItem('__api__token__howzy',
          data.token.split('').splice(2, 34).reverse().join(''));
        localStorage.setItem('api__hwdykm_inkR',
          data.token.split('').splice(4, data.token.length).reverse().join(''));
        sessionStorage.setItem('__hwdykm_inkR',
          data.token.split('').splice(10, 34).reverse().join(''));
        sessionStorage.setItem('api__hwdykm_inkR',
          data.token.split('').splice(0, 34).reverse().join(''));
        sessionStorage.setItem('__api__token__howzy',
          data.token.split('').splice(2, 34).reverse().join(''));
        sessionStorage.setItem('api__hwdykm_inkR',
          data.token.split('').splice(4, data.token.length).reverse().join(''));
        sessionStorage.setItem('__token__HWDYKM__user__', data.token);
        localStorage.setItem('__user__', data.user.userName);
        this.$router.push({ name: 'Dashboard' });
      });
    },
    login(e) {
      e.preventDefault();
      if (
        !this.LogUsernameData
        || !this.LogPasswordData
        || !!this.LogEmailData
      ) {
        return;
      }
      this.isRequesting = true;
      let formData = $('#login').serializeArray();
      formData = formData.reduce((acc, curr) => {
        acc[curr.name] = curr.value;
        return acc;
      }, {});
      $.ajax({
        type: 'POST',
        url: `${BASE_URL}/login`,
        data: JSON.stringify(formData),
        dataType: 'json',
        contentType: 'application/json',
        error: (res) => {
          const errorResponse = res.responseText;
          this.isRequesting = false;
          if (JSON.parse(errorResponse).error) {
            this.errorData = JSON.parse(errorResponse).error;
            this.$swal({
              icon: 'error',
              title: 'Oops...',
              html: `<h4>${this.errorData}</h4>`,
            });
          } else {
            this.errorData = JSON.parse(errorResponse).errors;
            this.$swal({
              icon: 'error',
              title: 'Oops...',
              html: `
                <ul>
                  ${this.errorData.map((error) => `<li>${error.msg}</li>`)}
                </ul>
              `,
            });
          }

          setTimeout(() => {
            this.showLogError = false;
            this.errorData = '';
          }, 4000);
        },
      }).then((data) => {
        this.isRequesting = false;
        localStorage.setItem('__hwdykm_inkR',
          data.token.split('').splice(10, 34).reverse().join(''));
        localStorage.setItem('api__hwdykm_inkR',
          data.token.split('').splice(0, 34).reverse().join(''));
        localStorage.setItem('__api__token__howzy',
          data.token.split('').splice(2, 34).reverse().join(''));
        localStorage.setItem('api__hwdykm_inkR',
          data.token.split('').splice(4, data.token.length).reverse().join(''));
        sessionStorage.setItem('__hwdykm_inkR',
          data.token.split('').splice(10, 34).reverse().join(''));
        sessionStorage.setItem('api__hwdykm_inkR',
          data.token.split('').splice(0, 34).reverse().join(''));
        sessionStorage.setItem('__api__token__howzy',
          data.token.split('').splice(2, 34).reverse().join(''));
        sessionStorage.setItem('api__hwdykm_inkR',
          data.token.split('').splice(4, data.token.length).reverse().join(''));
        sessionStorage.setItem('__token__HWDYKM__user__', data.token);
        localStorage.setItem('__user__', data.data.userName);
        this.$router.push({ name: 'Dashboard' });
      });
    },
  },
};
</script>
