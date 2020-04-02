<template>
  <div class="not-founc">
    <div class='overlay'></div>
    <div class="container page-flex">
      <div class="page-content">
        <div class="header flex-row justify-space-between">
          <div class="page-logo">
            <a  href="/dashboard">HWDYKM</a>
          </div>
          <div class="share">
            <div class="content-name">
              <span>404</span>
            </div>
          </div>
        </div>
      </div>
      <div class="content-body">
        <div class="content-paragraph content-flex-center">
          <div class="oops">
            <p>404</p>
          </div>
          <div class="nfc">
            <p>
              Page not found
            </p>
          </div>
        </div>
      </div>
    </div>
    <Footer/>
  </div>
</template>
<style lang="scss">
@import url('../assets/css/about.scss');
</style>
<script>
import Footer from '../components/Footer.vue';

export default {
  name: 'NotFound',
  components: { Footer },
  beforeMount() {
    document.title = 'HWDYKM - Page not found';
  },
};
</script>
