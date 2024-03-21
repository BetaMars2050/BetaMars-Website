// middleware({ route, redirect, from }) {
//     if (route.path == "/web/myaccount" || route.path == "/web/myaccount/") {
//       return redirect("/web/myaccount/asset");
//     }
//   },

export default function (context) {
    if (process.client) {
        let { fullPath, name, query } = context.route

        console.log(context.route)
        if (name === 'web' || name === 'index') {
            context.redirect("/web/home");
        }

        if (name === 'web-marketplace') {
            if (query?.code) {
                context.redirect({ path: '/web/marketplace/ticket-sale', query: { code: query.code } })

            } else {
                context.redirect({ path: '/web/marketplace/ticket-sale' })

            }
        }


    }
}