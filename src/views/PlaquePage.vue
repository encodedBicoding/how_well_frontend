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
              <div style="display: none">

              </div>
            </div>
          </div>
       </div>
       <div v-if="this.$route.params.username === currentUsername"
        class="page-body-remix border-black">
          <div v-if="plaqueData.hasOwnProperty('name')">
            <div class="plaque-header flex-row justify-space-between">
              <div class="flex-row justify-space-between ph">
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
                          :icon="['fas', 'eye']" class="black" size="xs"/>
                        </div>
                        <div v-if="showResponse === question.id">
                          <font-awesome-icon :icon="['fas', 'eye-slash']" class="black" size="xs"/>
                        </div>
                      </div>
                    </div>
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
              <div class="np-content">
                <p>NO PLAQUE HERE</p>
              </div>
            </div>
          </div>
       </div>
        <div v-if="this.$route.params.username !== currentUsername"
        class="page-body-remix border-black">
        <div v-if="plaqueData.hasOwnProperty('name') && hasQuestions">
          <div class="annoymous-intro">
           <p>
             Hello friend!,
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
                  <p :class="showAnswer ? 'answer' : 'display-none'">
                    {{ plaqueData.Questions[currentQuestion].answer }}
                  </p>
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
                       class="txtarea"/>
                       <div class="yreplybtn">
                         <button>SUBMIT</button>
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
            <div class="np-content">
              <p>NO QUESTIONS IN PLAQUE</p>
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
      $.ajax({
        type: 'GET',
        url: `${BASE_URL}/plaque/${this.$route.params.plaqueId}`,
        contentType: 'application/json',
      }).then((res) => {
        this.plaqueData = { ...res.data };
        if (this.plaqueData.Questions.length > 0) {
          this.hasQuestions = true;
        }
      });
    },
    submitResponse(e, id) {
      e.preventDefault();
      let formData = $('#response_form').serializeArray();
      formData = formData.reduce((acc, curr) => {
        acc[curr.name] = curr.value;
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
      }).then(() => {
        if (this.currentQuestion + 1 === this.plaqueData.Questions.length) {
          setTimeout(() => {
            this.currentQuestion = null;
          }, 1200);
          setTimeout(() => {
            this.currentQuestion = 'finished';
          }, 1500);
        } else {
          prevCount = this.currentQuestion;
          setTimeout(() => {
            this.currentQuestion = null;
          }, 1200);
        }
        setTimeout(() => {
          this.showAnswer = false;
          this.currentQuestion = prevCount + 1;
        }, 1500);
      });
    },
  },
  mounted() {
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
    };
  },
  beforeMount() {
    document.title = 'HWDYKM - Plaques';
  },
};
</script>
