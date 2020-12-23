<template>
    <b-container>
        <b-row>
            <b-col cols="12">
                <Question 
                    :question='questions[questionNumber-1]'
                    :allAnswers='allAnswers'
                ></Question>
            </b-col>
        </b-row>
    </b-container>
</template>

<script>
import Question from '../components/Question';

export default {
    // mounted() {
    //     this.$store.dispatch('getQuestions')
    //       .then()
    //       .catch(err => console.error(err));
    // },
    
    components: {
        Question
    },

    computed: {
        questionNumber() {
            return this.$route.params.number;
        },
        questions() {
            return this.$store.getters.questions;
        },
        allAnswers() {
            let allAnswers = this.questions[this.questionNumber-1].incorrect_answers.concat(this.questions[this.questionNumber-1].correct_answer);
            var currentIndex = allAnswers.length, temporaryValue, randomIndex;

            // While there remain elements to shuffle...
            while (0 !== currentIndex) {

                // Pick a remaining element...
                randomIndex = Math.floor(Math.random() * currentIndex);
                currentIndex -= 1;

                // And swap it with the current element.
                temporaryValue = allAnswers[currentIndex];
                allAnswers[currentIndex] = allAnswers[randomIndex];
                allAnswers[randomIndex] = temporaryValue;
            }
            return allAnswers;   
        }   
    }
}
</script>