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
            <div class="flex_row width5">
               <div class="stb">
                 <a href='#home'>HOME</a>
              </div>
              <div class="stb">
                 <a href='https://hwdykm.xyz/about' target="_blank">ABOUT</a>
              </div>
              <div class="stb">
                 <a href='https://hwdykm.xyz/contact' target='_blank'>CONTACT</a>
              </div>
              <a class="stb" href='https://hwdykm.xyz/begin'>
                <p>REGISTER</p>
              </a>
              <a class="stb" href='https://hwdykm.xyz/begin'>
                 <p>LOG IN</p>
              </a>
              <div class="stb">
                 <a href='https://hwdykm.xyz/terms' target="_blank">TERMS</a>
              </div>
            </div>
          </nav>
          <div class="start_intro">
            <div class='flex-no-center'>
              <div id='text'>
              <div class="text-data">
                <p>HOW WELL DOES YOUR FAMILY, FRIENDS AND COLLEAGUES KNOW YOU?</p>
                <a class="create_btn" href='https://hwdykm.xyz/begin'>
                  <p>CREATE AN ACCOUNT TO FIND OUT</p>
                </a>
              </div>
              <div class="btf">
                <p id='btfH'>Built for:</p>
                <p class="btf_d">
                   Home, Family, Offices, Colleagues,
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
    <div class="bodds container">
      <div class="alt_bodds">
        <div class="wuC title">
          <h2>Why use HWDYKM?</h2>
          <p class="clip">Our Anonymous Messaging App comes along with many great features.
            Here we are going to list some of them. Have a look below.</p>
        </div>
        <!-- Cards one-->
        <div class="row">
          <div class="col-md-6 col-lg-3">
            <div class="item">
              <div class="font">
              <font-awesome-icon :icon="['fas', 'star']"  class='white' id="align" size="lg"/>
              </div>
              <h4>Anonymity</h4>
              <p>Our Platform ensures your privacy so that you stay anonymous everytime
                you send someone a secret message. You are anonymous until you ever choose
                to reveal your identity.</p>
            </div>
          </div>

          <div class="col-md-6 col-lg-3">
            <div class="item">
              <div class="font">
                <font-awesome-icon :icon="['fas', 'star']"  class='white' id="align" size="lg"/>
              </div>
              <h4>Anonymity</h4>
              <p>Our Platform ensures your privacy so that you stay anonymous everytime
                you send someone a secret message. You are anonymous until you ever choose
                to reveal your identity.</p>
            </div>
          </div>

          <div class="col-md-6 col-lg-3">
            <div class="item">
              <div class="font">
              <font-awesome-icon :icon="['fas', 'star']"  class='white' id="align" size="lg"/>
              </div>
              <h4>Anonymity</h4>
              <p>Our Platform ensures your privacy so that you stay anonymous everytime
                you send someone a secret message. You are anonymous until you ever choose
                to reveal your identity.</p>
            </div>
          </div>

          <div class="col-md-6 col-lg-3">
            <div class="item">
              <div class="font">
              <font-awesome-icon :icon="['fas', 'star']"  class='white' id="align" size="lg"/>
              </div>
              <h4>Anonymity</h4>
              <p>Our Platform ensures your privacy so that you stay anonymous everytime
                you send someone a secret message. You are anonymous until you ever choose
                to reveal your identity.</p>
            </div>
          </div>
        </div>
        <!-- End of card 1 -->
          <div class="wuC title content">
          <h2>App Screenshot</h2>
          <p class="clip">Out of all other Anonymous Messaging and Anonymous Feedback apps
            our User Interface is much easier to use. Have a quick look.</p>
        </div>
        <!-- Card 2 -->
          <div class="row">
            <div id='image' class="col-md-6 col-lg-3">
              <img src='../assets/images/phone4.png'
                alt='anonymous messages received by user'
                width='100%' height="auto"/>
            </div>
            <div id='image' class="col-md-6 col-lg-3">
              <img src='../assets/images/phone3.png'
                alt='anonymous messages received by user'
                width='100%' height="auto"/>
            </div>
            <div id='image' class="col-md-6 col-lg-3">
              <img src='../assets/images/phone6.png'
                alt='anonymous messages received by user'
                width='100%' height="auto"/>
            </div>
            <div id='image' class="col-md-6 col-lg-3">
              <img src='../assets/images/phone5.png'
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

  <footer class="footer">
<Footer/>
  </footer>
</div>
</template>

<script>
import Footer from '../components/Footer.vue';

export default {
  name: 'Start',
  components: { Footer },
};
</script>

<style lang="scss">
@import url('../assets/css/start.scss');
</style>
