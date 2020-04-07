<template>
  <div class="plaquePage">
    <div class='overlay'></div>
    <div class="container">
        <div class="page-content head">
          <div class="header flex-row justify-space-between">
           <div class="page-logo">
              <a  href="/dashboard">HWDYKM <span class="beta">BETA</span></a>
            </div>
            <div class="share">
              <div>
                <font-awesome-icon :icon="['fas', 'share-alt']" class="white share-ic" size="lg"/>
              </div>
                <div class="shareC">
                <div class="share_container">
                  <p class="shareT">Share</p>
                  <div class="socialIcon">
                      <a href='https://www.facebook.com/sharer/sharer.php?u=https://hwdykm.xyz' target="_blank">
                        <font-awesome-icon :icon="['fab', 'facebook-f']" class="white" size="lg"/>
                      </a>
                  </div>
                   <div class="socialIcon">
                      <a href='https://twitter.com/share?url=https://hwdykm.xyz' target="_blank">
                        <font-awesome-icon :icon="['fab', 'twitter']" class="white" size="lg"/>
                      </a>
                  </div>
                   <div class="socialIcon">
                      <a href='https://www.linkedin.com/shareArticle?mini=true&url=https://hwdykm.xyz' target="_blank">
                        <font-awesome-icon :icon="['fab', 'linkedin-in']" class="white" size="lg"/>
                      </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
       </div>
        <a class="page-body body-flex dash " href="https://hwdykm.xyz/dashboard"
         v-if="this.$route.params.username === currentUsername">
          VIEW DASHBOARD
        </a>
      <div class="body">
       <div v-if="this.$route.params.username === currentUsername"
        class="page-body-remix">
          <div v-if="plaqueData.hasOwnProperty('name')">
            <div class="plaque-header flex-row justify-space-between">
              <div class="flex-row justify-space-between pph">
                <h3 class="plaqueName">{{plaqueData.name}}</h3>
                  <p class="queCount">{{plaqueData.Questions.length}}
                    <span class="queCount">
                      {{plaqueData.Questions.length > 1 ? 'questions' : 'question'}}
                      <span>
                        {{plaqueData.Questions.length >= 5 ? '(completed)' : ''}}
                      </span>
                    </span>
                  </p>
              </div>
          </div>
          <div v-if="plaqueData.Questions.length <= 0">
            <div class="ppqueContainer">
              <p class="noQueP">
                This Plaque ({{plaqueData.name}}) currently doesn't have any questions.
                Go to your dashboard to add some questions to the plaque
              </p>
              <!-- hwdykm -->
              <ins class="adsbygoogle"
                style="display:block"
                data-ad-client="ca-pub-6604666533289792"
                data-ad-slot="5781116894"
                data-ad-format="auto"
                data-full-width-responsive="true">
              </ins>
            </div>
          </div>
          <!-- hwdykm -->
          <ins class="adsbygoogle"
            style="display:block"
            data-ad-client="ca-pub-6604666533289792"
            data-ad-slot="5781116894"
            data-ad-format="auto"
            data-full-width-responsive="true">
          </ins>
          <div v-if="plaqueData.Questions.length > 0">
            <div class="ppqueContainer">
              <div class="queHolder" v-for="question in plaqueData.Questions"
              v-bind:key="question.id">
                <div class="queListing">
                  <div class="queTitle flex-row justify-space-between">
                    <div class="flex-row justify-space-between qr">
                    <p id='questionT'>{{question.question}}</p>
                    <p class="resCount">{{question.Responses.length}}
                      <span class="resCount">
                        {{question.Responses.length > 1 ? 'responses' : 'response'}}
                      </span>
                    </p>
                    </div>
                    <div  class="showQ" v-on:click="() => toggleResponse(question.id)">
                      <div>
                        <div v-if="showResponse !== question.id">
                          <font-awesome-icon
                          :icon="['fas', 'caret-down']" class="black" size="lg"/>
                        </div>
                        <div v-if="showResponse === question.id">
                          <font-awesome-icon :icon="['fas', 'caret-up']" class="black" size="lg"/>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div v-if="showResponse === question.id " class="ownerAnswer">
                     <span class="bold-text">Your Answer: </span>
                     <span>{{ question.answer }}</span>
                  </div>
                  <div :class="showResponse === question.id ? 'responseHolder' : 'hideRes'"
                    v-for="response in question.Responses" v-bind:key="response.id"
                  >
                    <div class="resAuthor" >
                      <p>{{response.author}}</p>
                    </div>
                    <div class="resComment">
                      <p>{{response.response}}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          </div>
          <div v-if="!plaqueData.hasOwnProperty('name')">
            <div class="no-p-fl">
              <div class="np-content" v-if='!loadingSinglePlaque'>
                <p>NO PLAQUE HERE</p>
              </div>
              <div class="plaqueLoading">
                <p v-if='loadingSinglePlaque'>Loading plaque data. Please wait...</p>
            </div>
            </div>
          </div>
       </div>
        <div v-if="this.$route.params.username !== currentUsername"
        class="page-body-remix">
        <div v-if="plaqueData.hasOwnProperty('name') && hasQuestions">
          <div class="annoymous-intro">
           <p>
             Please feel free to express yourself on your answers, while answering
             <span class="white">{{this.$route.params.username.toUpperCase()}}'S</span> questions,
              because you are
             <span class="white shadow-white">Anonymous!.</span>
           </p>
         </div>
          <!-- hwdykm -->
          <ins class="adsbygoogle"
            style="display:block"
            data-ad-client="ca-pub-6604666533289792"
            data-ad-slot="5781116894"
            data-ad-format="auto"
            data-full-width-responsive="true">
          </ins>
         <div class="queToAnswer">
            <div :class="!currentQuestion ? 'queToAnswerBody' : 'queToAnswerBody slideIn'">
              <div class="queToAnswerContent" v-if="typeof currentQuestion === 'number'">
                <p class="bold-text">Question {{currentQuestion + 1}}
                  <span class="thin-text"> - out of {{plaqueData.Questions.length}} </span>
                  <span class="thin-text">
                    {{plaqueData.Questions.length > 1 ? 'questions' : 'questions'}}
                  </span>
                </p>
                <div class="qta">
                  <p class="plaqueQ">{{ plaqueData.Questions[currentQuestion].question}}</p>
                  <div v-if="showAnswer">
                    <p
                      :class="isResponseCorrect(
                        responseAnswer,
                        plaqueData.Questions[currentQuestion].answer)
                        ? 'correct answer' : 'fail answer'">
                      {{ plaqueData.Questions[currentQuestion].answer }}
                    </p>
                  </div>
                  <div class="yreply-container">
                    <form
                      method='post'
                      class="yreplyForm"
                      id='response_form'
                      name='response_form'
                      v-on:submit="(e) =>
                        submitResponse(e, plaqueData.Questions[currentQuestion].id)"
                      >
                       <input
                       type='text'
                       name='response'
                       placeholder="Your answer?"
                       v-model='responseAnswer'
                       class="txtarea"/>
                       <div class="yreplybtn">
                         <p class="text-center" v-if="submittingResponse">RESPONDING...</p>
                         <button v-if="!submittingResponse">SUBMIT</button>
                       </div>
                    </form>
                  </div>
                </div>
              </div>
              <div v-if="typeof currentQuestion === 'string'">
                <div>
                  <p class="thankyou">
                    Thank you for your response!
                  </p>
                  <div class="margin-top-1rem">
                    <p>
                      Be like
                      <span class="bold-text">
                        {{ this.$route.params.username.toUpperCase()}},
                      </span>
                      click <a :href="frontendUrl"
                      class="bold-text here">HERE</a> to create an account!
                    </p>
                      <!-- hwdykm -->
                    <ins class="adsbygoogle"
                      style="display:block"
                      data-ad-client="ca-pub-6604666533289792"
                      data-ad-slot="5781116894"
                      data-ad-format="auto"
                      data-full-width-responsive="true">
                    </ins>
                    <br />
                    <p>Already have an account?
                      <button v-on:click="() => login()" class="lgn">Login</button>
                    </p>
                  </div>
                </div>
              </div>
              <div v-if="currentQuestion === null" class="flex-center">
                <div class="loader">
                  <img src='../assets/images/loader.gif' alt='Loader'/>
                </div>
              </div>
            </div>
         </div>
        </div>
        <div v-if="!plaqueData.hasOwnProperty('name') || !hasQuestions">
          <div class="no-p-fl">
            <div class="np-content" v-if="!loadingSinglePlaque">
              <p>NO QUESTIONS IN PLAQUE</p>
            </div>
            <div class="plaqueLoading">
              <p v-if='loadingSinglePlaque'>Loading plaque data. Please wait...</p>
            </div>
          </div>
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
@import url('../assets/css/plaquePage.scss');
</style>
<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"></script>
<script>
    (adsbygoogle = window.adsbygoogle || []).push({});
