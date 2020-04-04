<template>
  <div class="dashboard">
    <div class='overlay'></div>
    <div :class="showModal ? 'modal' : 'hideModal'">
      <div class="f-right" v-on:click="() => toggleModal()">X</div>
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
          id='new_plaque'
          name='new_plaque'
          v-on:submit="(e) => createPlaque(e)"
          >
          <div class="form-item">
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
             <input type="text" name='question'
             placeholder="What is my nickname?" v-model="questionData"/>
          </div>
          <div class="form-item">
             <input type="text" name='answer' placeholder="Your answer" v-model="answerData"/>
          </div>
          <div class="form-item">
            <p class="text-center" v-if="isRequesting">LOADING...</p>
             <button v-if="!isRequesting">ADD QUESTION</button>
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
             <p>Are you sure you?</p>
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
    <div class="container page-flex">
        <div class="page-content">
          <div class="header flex-row justify-space-between">
            <div class="page-logo">
              <a  href="/dashboard">HWDYKM</a>
            </div>
            <div class="share">
              <div>
                <font-awesome-icon :icon="['fas', 'share-alt']" class="white" size="lg"/>
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
        <div class="page-body body-flex">
            <div class="add" v-on:click="() => toggleModal()">
              <div>
                <font-awesome-icon :icon="['fas', 'plus-circle']" class="white add" size="xs"/>
              </div>
            </div>
        </div>
        <div class="page-body-remix" v-if="!fetchingPlaqueData">
          <div :class="!hasPlaque ? 'flex-center' : 'no-flex'">
            <p v-if="!hasPlaque" class="noPlaque">
              You currently do not have any plaque ( question board ), click
              <span class="plus">
                <font-awesome-icon
                 :icon="['fas', 'plus-circle']"
                  class="white" size="xs"
                  />
                </span> to create a plaque, so you can create
              your first set of questions.
            </p>
            <div v-if="hasPlaque">
                <div v-for="(plaque, idx) in reversedPlaqueData" v-bind:key="idx">
                  <plaque
                  :plaqueName="plaque.name"
                  :questions="plaque.Questions"
                  :plaqueId="plaque.id"
                  :username="plaqueOwnerName"
                  :plaqueUrl="`
Hi friend 😊, I have some questions for you to answer!
This will help me understand how well people (You) know me 🤔 😱.
PS: Be free to give your best answers, you are Anonymous! 😏.

👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇
${frontendURL}/plaque/${plaqueOwnerName}/${plaque.id}/hwdykm
                  `"
                  :showPlaque="() => showPlaque(plaque.id, plaque.Questions.length)"
                  :showDeletePlaqueModal="() => showDeletePlaque(plaque.id)"
                  ></plaque>
                </div>
            </div>
          </div>
        </div>
        <div v-if="fetchingPlaqueData" class="fetching page-body-remix">
          <div class="ft-text">
            <p>Loading plaque data...</p>
          </div>
        </div>
    </div>
      <Footer/>
  </div>
</template>
<style lang="scss">
@import url('../assets/css/global.scss');
@import url('../assets/css/dashboard.scss');
</style>
<script>
import $ from 'jquery';
import plaque from '../components/Plaque.vue';
import Footer from '../components/Footer.vue';
import BASE_URL from '../helper/ajax';
import FE_URL from '../helper/feUrl';

export default {
  name: 'Dashboard',
  components: { plaque, Footer },
  beforeMount() {
    document.title = 'HWDYKM - Dashboard';
  },
  methods: {
    toggleModal() {
      this.showModal = !this.showModal;
    },
    showPlaque(id, length) {
      if (length >= 5) {
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
      this.deletePlaqueModal = false;
      this.showPlaqueModal = false;
      this.addQuestionId = null;
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
          this.$router.push({ name: 'LandingPage' });
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
          this.isRequesting = false;
          this.errorData = JSON.parse(res.responseText).error;
          $('.bg-white').css('display', 'block');
          setTimeout(() => {
            $('.bg-white').css('display', 'none');
          }, 2000);
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
      if (!this.questionData || !this.answerData) {
        return;
      }
      this.isRequesting = true;
      let formData = $('#new_question').serializeArray();
      formData = formData.reduce((acc, curr) => {
        acc[curr.name] = curr.value.trim();
        return acc;
      }, {});
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
          this.isRequesting = false;
          this.errorData = JSON.parse(res.responseText).error;
          $('.bg-white').css('display', 'block');
          setTimeout(() => {
            $('.bg-white').css('display', 'none');
          }, 2000);
          this.questionData = '';
          this.answerData = '';
          return false;
        },
        success: () => {
          this.isRequesting = false;
        },
      }).then((res) => {
        if (res.status === 200 || res.status === 201) {
          this.isRequesting = false;
          this.showPlaqueModal = false;
          this.questionData = '';
          this.answerData = '';
          // find plaque and update question list;
          const plaqueIndex = this.plaqueData.findIndex((pl) => pl.id === plaqueId);
          this.plaqueData[plaqueIndex].Questions.push(res.data);
          return true;
        }
        this.isRequesting = false;
        this.showPlaqueModal = false;
        this.questionData = '';
        this.answerData = '';
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
      this.$router.push({ name: 'LandingPage' });
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
      isRequesting: false,
      showPlaqueModal: false,
      plaqueModalId: null,
      addQuestionId: null,
      plaqueOwnerName: '',
      plaqueData: [],
      fetchingPlaqueData: false,
      plaqueNameData: '',
      errorData: null,
    };
  },
};
</script>
