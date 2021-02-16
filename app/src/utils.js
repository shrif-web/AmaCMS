import url from "url";

export function fullUrl(req) {
    return url.format({
        protocol: req.protocol,
        host: req.get('host'),
        pathname: req.originalUrl
    });
};

export function getWhichRouterForTopMenu(req) {
    return {
        isHome: req.route.path == '/home',
    }
}