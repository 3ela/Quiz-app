<template>
    <b-container fluid class="mt-4">
        <b-row align-h='center'>
            <b-col cols='12' md='10'>
                <b-table 
                    caption-top
                    striped
                    hover
                    head-variant="dark" 
                    table-variant="light"
                    foot-clone 
                    :items="results" 
                    :fields="fields"
                >
                    <template #table-caption>
                        <h4>Results</h4>
                    </template>
                    <template #cell(question)="data">
                        <span>{{decodeURIComponent(data.item.question)}}</span>
                    </template>
                    <template #cell(answer)="data">
                        <span>{{decodeURIComponent(data.item.answer)}}</span>
                    </template>
                    <template #cell(userAnswer)="data">
                        <span :class=" data.item.score == 1 ? 'text-success' : 'text-danger'">
                            <b-icon :icon="data.item.score == 1 ? 'check-circle-fill' : 'x-circle-fill'"></b-icon>
                            {{decodeURIComponent(data.item.userAnswer)}}    
                        </span>
                    </template>
                    <template #foot(question)=''>
                        <h5>Total Score: </h5>
                    </template>
                    <template #foot(score)=''>
                        <h5 class="float-right"> {{total}}</h5>
                    </template>
                    <template #foot()=''>
                        <span>{{''}}</span>
                    </template>
                </b-table>
                <b-button variant='success' block @click='goHome'>Go Back Home</b-button>
            </b-col>
        </b-row>
    </b-container>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
    data() {
        return {
            fields: ['question', 'answer', 'userAnswer', 'score']
        }
    },
    computed: {
        ...mapGetters(['total', 'results'])
    },
    methods: {
        goHome() {
            this.$store.dispatch('firstQuestion')
            this.$router.push('/')
        }
    },
}
</script>