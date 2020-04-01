<template>
  <div class="plaque">
    <div class="plaque-header flex-row justify-space-between">
      <div class="flex-row justify-space-between ph">
        <h3 class="plaqueName">{{plaqueName}}</h3>
          <p class="queCount">{{questions.length}}
            <span class="queCount">
              {{questions.length > 1 ? 'questions' : 'question'}}
              <span>
                {{questions.length >= 5 ? '(completed)' : ''}}
              </span>
            </span>
          </p>
      </div>
      <div class="addQue" v-on:click="() => this.showPlaque(plaqueId, questions.length)">
        <font-awesome-icon :icon="['fas', 'plus']"
        :class="questions.length >= 5 ? 'greyDisabled':'black'" size="xs"/>
      </div>
    </div>
    <div class="plaque-flex">
      <div class="linkQ">
        <div>
          <font-awesome-icon :icon="['fas', 'link']" class="lime" size="xs"/>
        </div>
      </div>
      <div class="delQ">
        <div>
          <font-awesome-icon :icon="['fas', 'trash']" class="red" size="xs"/>
        </div>
      </div>
      <div class="showQ" v-on:click="() => toggleQuestions(plaqueId)">
        <div>
          <div v-if="this.showQuestion !== plaqueId">
            <font-awesome-icon
            :icon="['fas', 'eye']" class="white" size="xs"/>
          </div>
           <div v-if="this.showQuestion === plaqueId">
            <font-awesome-icon :icon="['fas', 'eye-slash']" class="white" size="xs"/>
          </div>
        </div>
      </div>
    </div>
    <div v-if="showQuestion !== plaqueId"></div>
    <div v-if="showQuestion === plaqueId"
    :class="showQuestion === plaqueId ? 'queContainer':'hideQue'">
      <div class="queHolder" v-for="question in questions" v-bind:key="question.id"
      >
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
</template>
<style lang="scss">
@import url('../assets/css/global.scss');
@import url('../assets/css/plaque.scss');
</style>
<script>
export default {
  name: 'Plaque',
  props: {
    plaqueName: String,
    questions: Array,
    plaqueId: Number,
    plaqueUrl: String,
    showPlaque: Function,
  },
  data() {
    return {
      showQuestion: 0,
      showResponse: 0,
    };
  },
  methods: {
    toggleQuestions(id) {
      this.showQuestion = this.showQuestion === id ? 0 : id;
    },
    toggleResponse(id) {
      this.showResponse = this.showResponse === id ? 0 : id;
    },
  },
};
</script>
