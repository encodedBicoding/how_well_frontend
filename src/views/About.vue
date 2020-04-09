<template>
  <div class="about-us">
    <div class='overlay'></div>
    <div class="container page-flex">
      <div class="page-content head">
        <div class="header flex-row justify-space-between">
            <div class="page-logo">
              <a  href="/dashboard">HWDYKM <span class="beta">BETA</span></a>
            </div>
          <div class="share">
            <div class="content-name">
              <span>ABOUT US</span>
            </div>
          </div>
        </div>
      </div>
      <div class="body">
        <div class="content-body">
        <div class="content-paragraph">
          <p>
            How Well Do You Know Me (HWDYKM) is an anonymous messaging platform, but unlike
            any other anonymous messaging platforms, we have created our algorithms to
            be more engaging.
          </p>
          <br/>
          <h3>Why HWDYKM(How Well Do you Know Me)?</h3>
          <p>
            We understand that people have certain questions in their hearts about themselves,
            and deep down within them, they would like to know what responses people have to such
            questions.
          </p>
          <p>So, we created a service that will help them know exactly what people think about them,
            and how well their friends and fammilies know them.
          </p>
          <br/>
          <h3 style="padding-left: 1.3rem;">How Does It Work</h3>
          <ol style="padding: 2rem;">
            <li style="margin-bottom: .6rem;">Create an account. Click
              <a href='https://hwdykm.xyz'
                target='_blank'
                class="lime" style="text-decoration: none; font-weight: 700">HERE</a></li>
            <li style="margin-bottom: .6rem;">Create a Plaque
              <h4 style="margin-top: .6rem;">What is a plaque</h4>
              <p>
                A plaque according to us at ( HWDYKM ) is a form that contains
                the questions you
                desire answers to. In other words, you need to create a plaque so that
                you can create questions.
              </p>
              <h4 style="margin-top: .6rem;">More details about a plaque</h4>
              <ul>
                <li>A plaque can contain only 5 questions</li>
                <li>Every plaque has a shareable link, you are to share this link
                  with your friends</li>
              </ul>
            </li>
            <li style="margin-bottom: .6rem;">
              Create Questions in a plaque
            </li>
            <li style="margin-bottom: .6rem;">Get shareable link and share with your friends</li>
          </ol>
        </div>
      </div>
        <div class="footer">
        <Footer/>
      </div>
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
  name: 'About',
  components: { Footer },
  beforeMount() {
    document.title = 'HWDYKM - About';
  },
};
</script>
