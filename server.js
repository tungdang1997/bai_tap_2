const http = require('http');
const handler = require('./controller/router');
const url = require('url');
const NotFoundRouting = require('D:\\untitled\\btap\\src\\controller\\handleRouter\\notHandle.js');

function getUrl (req) {
    const urlParse = url.parse(req.url,true);
    const pathName = urlParse.pathname;
    return pathName.split('/');
}
const server = http.createServer((req, res) => {
    const arrPath = getUrl(req);
    let trimPath ;
    let id ;

    if (arrPath.length === 2) {
        trimPath = arrPath[arrPath.length -1]
    }
    else {

        trimPath = arrPath[arrPath.length - 2];
        id = arrPath[arrPath.length -1]

    }
    let chosenHandler;
    if (typeof handler[trimPath] === 'undefined') {
        chosenHandler = NotFoundRouting.showNotFound
    } else {
        chosenHandler = handler[trimPath];
    }
    chosenHandler(req, res, +arrPath[3]);
})
server.listen(8080, () => {
    console.log('server running !!')
})