const getCookie = (name) => {
    var cookieName = document.cookie.match('(^|;) ?' + name + '=([^;]*)(;|$)');
    return cookieName ? cookieName[2] : null;
}

export default getCookie