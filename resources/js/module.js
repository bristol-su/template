import ExampleComponent from './components/ExampleComponent.vue';
import Vue from 'vue';
import {vuetify} from '@bristol-su/frontend-toolkit'

new Vue({
    el: '#template-vue-root',
    vuetify,
    components: {
        ExampleComponent
    }
})
