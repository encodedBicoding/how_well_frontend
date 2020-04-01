<template>
  <div class="dashboard">
    <div class='overlay'></div>
    <div :class="showModal ? 'modal' : 'hideModal'">
      <div class="f-right" v-on:click="() => toggleModal()">X</div>
      <div class="modal-content">
        <form class="modal-form" method="POST" type='multipart/form-data'>
          <div class="form-item">
             <input type="text" name='plaqueName' placeholder="Plaque Name"/>
          </div>
           <div class="form-item">
             <button>CREATE PLAQUE</button>
           </div>
        </form>
      </div>
    </div>
     <div :class="showPlaqueModal ? 'modal' : 'hideModal'">
      <div class="f-right" v-on:click="() => hidePlaque()">X</div>
      <div class="modal-content">
        <form class="modal-form" method="POST" type='multipart/form-data'>
          <div class="form-item">
             <input type="text" name='question' placeholder="How well do you know me?"/>
          </div>
           <div class="form-item">
             <button>ADD QUESTION</button>
           </div>
        </form>
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
                <font-awesome-icon :icon="['fas', 'paper-plane']" class="white" size="xs"/>
              </div>
              <div style="display: none">

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
        <div class="page-body-remix">
          <div :class="!hasPlaque ? 'flex-center' : 'no-flex'">
            <p v-if="!hasPlaque" class="noPlaque">
              You currently do not have any plaques, click
              <span class="plus">
                <font-awesome-icon :icon="['fas', 'plus-circle']" class="white" size="xs"/>
                </span> to create a plaque, so you can create
              your first set of questions.
            </p>
            <div v-if="hasPlaque">
                <div v-for="(plaque, idx) in reversedPlaqueData" v-bind:key="idx">
                  <plaque
                  :plaqueName="plaque.plaqueName"
                  :questions="plaque.questions"
                  :plaqueId="plaque.plaqueId"
                  :plaqueUrl="`http://localhost:8080/plaque/${plaque.plaqueOwnerName}/${plaque.plaqueId}/hwdykm`"
                  :showPlaque="() => showPlaque(plaque.plaqueId, plaque.questions.length)"
                  ></plaque>
                </div>
            </div>
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
import plaque from '../components/Plaque.vue';
import Footer from '../components/Footer.vue';

export default {
  name: 'Dashboard',
  components: { plaque, Footer },
  methods: {
    toggleModal() {
      this.showModal = !this.showModal;
    },
    showPlaque(id, length) {
      if (length >= 5) {
        return;
      }
      this.showPlaqueModal = true;
      this.addQuestionId = id;
    },
    hidePlaque() {
      this.showPlaqueModal = false;
      this.addQuestionId = null;
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
  data() {
    return {
      showModal: false,
      showPlaqueModal: false,
      addQuestionId: null,
      plaqueData: [
        {
          plaqueName: 'no name',
          plaqueId: 1,
          plaqueOwnerName: 'encodedBicoding',
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
        {
          plaqueName: 'no name',
          plaqueId: 2,
          plaqueUrl: 'http://localhost:8000',
          questions: [
            {
              id: 1,
              question: 'what do I do for a living',
              responses: [
                {
                  id: 1,
                  author: 'Annonymous user',
                  comment: 'you are a yahoo boy',
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
          ],
        },
        {
          plaqueName: 'Last plaque',
          plaqueId: 3,
          plaqueUrl: 'http://localhost:8000',
          questions: [
            {
              id: 1,
              question: 'what do I do for a living',
              responses: [
                {
                  id: 1,
                  author: 'Annonymous user',
                  comment: 'you are a yahoo boy',
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
          ],
        },
      ],
    };
  },
};
</script>
