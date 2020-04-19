<template>
<div class="begin_start">
  <div class="starts" id='starts'>
    <div class="main">
      <div class="headers" id='home'>
        <div class="headings" id='headings'>
          <nav class="flex_row nav-pad">
            <div class="grow1 hLogo">
              <p>HWDYKM</p>
            </div>
            <nav class="mobile">
              <div class="barss">
                <div v-if="!showMobilenav">
                  <font-awesome-icon :icon="['fas', 'bars']"
                    class='white'
                    v-on:click="() => toggleMobileNav()"
                    id='barrs'
                    size="2x"/>
                </div>
                <div v-if="showMobilenav">
                  <font-awesome-icon :icon="['fas', 'times']"
                    class='white'
                    id='barrs'
                    v-on:click="() => toggleMobileNav()"
                    size="2x"/>
                </div>
                <div :class="!showMobilenav ? 'dsnone' : 'nav-toggle-cont'">
                  <div class="nav-toggle-disp">
                    <div class="mobile-nav-item">
                      <a href='/'>HOME</a>
                    </div>
                    <div class="mobile-nav-item"
                    v-on:click="() => this.$router.push({name: 'About'})"
                    >
                      <p>ABOUT</p>
                    </div>
                    <div class="mobile-nav-item"
                    v-on:click="() => this.$router.push({name: 'Contact'})"
                    >
                      <p>CONTACT</p>
                    </div>
                    <div class="mobile-nav-item"
                       v-on:click="() => this.$router.push({name: 'LandingPage'})">
                      <p>REGISTER</p>
                    </div>
                    <div class="mobile-nav-item"
                      v-on:click="() => this.$router.push({
                        name: 'LandingPage',
                        params: {haveAccountAlready: true}})">
                      <p>LOGIN</p>
                    </div>
                    <div class="mobile-nav-item"
                      v-on:click="() => this.$router.push({name: 'Terms'})"
                    >
                      <p>TERMS</p>
                    </div>
                  </div>
                </div>
              </div>
            </nav>
            <div class="flex_row width5 comp">
               <div class="stb">
                 <a href='#home'>HOME</a>
              </div>
              <div class="stb"
                v-on:click="() => this.$router.push({name: 'About'})"
              >
                 <p>ABOUT</p>
              </div>
              <div class="stb"
                v-on:click="() => this.$router.push({name: 'Contact'})"
              >
                 <p>CONTACT</p>
              </div>
              <div class="stb"
                  v-on:click="() => this.$router.push({name: 'LandingPage'})">
                <p>REGISTER</p>
              </div>
              <div class="stb"
                v-on:click="() => this.$router.push({
                  name: 'LandingPage',
                  params: {haveAccountAlready: true}})">
                <p>LOGIN</p>
              </div>
              <div class="stb"
              v-on:click="() => this.$router.push({name: 'Terms'})"
              >
                 <p>TERMS</p>
              </div>
            </div>
          </nav>
          <div class="start_intro">
            <div class='flex-no-center'>
              <div id='text'>
              <div class="text-data">
                <p id='tdH'>DO YOU TEACH?</p>
                <p id='tdH'>DO YOU NEED FEEDBACK?</p>
                <p id='tdH'>DO YOU NEED ANONYMOUS RESPONSES TO YOUR QUESTIONS?</p>
                <p id='tdH'>WE GOT YOU COVERED!</p>
                <div class="create_btn"
                  v-on:click="() => this.$router.push({name: 'LandingPage'})"
                  >
                  <p>GET STARTED</p>
                </div>
              </div>
              <div class="btf">
                <p id='btfH'>Built for:</p>
                <p class="btf_d">
                   Schools, Home, Family, Offices, Colleagues, Tutors
                   Classmates, Friends,
                   Husbands, Wives, Spouse,
                   Neighbours and <b class="evr">Everyone.</b>
                </p>
              </div>
            </div>

            <div id='image'>
              <img src='../assets/images/phone2.png'
                alt='anonymous messages received by user'
                width='100%' height="auto"/>
            </div>
            </div>
            <div class='more_dwn jump'>
              <font-awesome-icon :icon="['fas', 'angle-double-down']"  class='white' size="xs"/>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
    <div class="bodds containers">
      <div class="alt_bodds">
        <div class="wuC title">
          <h2>Why use HWDYKM?</h2>
          <p class="clip">Our App is not just An Anonymous Messaging App,
            you can also use this platform to teach people in a Q & A answer session, for FREE
          </p>
        </div>
        <!-- Cards one-->
        <div class="row cards-row">
          <div class="col-md-6 col-lg-3">
            <div class="item">
              <div class="font">
                <font-awesome-icon :icon="['fas', 'star']"  class='white' id="align" size="lg"/>
              </div>
              <h4 class="item-end">Channel Your Responses</h4>
              <p class="itt">We understand that you have
                some questions you would like to ask that loved one
                to know if they know you well or not. With our
                <b>Plaque</b> system, you have the ability to
                channel the kind of response and feedback you get per plaque.
              </p>
            </div>
          </div>

          <div class="col-md-6 col-lg-3">
            <div class="item">
              <div class="font">
                <font-awesome-icon :icon="['fas', 'theater-masks']"
                class='white' id="align" size="lg"/>
              </div>
              <h4 class="item-end">Anonymity</h4>
              <p class="itt">You can choose to be anonymous while responding to questions
                from a friend or family, or choose not to. The platform gives you the ability to
                express free will over your identity.
              </p>
            </div>
          </div>

          <div class="col-md-6 col-lg-3">
            <div class="item">
              <div class="font">
              <font-awesome-icon :icon="['fas', 'smile-wink']"  class='white' id="align" size="lg"/>
              </div>
              <h4 class="item-end">Easy To Use</h4>
              <p class="itt">Our core focus has and always will be the ease of use.
                This has lead to the aquiring of technology experts in user interface and design
                to be a part of our team. Let us simply put...
                Our App is Easy To Use
              </p>
            </div>
          </div>
        </div>
        <!-- End of card 1 -->
          <div class="wuC title content">
          <h2>App Screenshot</h2>
          <p class="clip">Out of all other Anonymous Messaging and Anonymous Feedback apps,
            our app provides a clean User Interface. Check out these screenshots</p>
        </div>
        <!-- Card 2 -->
          <div class="row">
            <div id='image' class="col-md-6 col-lg-3">
              <img src='../assets/images/phone4.png'
                alt='anonymous messages received by user'
                width='100%' height="auto"/>
            </div>
            <div id='image' class="col-md-6 col-lg-3">
              <img src='../assets/images/phone6.png'
                alt='anonymous messages received by user'
                width='100%' height="auto"/>
            </div>
            <div id='image' class="col-md-6 col-lg-3">
              <img src='../assets/images/pg2.png'
                alt='anonymous messages received by user'
                width='100%' height="auto"/>
            </div>
        </div>
        <!-- End of card 2 -->
      </div>
    </div>
    <a class="goBack" href="#starts">
        <div>
          <font-awesome-icon :icon="['fas', 'house-user']"  class='white' size="lg"/>
        </div>
    </a>

  <footer class="footerr">
      <Footer/>
  </footer>
</div>
</template>


<script>
import Footer from '../components/Footer.vue';

export default {
  name: 'Start',
  components: { Footer },
  methods: {
    toggleMobileNav() {
      this.showMobilenav = !this.showMobilenav;
    },
  },
  data() {
    return {
      showMobilenav: false,
    };
  },
};
</script>

<style lang="scss">
@import url('../assets/css/start.scss');
</style>
