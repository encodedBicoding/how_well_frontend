<template>
  <div class="contact-us">
    <div class='overlay'></div>
    <div class="container page-flex">
      <div class="page-content head">
        <div class="header flex-row justify-space-between">
          <div class="page-logo">
              <a  href="/dashboard">HWDYKM <span class="beta">BETA</span></a>
            </div>
          <div class="share">
            <div class="content-name">
              <span>CONTACT US</span>
            </div>
          </div>
        </div>
      </div>
      <div class='body'>
        <div class="content-body">
        <div class="content-paragraph">
          <p>
            Feel free to contact us on <b>hwdykm2me@gmail.com</b>
          </p>
        </div>
      </div>
      </div>
      <div class="footer">
        <Footer/>
      </div>
    </div>
  </div>
</template>
<style lang="scss">
@import url('../assets/css/about.scss');
</style>
<script>
import Footer from '../components/Footer.vue';

export default {
  name: 'Contact',
  components: { Footer },
  beforeMount() {
    document.title = 'HWDYKM - Contact';
  },
};
</script>
