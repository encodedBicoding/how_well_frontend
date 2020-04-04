<template>
  <div class="plaquePage">
    <div class='overlay'></div>
    <div class="container">
        <div class="page-content">
          <div class="header flex-row justify-space-between">
            <div class="page-logo">
              <a  href="/dashboard">HWDYKM</a>
            </div>
            <div class="share">
              <div>
                <font-awesome-icon :icon="['fas', 'paper-plane']" class="white" size="xs"/>
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
       <div v-if="this.$route.params.username === currentUsername"
        class="page-body-remix border-black">
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
            </div>
          </div>
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
                          :icon="['fas', 'caret-down']" class="black" size="xs"/>
                        </div>
                        <div v-if="showResponse === question.id">
                          <font-awesome-icon :icon="['fas', 'caret-up']" class="black" size="xs"/>
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
        class="page-body-remix border-black">
        <div v-if="plaqueData.hasOwnProperty('name') && hasQuestions">
          <div class="annoymous-intro">
           <p>
             Hello friend of
             <span class="white">{{this.$route.params.username.toUpperCase()}}</span>,
             Please feel free to express yourself on your answers, because you are
             <span class="white shadow-white">Anonymous!.</span>
           </p>
         </div>
         <div class="queToAnswer">
            <div :class="!currentQuestion ? 'queToAnswerBody' : 'queToAnswerBody slideIn'">
              <div class="queToAnswerContent" v-if="typeof currentQuestion === 'number'">
                <p class="bold-text">Question {{currentQuestion + 1}}</p>
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
    <Footer/>
  </div>
</template>
<style lang="scss">
@import url('../assets/css/plaquePage.scss');
</style>
<script>
import $ from 'jquery';
import Footer from '../components/Footer.vue';
import BASE_URL from '../helper/ajax';
import FE_URL from '../helper/feUrl';

export default {
  name: 'Plaque',
  components: { Footer },
  methods: {
    isResponseCorrect(friendR, quesA) {
      const friendResponse = friendR.toLowerCase().trim();
      const questionAnswer = quesA.toLowerCase();
      if (questionAnswer.match(friendResponse) !== null) {
        return true;
      }
      return false;
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
  mounted() {
    this.validateUserRoute();
    if (sessionStorage.getItem('__token__HWDYKM__user__')) {
      this.getCurrentUser();
    }
    this.getSinglePlaque();
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
