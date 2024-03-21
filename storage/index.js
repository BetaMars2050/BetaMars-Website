
export const setItem = (key, content) => {
    if (!key) return
    if (typeof content !== 'string') {
        content = JSON.stringify(content)
    }
    window.localStorage.setItem(key, content)
}


export const getItem = key => {
    if (!key) return
    return window.localStorage.getItem(key)
}


export const removeItem = key => {
    if (!key) return
    window.localStorage.removeItem(key)
}




export const setSessionItem = (key, content) => {
    if (!key) return
    if (typeof content !== 'string') {
        content = JSON.stringify(content)
    }
    window.sessionStorage.setItem(key, content)
}


export const getSessionItem = key => {
    if (!key) return
    return window.sessionStorage.getItem(key)
}


export const removeSessionItem = key => {
    if (!key) return
    window.sessionStorage.removeItem(key)
}