</script>
<script>
import $ from 'jquery';
import Footer from '../components/Footer.vue';
import BASE_URL from '../helper/ajax';
import FE_URL from '../helper/feUrl';

export default {
  name: 'Plaque',
  components: { Footer },
  methods: {
    login() {
      return this.$router.push({ name: 'LandingPage', params: { haveAccountAlready: true } });
    },
    isResponseCorrect(friendR, quesA) {
      let friendResponse = friendR.toLowerCase().trim();
      const questionAnswer = quesA.toLowerCase();
      for (let i = 0; i <= friendResponse.length; i += 1) {
        if (friendResponse[i] === ' ') {
          friendResponse = friendResponse.split(' ');
          break;
        }
      }
      let correct = false;
      if (typeof friendResponse === 'string') {
        if (questionAnswer.match(friendResponse) !== null) {
          correct = true;
          return correct;
        }
        return correct;
      }
      for (let i = 0; i < friendResponse.length; i += 1) {
        if (questionAnswer.match(friendResponse[i]) !== null) {
          correct = true;
          break;
        }
      }
      return correct;
    },
    validateUserRoute() {
      const userParam = this.$route.params.username;
      $.ajax({
        type: 'GET',
        url: `${BASE_URL}/user/check/${userParam}`,
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem('__token__HWDYKM__user__')}`,
        },
        contentType: 'application/json',
        error() {
          window.location.href = `http://localhost:8080/user/${userParam}/NotFound`;
        },
      }).then();
    },
    toggleResponse(id) {
      this.showResponse = this.showResponse === id ? 0 : id;
    },
    getCurrentUser() {
      $.ajax({
        type: 'GET',
        url: `${BASE_URL}/user/profile`,
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem('__token__HWDYKM__user__')}`,
        },
        contentType: 'application/json',
      }).then((res) => {
        this.currentUsername = res.data.userName;
      });
    },
    getSinglePlaque() {
      this.loadingSinglePlaque = true;
      $.ajax({
        type: 'GET',
        url: `${BASE_URL}/plaque/${this.$route.params.plaqueId}`,
        contentType: 'application/json',
        error: () => {
          this.loadingSinglePlaque = false;
        },
        success: () => {
          this.loadingSinglePlaque = false;
        },
      }).then((res) => {
        this.loadingSinglePlaque = false;
        this.plaqueData = { ...res.data };
        if (this.plaqueData.Questions.length > 0) {
          this.hasQuestions = true;
        }
      });
    },
    submitResponse(e, id) {
      e.preventDefault();
      if (!this.responseAnswer) {
        return;
      }
      this.submittingResponse = true;
      let formData = $('#response_form').serializeArray();
      formData = formData.reduce((acc, curr) => {
        acc[curr.name] = curr.value.trim();
        return acc;
      }, {});
      let prevCount = '';
      this.showAnswer = true;
      $.ajax({
        type: 'POST',
        url: `${BASE_URL}/new/response/${id}`,
        data: JSON.stringify(formData),
        dataType: 'json',
        contentType: 'application/json',
        error: () => {
          this.responseAnswer = '';
        },
      }).then(() => {
        if (this.currentQuestion + 1 === this.plaqueData.Questions.length) {
          setTimeout(() => {
            this.currentQuestion = null;
            this.submittingResponse = false;
          }, 1300);
          setTimeout(() => {
            this.currentQuestion = 'finished';
            this.submittingResponse = false;
          }, 1500);
        } else {
          prevCount = this.currentQuestion;
          setTimeout(() => {
            this.currentQuestion = null;
            this.submittingResponse = false;
          }, 1200);
        }
        setTimeout(() => {
          this.showAnswer = false;
          this.responseAnswer = '';
          this.currentQuestion = prevCount + 1;
          this.submittingResponse = false;
        }, 1500);
      });
    },
  },
  async mounted() {
    this.validateUserRoute();
    if (sessionStorage.getItem('__token__HWDYKM__user__')) {
      await this.getCurrentUser();
    }
    await this.getSinglePlaque();
  },
  data() {
    return {
      currentUsername: '',
      showResponse: 0,
      frontendUrl: FE_URL,
      showAnswer: false,
      repliedData: [],
      currentQuestion: 0,
      hasQuestions: false,
      plaqueData: {},
      responseAnswer: '',
      submittingResponse: false,
      loadingSinglePlaque: false,
    };
  },
  beforeMount() {
    document.title = 'HWDYKM - Plaques';
  },
};
</script>
