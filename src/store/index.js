import Vue from 'vue'
import Vuex from 'vuex'
import Axios from 'axios'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    questionNo: 1,
    questions: [],
    userAnswers: [],
    alert: false,
    results: [],
    total: 0,
    categories: [],
    params: {
      amount: 15,
      category: 9,
      difficulty: 'easy',
      type: 'multiple',
    }
  },


  getters: {
    questionNo: (state) => state.questionNo,
    questions:(state) => state.questions,
    userAnswers:(state) => state.userAnswers,
    alert:(state) => state.alert,
    results:(state) => state.results,
    total:(state) => state.total,
    categories:(state) => state.categories
  },


  mutations: {
    goNext:(state) => {
      state.questionNo ++;
    },
    goPrev:(state) => {
      state.questionNo --;
    },
    setQuestions:(state, payload) => {
      state.questions = [...payload];
      console.log(state.questions)
    },
    setCategories:(state, payload) => {
      state.categories = [...payload];
    },
    setAlert(state) {
      state.alert = true;
      setTimeout(() => {
        state.alert = false;
      }, 2000)
    },
    setResults:(state, payload) => {
      state.results = state.questions.map((el, index) => {
        let score = el.correct_answer == state.userAnswers[index] ? 1 : 0;
        state.total += score;
        return {
          question: el.question,
          answer: el.correct_answer,
          userAnswer: state.userAnswers[index],
          score
        }
      })
    },
    setParams:(state, payload) => {
      state.params = {...payload};
    },
    reset:(state) => {
      state.questionNo = 1;
      state.results = [];
      state.total = 0;
      state.questions = [];
      state.userAnswers = [];
    }
  },


  actions: {
    nextQuestion({commit}, payload) {
      commit('goNext');
    },
    prevQuestion({commit}, payload) {
      commit('goPrev');
    },
    firstQuestion({commit}) {
      commit('reset')
    },
    getQuestions({commit}, params = this.state.params) {
      return new Promise((resolve, reject) => {
        Axios.get("https://opentdb.com/api.php?encode=url3986", { params })
        .then(res => {
          if(res.status == 200) {
            commit('setQuestions', res.data.results);
            resolve(res);
          }else reject('data retrieve error')
        }).catch(err => reject(err));
      })
    },
    getCategories({commit}) {
      return new Promise((resolve, reject) => {
        Axios.get("https://opentdb.com/api_category.php")
        .then(res => {
          if(res.status == 200) {
            commit('setCategories', res.data.trivia_categories);
            resolve(res);
          }else reject('data retrieve error')
        }).catch(err => reject(err));
      })
    },
    changeParams({commit}, payload) {
      commit('setParams', payload)
    },
    alert({commit}) {
      commit('setAlert')
    },
    calculateResults({commit}) {
      commit('setResults')
    }
  },


  modules: {
  }
})

export default store;
