import LoadingComponent from '@/components/Loading.vue';
import Vue from 'vue'


const loadingConstructor = Vue.extend(LoadingComponent);
let instance = new loadingConstructor({
    el: document.createElement('div')
})
instance.isLoadingShow = false;

const loading = {
    show(options) {
        instance.isLoadingShow = true;
        instance.text = options.text;
        document.body.appendChild(instance.$el);
    },
    close() {
        instance.isLoadingShow = false;
    }
};



Vue.use({
    install(options = {}) {
        if (!Vue.prototype.loading) {
            Vue.prototype.$loading = loading;
        }
        Vue.mixin({
            created() {
                this.$loading = Vue.prototype.$loading;
            }
        })
    }
});