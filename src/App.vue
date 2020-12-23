<template>
  <div id="app" >
    <b-navbar type="dark" variant="dark">
      <b-navbar-brand class="mx-3">Logo</b-navbar-brand>
       <b-navbar-nav v-show="$route.name != 'Home'">
        <b-nav-item :disabled="questionNo == 1 || $route.name == 'Results'" >Previous</b-nav-item>
        <b-nav-text class='font-weight-bold mx-2 text-light' > {{questionNo}} / {{questionsLength}}</b-nav-text>
        <b-nav-item :disabled="questionNo == questionsLength">Next</b-nav-item>
        <b-nav-item :disabled="questionNo != questionsLength">Results</b-nav-item>
      </b-navbar-nav>
    </b-navbar>
    <router-view/>
  </div>
</template>

<script>
export default {
  computed: {
    questionNo() {
      return this.$route.params.number;
    },
    questionsLength() {
      return this.$store.getters.questions.length;
    }
  },
}
</script>


