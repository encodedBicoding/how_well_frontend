<template>
  <div class="dashboard">
    <div class='overlay'></div>
    <div :class="showModal ? 'modal' : 'hideModal'">
      <div class="f-right" v-on:click="() => toggleModal()">X</div>
      <div class="modal-content">
        <form
          class="modal-form"
          method="POST"
          id='new_plaque'
          name='new_plaque'
          v-on:submit="(e) => createPlaque(e)"
          >
          <div class="form-item">
            <label for='name'
              style="color: #fff">
              <b>Plaque Name: <span class="red">*</span></b>
              </label>
             <input
              type="text"
              name='name'
              placeholder="Plaque Name"
              v-model="plaqueNameData"
              />
          </div>
           <div class="form-item">
             <p class="text-center" v-if="isRequesting">LOADING...</p>
             <button v-if="!isRequesting">CREATE PLAQUE</button>
           </div>
        </form>
      </div>
    </div>
     <div :class="showPlaqueModal ? 'modal' : 'hideModal'">
      <div class="f-right" v-on:click="() => hidePlaque()">X</div>
      <div class="modal-content">
        <div class="bg-white" style="display: none">
          <div v-if="typeof errorData === 'string'">
              <p class="error-list">{{errorData}}</p>
          </div>
          <div v-if="typeof errorData !== 'string'">
            <ul v-for="(error, idx) in errorData" v-bind:key='idx' class="error-list">
              <li>{{error.msg}}</li>
            </ul>
          </div>
        </div>
        <form
          class="modal-form"
          method="POST"
          name='new_question'
          id='new_question'
          v-on:submit="(e) => addQuestionToPlaque(e, plaqueModalId)"
          >
          <div class="form-item">
            <label for='question'
               style="color: #fff">
               <b>Your Question?: <span class="red">*</span></b>
            </label>
             <input type="text" name='question'
             placeholder="2 + 2?" v-model="questionData"/>
          </div>
          <div class="suggestions">
            <p>Don't know what to ask?</p>
            <select v-model="questionData" class="selectSugs">
              <option disabled selected value='' class="black">See Suggestions..</option>
              <optgroup v-for="(sugs, idx) in suggestionData"
                v-bind:key="idx"
              >
                <option>{{sugs}}</option>
              </optgroup>
            </select>
          </div>
          <div class="b-dotted">
            <div class="flex-item">
              <div class="d-text">
                <p id='norm'>Requires answer?</p>
                <p id='small'> Turn this off if this question doesn't require an answer</p>
              </div>
              <div class="switch">
                <input type="checkbox" name='showAnswer' :checked="showQueAnswer"/>
                <div class="slider round" v-on:click="() => activateAnswer()"></div>
              </div>
            </div>
            <div v-if="showQueAnswer" class="form-item">
              <div class="r-a">
                <label for='answer'
                  style="color: #fff;">
                  <b>Your Answer: <span class="red">*</span></b>
                  </label>
                <input type="text" name='answer' placeholder="4" v-model="answerData"/>
              </div>
            </div>
          </div>
          <div class="form-item">
            <label for='options'
             style="color: #fff"><b>Add options, separate by comma</b></label>
             <input type="text" name='options' placeholder="4, 5, 6, 10" v-model="optionData"/>
          </div>
          <div class="form-item">
            <p class="text-center" v-if="isRequesting">LOADING...</p>
             <button v-if="!isRequesting">ADD QUESTION</button>
          </div>
        </form>
        </div>
      </div>
      <div :class="showEditQuestionModal ? 'modal' : 'hideModal'">
      <div class="f-right" v-on:click="() => hidePlaque()">X</div>
      <div class="modal-content">
        <div class="bg-white" style="display: none">
          <div v-if="typeof errorData === 'string'">
              <p class="error-list">{{errorData}}</p>
          </div>
          <div v-if="typeof errorData !== 'string'">
            <ul v-for="(error, idx) in errorData" v-bind:key='idx' class="error-list">
              <li>{{error.msg}}</li>
            </ul>
          </div>
        </div>
        <form
          class="modal-form"
          method="POST"
          name='edit_question'
          id='edit_question'
          v-on:submit="(e) => editQuestionInPlaque(e)"
          >
          <div class="form-item">
              <label for='question'
               style="color: #fff">
               <b>Your Question?: <span class="red">*</span></b>
            </label>
             <input type="text" name='question'
             placeholder="2 + 2?" v-model="questionToEditQuestion"/>
          </div>
          <div class="suggestions">
            <p>Don't know what to ask?</p>
            <select v-model="questionToEditQuestion" class="selectSugs">
              <option disabled selected value='' class="black">See Suggestions..</option>
              <optgroup v-for="(sugs, idx) in suggestionData"
                v-bind:key="idx"
              >
                <option>{{sugs}}</option>
              </optgroup>
            </select>
          </div>
          <div class="form-item">
            <label for='answer'
              style="color: #fff">
              <b>Your Answer: <span class="red">*</span></b>
              </label>
             <input type="text" name='answer'
              placeholder="4" v-model="questionToEditAnswer"/>
          </div>
          <div class="form-item">
            <label for='options'
             style="color: #fff"><b>Add options, separate by comma</b></label>
             <input type="text" name='options'
              placeholder="4, 5, 6, 10" v-model="questionToEditOptions"/>
          </div>
          <div class="form-item">
            <p class="text-center" v-if="isRequesting">LOADING...</p>
             <button v-if="!isRequesting">EDIT QUESTION</button>
          </div>
        </form>
        </div>
      </div>
      <div :class="deletePlaqueModal ? 'modal' : 'hideModal'">
      <div class="f-right" v-on:click="() => hidePlaque()">X</div>
      <div class="modal-content">
        <div
          class="modal-form"
          >
          <div class="ays">
             <p>Delete Plaque?</p>
          </div>
          <div class="flex-ays flex-row">
            <div class="bg-lime" v-on:click="() => hidePlaque()">
              <p>NO</p>
            </div>
            <div class="bg-red" v-on:click="() => deletePlaqueById(deletePlaqueid)">
              <p>YES</p>
            </div>
          </div>
        </div>
        </div>
      </div>
      <div :class="deleteQuestionModal ? 'modal' : 'hideModal'">
      <div class="f-right" v-on:click="() => hidePlaque()">X</div>
      <div class="modal-content">
        <div
          class="modal-form"
          >
          <div class="ays">
             <p>Delete Question?</p>
          </div>
          <div class="flex-ays flex-row">
            <div class="bg-lime" v-on:click="() => hidePlaque()">
              <p>NO</p>
            </div>
            <div class="bg-red" v-on:click="() => deleteQuestionById()">
              <p>YES</p>
            </div>
          </div>
        </div>
        </div>
      </div>
    <div class="container">
        <div class="page-content head">
          <div class="header flex-row justify-space-between">
            <div class="page-logo">
              <a  href="/dashboard">HWDYKM <span class="beta">QUIZ</span></a>
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
        <div class="body">
        <div class="page-body-remix" v-if="!fetchingPlaqueData">
          <div :class="!hasPlaque ? 'flex-center' : 'no-flex'">
            <div v-if="!hasPlaque" class="noPlaqueC">
              <p class="noPlaque">
                You currently do not have any plaque.
                Create a new plaque, click the button below
              </p>
              <div class="plus-container" v-on:click="() => toggleModal()">
                  <font-awesome-icon
                  :icon="['fas', 'plus']"
                    class="black" size="lg"
                    />
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
            <div v-if="hasPlaque">
                <!-- hwdykm -->
                <ins class="adsbygoogle"
                  style="display:block"
                  data-ad-client="ca-pub-6604666533289792"
                  data-ad-slot="5781116894"
                  data-ad-format="auto"
                  data-full-width-responsive="true">
                </ins>
                <div v-for="(plaque, idx) in reversedPlaqueData" v-bind:key="idx">
                  <plaque
                  :plaqueName="plaque.name"
                  :questions="plaque.Questions"
                  :plaqueId="plaque.id"
                  :username="plaqueOwnerName"
                  :plaqueUrl="`
