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
          <div class="plaque-header flex-row justify-space-between">
            <div class="flex-row justify-space-between ph">
              <h3 class="plaqueName">{{plaqueData.plaqueName}}</h3>
                <p class="queCount">{{plaqueData.questions.length}}
                  <span class="queCount">
                    {{plaqueData.questions.length > 1 ? 'questions' : 'question'}}
                    <span>
                      {{plaqueData.questions.length >= 5 ? '(completed)' : ''}}
                    </span>
                  </span>
                </p>
            </div>
         </div>
         <div v-if="plaqueData.questions.length <= 0">
           <div class="ppqueContainer">
             <p class="noQueP">
               This Plaque ({{plaqueData.plaqueName}}) currently doesn't have any questions.
               Go to your dashboard to add some questions to the plaque
             </p>
           </div>
         </div>
         <div v-if="plaqueData.questions.length > 0">
           <div class="ppqueContainer">
             <div class="queHolder" v-for="question in plaqueData.questions"
             v-bind:key="question.id">
              <div class="queListing">
                <div class="queTitle flex-row justify-space-between">
                  <div class="flex-row justify-space-between qr">
                  <p id='questionT'>{{question.question}}</p>
                  <p class="resCount">{{question.responses.length}}
                    <span class="resCount">
                      {{question.responses.length > 1 ? 'responses' : 'response'}}
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
                  v-for="response in question.responses" v-bind:key="response.id"
                >
                  <div class="resAuthor" >
                    <p>{{response.author}}</p>
                  </div>
                  <div class="resComment">
                    <p>{{response.comment}}</p>
                  </div>
                </div>
              </div>
            </div>
           </div>
         </div>
       </div>
        <div v-if="this.$route.params.username !== currentUsername"
        class="page-body-remix border-black">
         say nope
       </div>
    </div>
    <Footer/>
  </div>
</template>
<style lang="scss">
@import url('../assets/css/plaquePage.scss');
</style>
<script>
import Footer from '../components/Footer.vue';

export default {
  name: 'Plaque',
  components: { Footer },
  methods: {
    toggleResponse(id) {
      this.showResponse = this.showResponse === id ? 0 : id;
    },
  },
  data() {
    return {
      currentUsername: 'encodedbcidoing',
      showResponse: 0,
      plaqueData: {
        plaqueName: 'New Plaque',
        plaqueId: this.$route.params.plaqueId,
        questions: [
          {
            id: 1,
            question: 'what do I do for a living',
            responses: [
              {
                id: 1,
                author: 'Annonymous user',
                comment: 'you are a yahoo boy wo love to soak garri in the morning an suuse toothpcik',
              },
              {
                id: 2,
                author: 'Annonymous user',
                comment: 'you are a yahoo boy',
              },
              {
                id: 3,
                author: 'Annonymous user',
                comment: 'you are a yahoo boy',
              },
              {
                id: 4,
                author: 'Annonymous user',
                comment: 'you are a yahoo boy',
              },
            ],
          },
          {
            id: 2,
            question: 'what is my birthday?',
            responses: [
              {
                id: 1,
                author: 'Annonymous user',
                comment: '1st june 2019',
              },
            ],
          },
          {
            id: 3,
            question: 'what is my birthday?',
            responses: [
              {
                id: 1,
                author: 'Annonymous user',
                comment: '1st june 2019',
              },
            ],
          },
          {
            id: 4,
            question: 'what is my birthday?',
            responses: [
              {
                id: 1,
                author: 'Annonymous user',
                comment: '1st june 2019',
              },
            ],
          },
          {
            id: 5,
            question: 'what is my birthday?',
            responses: [
              {
                id: 1,
                author: 'Annonymous user',
                comment: '1st june 2019',
              },
            ],
          },
        ],
      },
    };
  },
};
</script>
