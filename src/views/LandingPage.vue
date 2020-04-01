<template>
    <div class="landingPage">
      <div class='overlay'></div>
      <div class="start">
        <div class="intro-text">
          <p class="rw-text" v-if="!haveAccount">
            Hi there, I'm sure you are as curious as I am to find out how well people know about you
            and what exactly they know.
            Well, here is your chance to find out!
          </p>
           <p class="rw-text" v-if="haveAccount">
            Welcome, Back! <br />
            Ready to view what people think about you and how well they know you?
          </p>
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
          <form v-if="!haveAccount" class="register" method="POST" type='multipart/form-data'>
            <div class="form-input">
              <input type='text' name='userName' placeholder="Username">
            </div>
            <div class="form-input">
              <input type='email' name='email' placeholder="Email">
            </div>
            <div class="form-input">
              <input
              :type="this.showPass ? 'text' :'password'" name='password' placeholder="******">
               <div class="password-icon" v-on:click="() => this.togglePassword()">
                <div v-if="!this.showPass">
                  <font-awesome-icon
                  :icon="['fas', 'eye']" class="black" size="xs"/>
                </div>
                <div v-if="this.showPass">
                  <font-awesome-icon :icon="['fas', 'eye-slash']" class="black" size="xs"/>
                </div>
              </div>
            </div>
             <div class="form-submit">
              <button>REGISTER</button>
            </div>
        </form>
        <form v-if="haveAccount" class="login">
            <div class="form-input">
              <input type='text' name='userName' placeholder="Username">
            </div>
            <div class="form-input">
              <input
              :type="this.showPass ? 'text' :'password'" name='password' placeholder="******">
               <div class="password-icon" v-on:click="() => this.togglePassword()">
                <div v-if="!this.showPass">
                  <font-awesome-icon
                  :icon="['fas', 'eye']" class="black" size="xs"/>
                </div>
                <div v-if="this.showPass">
                  <font-awesome-icon :icon="['fas', 'eye-slash']" class="black" size="xs"/>
                </div>
              </div>
            </div>
             <div class="form-submit">
              <button>LOGIN</button>
            </div>
        </form>
        </div>
        <div class="turbo">
          <p v-if="!haveAccount">Already have an account?
            <a v-on:click="() => this.turbo()">Log In</a>
          </p>
          <p v-if="haveAccount">Don't have an account?
            <a v-on:click="() => this.turbo()">Register</a>
          </p>
        </div>
        <div class="licence">
          <p>By creating an account, you agree to our terms of use</p>
        </div>
      </div>
    </div>
</template>
<style lang="scss">
  @import url('../assets/css/landingPage.scss');
</style>
<script>
export default {
  name: 'LandingPage',
  data() {
    return {
      haveAccount: false,
      showPass: false,
    };
  },
  methods: {
    turbo() {
      this.haveAccount = !this.haveAccount;
    },
    togglePassword() {
      this.showPass = !this.showPass;
    },
  },
};
</script>
