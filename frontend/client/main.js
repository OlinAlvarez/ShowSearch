//karina
const socket = io()

const resultComponent = {
    template: `<div><ul v-for="res in resultset" id="listyle">
                    <li v-on:click="getSpecificShow(res.id)" class="bg-success" id="eachshow">{{res.name}}</li>
                </ul></div>`,
    props: ['resultset'],
    methods: {
        getSpecificShow: function (id) {
            socket.emit('specific-show', id)
        }
    }
}

const individualShowComponent = {
    template: `<div>
                    <img :src="currentshow.image">
                    <h2><mark>{{currentshow.name}}</mark>: </h2>
                    <h4 v-html="currentshow.summary"><mark>Summary:</mark> {{currentshow.summary}}</h4>
                    <h4><mark>Average Rating:</mark> {{currentshow.rating}}</h4>
                    <h4><mark>Genres:</mark> {{currentshow.genres}}</h4>
                    <h4><mark>Status of show:</mark> {{currentshow.status}}</h4>
                    <h4><mark>OfficialSite:</mark> <a :href="currentshow.site" target="_blank">{{currentshow.site}}</a></h4>
               </div>`,
    props: ['currentshow']
}

//darren
const app = new Vue({

    el: '#query-app',

    data: {
        queryString: '',
        error: false,
        resultset: [],
        currentshow: {},
        renderready: false
    },

    methods: {
        queryShowName: function (queryString) {
            if (queryString === '') return this.error = true;
            queryString.split(" ").join("-")
            socket.emit('query', queryString)
            this.queryString = ''
            this.error = false;
            this.currentshow = {}
        }
    },

    components: {
        'result-component': resultComponent,
        'individual-component': individualShowComponent
    }
})

//pranil
socket.on('successful-query', jsonData => {
    app.renderready = false
    app.resultset = []
    jsonData.forEach(element => {
        app.resultset.push(element)
    });
})

//olin
socket.on('show-returned', showObj => {
    app.currentshow = showObj
    app.renderready = true
})