<template>
    <div>
        This is an example component with a button from Vuetify
        <v-btn color="primary">
            <v-icon>mdi-arrow-right</v-icon>
        </v-btn>

        <v-radio-group v-model="test">
            <v-radio
              v-for="n in 3"
              :key="n"
              :label="`Radio ${n}`"
              :value="n"
            ></v-radio>
        </v-radio-group>
    </div>
</template>

<script>
    export default {
        name: "ExampleComponent",

        props: {},

        data() {
            return {
                test: []
            }
        },

        methods: {},

        computed: {}
    }
</script>

<style scoped>

</style>
