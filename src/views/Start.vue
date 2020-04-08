<template>
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
      <div class="bodds">
        <div class="alt_bodds">
          <div class="wuC">
            <h3 class="wuT">Why use HWDYKM?</h3>
          </div>
        </div>
      </div>
    </div>
      <a class="goBack" href="#starts">
        <div>
          <font-awesome-icon :icon="['fas', 'house-user']"  class='white' size="lg"/>
        </div>
    </a>
  </div>
</template>
<style lang="scss">
@import url('../assets/css/start.scss');
</style>
<script>
export default {
  name: 'Start',
};
</script>