I have a Quiz for you.

This should be fun 😊

👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇
${frontendURL}/plaque/${plaqueOwnerName}/${plaque.id}/hwdykm
                  `"
                  :showPlaque="() => showPlaque(plaque.id, plaque.Questions.length)"
                  :showDeletePlaqueModal="() => showDeletePlaque(plaque.id)"
                  :showEditPlaqueQuestionModal="
                  (questionId, question, answer, options) =>
                  showEditPlaqueQuestionModal(questionId, question, answer, options)"
                  :showDeletePlaqueQuestion="
                  (questionId, plaqueId) => showDeletePlaqueQuestion(questionId, plaqueId)"
                  ></plaque>
                </div>
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
        </div>
        <div v-if="fetchingPlaqueData" class="fetching page-body-remix">
          <div class="ft-text">
            <p>Loading plaque data...</p>
          </div>

        </div>
        <div class="add-plaque-body">
            <div class="add" v-on:click="() => toggleModal()">
              <div class="bg-icon">
                <font-awesome-icon :icon="['fas', 'plus']" class="white add" size="lg"/>
              </div>
            </div>
        </div>
        <div class="footer">
         <Footer/>
      </div>
        </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
@import url('../assets/css/global.scss');
@import url('../assets/css/dashboard.scss');
</style>
<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"></script>
<script>
    (adsbygoogle = window.adsbygoogle || []).push({});
</script>
<script>
import $ from 'jquery';
import plaque from '../components/Plaque.vue';
import Footer from '../components/Footer.vue';
import BASE_URL from '../helper/ajax';
import FE_URL from '../helper/feUrl';
import suggestions from '../helper/suggestions';

export default {
  name: 'Dashboard',
  components: { plaque, Footer },
  beforeMount() {
    document.title = 'HWDYKM - Dashboard';
  },
  methods: {
    activateAnswer() {
      this.showQueAnswer = !this.showQueAnswer;
    },
    showEditPlaqueQuestionModal(questionId, question, answer, options) {
      this.questionToEditId = questionId;
      this.questionToEditQuestion = question;
      this.questionToEditAnswer = answer;
      this.showEditQuestionModal = true;
      this.questionToEditOptions = options.join(',');
    },
    showDeletePlaqueQuestion(questionId, plaqueId) {
      this.deleteQuestionModal = true;
      this.quesToDeleteId = questionId;
      this.plaqueIdOfDeletedQuestion = plaqueId;
    },
    deleteQuestionById() {
      $.ajax({
        type: 'DELETE',
        url: `${BASE_URL}/delete/question/${this.quesToDeleteId}/${this.plaqueIdOfDeletedQuestion}`,
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem('__token__HWDYKM__user__')}`,
        },
        contentType: 'application/json',
        error: (res) => {
          const errorResponse = res.responseText;
          this.deleteQuestionModal = false;
          this.questionToDeleteId = '';
          this.plaqueIdOfDeletedQuestion = '';
          if (JSON.parse(errorResponse).error) {
            this.errorData = JSON.parse(errorResponse).error;
            this.$swal({
              icon: 'error',
              title: 'Oops...',
              html: `<h4>${this.errorData}</h4>`,
            });
          } else {
            this.errorData = JSON.parse(errorResponse).errors;
            this.$swal({
              icon: 'error',
              title: 'Oops...',
              html: `
                <ul>
                  ${this.errorData.map((error) => `<li>${error.msg}</li>`)}
                </ul>
              `,
            });
          }
        },
      }).then((res) => {
        if (res.status === 200 || res.status === 201) {
          this.plaqueData = res.data;
          this.deleteQuestionModal = false;
          this.questionToDeleteId = '';
           this.plaqueIdOfDeletedQuestion = '';
          return true;
        }
         this.deleteQuestionModal = false;
         this.questionToDeleteId = '';
         this.plaqueIdOfDeletedQuestion = '';
        return false;
      });
    },
    editQuestionInPlaque(event) {
      event.preventDefault();
      if (!this.questionToEditQuestion || !this.questionToEditAnswer) {
        return;
      }
      this.questionToEditOptions = this.questionToEditOptions.split(',');
      if (this.questionToEditOptions.length >= 0
        && this.questionToEditOptions[0] !== '') {
        if (!this.questionToEditOptions.includes(this.questionToEditAnswer)) {
          this.questionToEditOptions.push(this.questionToEditAnswer);
        }
      }

      this.isRequesting = true;
      let formData = $('#edit_question').serializeArray();
      formData = formData.reduce((acc, curr) => {
        acc[curr.name] = curr.value.trim();
        return acc;
      }, {});
      this.questionToEditOptions = new Set(this.questionToEditOptions);

      const distinctData = [];

      for(let data of this.questionToEditOptions) {
        distinctData.push(data);
      }

      this.questionToEditOptions = distinctData;
      formData.options = this.questionToEditOptions;
      $.ajax({
        type: 'PATCH',
        url: `${BASE_URL}/edit/question/${this.questionToEditId}`,
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem('__token__HWDYKM__user__')}`,
        },
        data: JSON.stringify(formData),
        dataType: 'json',
        contentType: 'application/json',
        error: (res) => {
          const errorResponse = res.responseText;
          this.isRequesting = false;
          if (JSON.parse(errorResponse).error) {
            this.errorData = JSON.parse(errorResponse).error;
            this.$swal({
              icon: 'error',
              title: 'Oops...',
              html: `<h4>${this.errorData}</h4>`,
            });
          } else {
            this.errorData = JSON.parse(errorResponse).errors;
            this.$swal({
              icon: 'error',
              title: 'Oops...',
              html: `
                <ul>
                  ${this.errorData.map((error) => `<li>${error.msg}</li>`)}
                </ul>
              `,
            });
          }
          this.questionToEditId = '';
          this.questionToEditQuestion = '';
          this.questionToEditAnswer = '';
          this.questionToEditOptions = '';
          this.showEditQuestionModal = false;
          return false;
        },
        success: () => {
          this.isRequesting = false;
        },
      }).then((res) => {
        if (res.status === 200 || res.status === 201) {
          this.plaqueData = res.data;
          this.isRequesting = false;
          this.questionToEditId = '';
          this.questionToEditQuestion = '';
          this.questionToEditAnswer = '';
          this.showEditQuestionModal = false;
          this.questionToEditOptions = ''
          return true;
        }
        this.isRequesting = false;
        this.questionToEditId = '';
        this.questionToEditQuestion = '';
        this.questionToEditAnswer = '';
        this.showEditQuestionModal = false;
        this.questionToEditOptions = ''
        return false;
      });
    },
    toggleModal() {
      this.showModal = !this.showModal;
    },
    showPlaque(id, length) {
      if (length >= 15) {
        return;
      }
      this.showPlaqueModal = true;
      this.plaqueModalId = id;
      this.addQuestionId = id;
    },
    showDeletePlaque(id) {
      this.deletePlaqueid = id;
      this.deletePlaqueModal = true;
    },
    hidePlaque() {
      this.deletePlaqueid = '';
      this.questionToEditId = '';
      this.questionToEditQuestion = '';
      this.questionToEditAnswer = '';
      this.deletePlaqueModal = false;
      this.showPlaqueModal = false;
      this.showEditQuestionModal = false;
      this.deleteQuestionModal=false;
      this.addQuestionId = null;
      this.quesToDeleteId = '';
      this.plaqueIdOfDeletedQuestion = '';
    },
    setUserName() {
      $.ajax({
        type: 'GET',
        url: `${BASE_URL}/user/profile`,
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem('__token__HWDYKM__user__')}`,
        },
        contentType: 'application/json',
        error: () => {
          this.$router.push({ name: 'LandingPage' });
        },
      }).then((res) => {
        if (res.status === 200) {
          this.plaqueOwnerName = res.data.userName;
          return true;
        }
        return false;
      });
    },

    setPlaqueData() {
      this.fetchingPlaqueData = true;
      $.ajax({
        type: 'GET',
        url: `${BASE_URL}/all/plaque`,
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem('__token__HWDYKM__user__')}`,
        },
        contentType: 'application/json',
        error: () => {
          this.$router.push({ name: 'LandingPage', params: { haveAccountAlready: true } });
          this.fetchingPlaqueData = true;
        },
      }).then((res) => {
        this.fetchingPlaqueData = false;
        if (res.status === 200 || res.status === 201) {
          this.plaqueData = [...res.data];
          return true;
        }
        return false;
      });
    },
    createPlaque(e) {
      e.preventDefault();
      if (!this.plaqueNameData) {
        return;
      }
      this.isRequesting = true;
      let formData = $('#new_plaque').serializeArray();
      formData = formData.reduce((acc, curr) => {
        acc[curr.name] = curr.value.trim();
        return acc;
      }, {});
      $.ajax({
        type: 'POST',
        url: `${BASE_URL}/new/plaque`,
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem('__token__HWDYKM__user__')}`,
        },
        data: JSON.stringify(formData),
        dataType: 'json',
        contentType: 'application/json',
        error: (res) => {
          const errorResponse = res.responseText;
          this.isRequesting = false;
          if (JSON.parse(errorResponse).error) {
            this.errorData = JSON.parse(errorResponse).error;
            this.$swal({
              icon: 'error',
              title: 'Oops...',
              html: `<h4>${this.errorData}</h4>`,
            });
          } else {
            this.errorData = JSON.parse(errorResponse).errors;
            this.$swal({
              icon: 'error',
              title: 'Oops...',
              html: `
                <ul>
                  ${this.errorData.map((error) => `<li>${error.msg}</li>`)}
                </ul>
              `,
            });
          }
          this.plaqueNameData = '';
          return false;
        },
        success: () => {
          this.isRequesting = false;
        },
      }).then((res) => {
        this.plaqueNameData = '';
        if (res.status === 200 || res.status === 201) {
          this.isRequesting = false;
          this.showModal = false;
          this.plaqueData.push(res.data);
          return true;
        }
        this.isRequesting = false;
        this.showModal = false;
        return false;
      });
    },
    deletePlaqueById(id) {
      $.ajax({
        type: 'DELETE',
        url: `${BASE_URL}/delete/plaque/${id}`,
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem('__token__HWDYKM__user__')}`,
        },
        contentType: 'application/json',
      }).then((res) => {
        if (res.status === 200 || res.status === 201) {
          this.plaqueData = res.data;
          this.deletePlaqueid = '';
          this.deletePlaqueModal = false;
          return true;
        }
        this.deletePlaqueid = '';
        this.deletePlaqueModal = false;
        return false;
      });
    },
    addQuestionToPlaque(event, plaqueId) {
      event.preventDefault();
      if (!this.questionData) {
        return;
      }
      if (this.showQueAnswer && !this.answerData) {
        return;
      }

      if(!this.answerData) {
        this.answerData = 'N/A';
      }

      this.optionData = this.optionData.split(',').map((od) => od.trim().toLowerCase());
      this.answerData = this.answerData.trim().toLowerCase();
    if (this.optionData.length >= 0
        && this.optionData[0] !== ''
        && this.showQueAnswer) {
        if (!this.optionData.includes(this.answerData)) {
          this.optionData.push(this.answerData);
        }
    }
    this.optionData = new Set(this.optionData);

      const distinctData = [];

      for(let data of this.optionData) {
        distinctData.push(data);
      }

      this.optionData = distinctData;
      this.isRequesting = true;
      let formData = $('#new_question').serializeArray();
      formData = formData.reduce((acc, curr) => {
        acc[curr.name] = curr.value.trim();
        return acc;
      }, {});
      formData.options = this.optionData || [];
      formData.showAnswer = this.showQueAnswer;
      formData.answer = this.answerData;
      $.ajax({
        type: 'POST',
        url: `${BASE_URL}/new/question/${plaqueId}`,
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem('__token__HWDYKM__user__')}`,
        },
        data: JSON.stringify(formData),
        dataType: 'json',
        contentType: 'application/json',
        error: (res) => {
          const errorResponse = res.responseText;
          this.isRequesting = false;
          this.showQueAnswer = true;
          if (JSON.parse(errorResponse).error) {
            this.errorData = JSON.parse(errorResponse).error;
            this.$swal({
              icon: 'error',
              title: 'Oops...',
              html: `<h4>${this.errorData}</h4>`,
            });
          } else {
            this.errorData = JSON.parse(errorResponse).errors;
            this.$swal({
              icon: 'error',
              title: 'Oops...',
              html: `
                <ul>
                  ${this.errorData.map((error) => `<li>${error.msg}</li>`)}
                </ul>
              `,
            });
          }
          this.questionData = '';
          this.answerData = '';
          this.optionData = ''
          return false;
        },
        success: () => {
          this.isRequesting = false;
           this.optionData = '';
           this.showQueAnswer = true;
        },
      }).then((res) => {
        if (res.status === 200 || res.status === 201) {
          this.isRequesting = false;
          this.showPlaqueModal = false;
          this.questionData = '';
          this.answerData = '';
          this.optionData = '';
          // find plaque and update question list;
          const plaqueIndex = this.plaqueData.findIndex((pl) => pl.id === plaqueId);
          this.plaqueData[plaqueIndex].Questions.push(res.data);
          return true;
        }
        this.isRequesting = false;
        this.showPlaqueModal = false;
        this.questionData = '';
        this.answerData = '';
         this.optionData = '';
        return false;
      });
    },
  },
  computed: {
    hasPlaque: function hasPlaque() {
      if (this.plaqueData.length > 0) {
        return true;
      }
      return false;
    },
    reversedPlaqueData: function reversedPlaqueData() {
      const reversed = this.plaqueData;
      return reversed.reverse();
    },
  },
  async mounted() {
    if (sessionStorage.getItem('__token__HWDYKM__user__')) {
      await this.setUserName();
      await this.setPlaqueData();
    } else {
      this.$router.push({ name: 'LandingPage', params: { haveAccountAlready: true } });
    }
  },
  data() {
    return {
      showModal: false,
      frontendURL: FE_URL,
      deletePlaqueModal: false,
      deletePlaqueid: '',
      questionData: '',
      answerData: '',
      optionData: '',
      showQueAnswer: true,
      isRequesting: false,
      showPlaqueModal: false,
      plaqueModalId: null,
      addQuestionId: null,
      plaqueOwnerName: '',
      plaqueData: [],
      fetchingPlaqueData: false,
      plaqueNameData: '',
      errorData: null,
      suggestionData: suggestions,
      showEditQuestionModal: false,
      questionToEditAnswer: '',
      questionToEditQuestion: '',
      questionToEditId: '',
      questionToEditOptions: '',
      quesToDeleteId:'',
      deleteQuestionModal: false,
      plaqueIdOfDeletedQuestion: '',
    };
  },
};
</script>
