import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
NProgress.configure({
    easing: 'ease',
    speed: 500,
    showSpinner: false,

})
export default ({ app }) => {
    app.router.beforeEach((to, from, next) => {
        NProgress.start();
        next()
    })
    app.router.afterEach((to, from, next) => {
        NProgress.done();
    })
}
