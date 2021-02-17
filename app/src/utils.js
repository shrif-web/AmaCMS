import url from "url";

export function fullUrl(req) {
    return url.format({
        protocol: req.protocol,
        host: req.get('host'),
        pathname: req.originalUrl
    });
};

export function getWhichRouterForTopMenu(req) {
    let which = {
        isHome: req.route.path == '/',
    }

    let nothing = true;
    for (let key in which) {
        if (which[key]) {
            nothing = false;
        }
    }
    which.nothing = nothing;

    return which;
}