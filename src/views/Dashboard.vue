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
             <input type="text" name='name' placeholder="Plaque Name"/>
          </div>
           <div class="form-item">
             <button>{{isRequesting ? 'LOADING...':'CREATE PLAQUE'}}</button>
           </div>
        </form>
      </div>
    </div>
     <div :class="showPlaqueModal ? 'modal' : 'hideModal'">
      <div class="f-right" v-on:click="() => hidePlaque()">X</div>
      <div class="modal-content">
        <form
          class="modal-form"
          method="POST"
          name='new_question'
          id='new_question'
          v-on:submit="(e) => addQuestionToPlaque(e, plaqueModalId)"
          >
          <div class="form-item">
             <input type="text" name='question' placeholder="How well do you know me?"/>
          </div>
           <div class="form-item">
             <button>{{isRequesting ? 'LOADING...' : 'ADD QUESTION'}}</button>
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
                  :plaqueName="plaque.name"
                  :questions="plaque.Questions"
                  :plaqueId="plaque.id"
                  :plaqueUrl="`http://localhost:8080/plaque/${plaqueOwnerName}/${plaque.id}/hwdykm`"
                  :showPlaque="() => showPlaque(plaque.id, plaque.Questions.length)"
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
import $ from 'jquery';
import plaque from '../components/Plaque.vue';
import Footer from '../components/Footer.vue';
import BASE_URL from '../helper/ajax';

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
    hidePlaque() {
      this.showPlaqueModal = false;
      this.addQuestionId = null;
    },
    setUserName() {
      $.ajax({
        type: 'GET',
        url: `${BASE_URL}/user/profile`,
        headers: {
          Authorization: `Bearer ${localStorage.getItem('__token__HWDYKM__user__')}`,
        },
        contentType: 'application/json',
      }).then((res) => {
        this.plaqueOwnerName = res.data.userName;
      });
    },

    setPlaqueData() {
      $.ajax({
        type: 'GET',
        url: `${BASE_URL}/all/plaque`,
        headers: {
          Authorization: `Bearer ${localStorage.getItem('__token__HWDYKM__user__')}`,
        },
        contentType: 'application/json',
      }).then((res) => {
        this.plaqueData = [...res.data];
      });
    },
    createPlaque(e) {
      e.preventDefault();
      this.isRequesting = true;
      let formData = $('#new_plaque').serializeArray();
      formData = formData.reduce((acc, curr) => {
        acc[curr.name] = curr.value;
        return acc;
      }, {});
      $.ajax({
        type: 'POST',
        url: `${BASE_URL}/new/plaque`,
        headers: {
          Authorization: `Bearer ${localStorage.getItem('__token__HWDYKM__user__')}`,
        },
        data: JSON.stringify(formData),
        dataType: 'json',
        contentType: 'application/json',
      }).then((res) => {
        this.isRequesting = false;
        this.showModal = false;
        this.plaqueData.push(res.data);
      });
    },
    addQuestionToPlaque(event, plaqueId) {
      event.preventDefault();
      this.isRequesting = true;
      let formData = $('#new_question').serializeArray();
      formData = formData.reduce((acc, curr) => {
        acc[curr.name] = curr.value;
        return acc;
      }, {});
      $.ajax({
        type: 'POST',
        url: `${BASE_URL}/new/question/${plaqueId}`,
        headers: {
          Authorization: `Bearer ${localStorage.getItem('__token__HWDYKM__user__')}`,
        },
        data: JSON.stringify(formData),
        dataType: 'json',
        contentType: 'application/json',
      }).then((res) => {
        this.isRequesting = false;
        this.showPlaqueModal = false;
        // find plaque and update question list;
        const plaqueIndex = this.plaqueData.findIndex((pl) => pl.id === plaqueId);
        this.plaqueData[plaqueIndex].Questions.push(res.data);
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
  mounted() {
    this.setUserName();
    this.setPlaqueData();
  },
  data() {
    return {
      showModal: false,
      isRequesting: false,
      showPlaqueModal: false,
      plaqueModalId: null,
      addQuestionId: null,
      plaqueOwnerName: '',
      plaqueData: [],
    };
  },
};
</script>
