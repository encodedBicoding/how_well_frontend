<template>
    <div class="footer">
      <div class="footer-body">
        <nav class="footer-nav">
          <ul class="footer-nav-list">
            <li class="fnl-item">
              <a href='#' target='_blank'>About</a>
            </li>
            <li class="fnl-item">
              <a href='#' target='_blank'>Contact</a>
            </li>
            <li class="fnl-item">
              <a href='#' target='_blank'>Terms of Use</a>
            </li>
            <li class="fnl-item">
              <a href='#' target='_blank'>Privacy Policy</a>
            </li>
          </ul>
        </nav>
        <div class="copyrights">
          <p>Copyright &copy; {{getYear()}}. Brought to you by
            <a href='https://encodedbicoding.com' target="_blank" class="ebc">encodedBicoding</a></p>
        </div>
      </div>
    </div>
</template>
<style lang="scss">
@import url('../assets/css/footer.scss');
</style>
<script>
export default {
  name: 'Footer',
  methods: {
    getYear() {
      return new Date().getFullYear();
    },
  },
};
</script>
