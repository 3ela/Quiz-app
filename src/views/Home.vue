<template>
  <b-container class='fluid'>
    <b-row align-h='center' align-v='center' class='mt-16'>
      <b-col cols='12' class="mt-5">
      <b-card bg-variant="dark" header="Welcome !!!" text-variant="white" class="text-center">
        <b-card-text>Press Start to Begin the Quiz</b-card-text>
        <hr/>
        <b-form-group 
          label-cols="4" 
          label-cols-lg="3" 
          label-size="sm" 
          :state='numberRule' 
          label="Number Of Questions" 
          label-for="input-sm"
          valid-feedback="Valid !"
          invalid-feedback="The Number Must be Between 1 and 50"
        >
          <b-form-input v-model="params.amount" id="input-sm" type="number" size="sm"></b-form-input>
        </b-form-group>

        <b-form-group
          label-cols="4" 
          label-cols-lg="3" 
          label-size="sm" 
          label="Category Of Questions" 
          label-for="category-sm"
        >
          <b-form-select
            value-field="id"
            text-field="name"
            :options="categories"
            v-model="params.category"
            id='category-sm'
          ></b-form-select>
        </b-form-group>

        <b-form-group
          label-cols="4" 
          label-cols-lg="3" 
          label-size="sm" 
          label="Difficalty Of Questions" 
          label-for="diff-sm"
        >
          <b-form-select
            value-field="value"
            text-field="name"
            :options="diff"
            v-model="params.difficulty"
            id='diff-sm'
          ></b-form-select>
        </b-form-group>

        <b-form-group
          label-cols="4" 
          label-cols-lg="3" 
          label-size="sm" 
          label="Type Of Questions" 
          label-for="type-sm"
        >
          <b-form-select
            value-field="value"
            text-field="name"
            :options="types"
            v-model="params.type"
            id='type-sm'
          ></b-form-select>
        </b-form-group>
        <hr/>
        <b-button @click='startQuiz' block variant='success'>START</b-button>
      </b-card>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>

export default {
  name: 'Home',
  mounted() {
    this.$store.dispatch('getCategories')
  },
  data() {
    return {
      params: {
        amount: 10,
        category: 9,
        difficulty: 'easy',
        type: 'multiple',
      },
      
      types: [
        {name: 'Multiple Choice', value: 'multiple'},
        {name: 'True or False', value: 'boolean'}
      ],
      diff: [
        {name: 'Easy', value: 'easy'},
        {name: 'Medium', value: 'medium'},
        {name: 'Hard', value: 'hard'},
      ]

    }
  },
  computed: {
    categories() {
      return this.$store.getters.categories;
    },
    numberRule() {
      return this.params.amount > 0 && this.params.amount <= 50;
    }
  },
  methods: {
    startQuiz() {
      this.$store.dispatch('changeParams', this.params)
        .then(res => {
           this.$store.dispatch('getQuestions')
            .then(res => {
              setTimeout(() => {
                this.$router.push('question/1')
              }, 800)
            })
            .catch(err => console.error(err));
        }).catch(err => console.log(err))
    }
  }

}
</script>
