<template>
    <b-container>
        <b-row>
            <b-col cols='12' class="ma-5">
                <b-card 
                    class="mt-5"
                    header-bg-variant='dark'  
                    header-text-variant="white"
                    footer-bg-variant='grey'  
                    footer-text-variant="dark"
                    border-variant='dark'
                    header-tag="header" 
                    footer-tag="footer"
                >
                    <template #header>
                        <h6 class="mb-0">{{questionNumber}}. {{decodeURIComponent(question.question)}}</h6>
                    </template>
                    <b-list-group>
                        <b-form-radio-group v-model="userAnswers[questionNumber-1]">
                            <b-list-group-item v-for="option in allAnswers" :key='option'> 
                                <b-form-radio :value="option">{{decodeURIComponent(option)}}</b-form-radio>
                            </b-list-group-item>
                        </b-form-radio-group>
                    </b-list-group>
                    <template #footer>
                        <b-button variant='dark' class='mx-2' @click='prevQuestion' :disabled='questionNumber == 1'><b-icon icon="chevron-left"></b-icon> Previous</b-button>
                        <b-button variant='dark' class='mx-2' @click='nextQuestion' :disabled='questionNumber == questionsLength'>Next <b-icon icon="chevron-right"></b-icon></b-button>
                        <b-button variant='success' class='mx-md-2 my-md-0 m-2 float-md-right' @click="gotoResults" v-show='questionNumber == questionsLength'> Results </b-button>
                    </template>
                </b-card>
                <b-alert class='mt-4' variant='warning' :show='alert'>Please Answer all the Questions to Show the Results !!</b-alert>
            </b-col>
        </b-row>
    </b-container>
</template>

<script>
export default {
    props: ['question', 'allAnswers'],
    computed: {
        questionNumber() {
            return this.$store.getters.questionNo;
        },
        userAnswers() {
            return this.$store.state.userAnswers;
        },
        alert() {
            return this.$store.getters.alert;
        },
        questionsLength() {
            return this.$store.getters.questions.length;
        }
    },
    methods: {
        nextQuestion() {
            this.$store.dispatch('nextQuestion');
            this.$router.replace({name: 'Quiz', params: {number: this.questionNumber}});
        },
        prevQuestion() {
            this.$store.dispatch('prevQuestion');
            this.$router.replace({name: 'Quiz', params: {number: this.questionNumber}});
        },
        gotoResults() {
            this.$router.push({ name: 'Results'}).catch(failure => {
                this.$store.dispatch('alert');
            })
        }
    },
}
</script>