const fs = require('fs');
const ProductService = require('../../service/productService')
const qs = require('qs');
class ProductRouting {
    static getHtmlProducts(products, indexHtml) {
        let tbody = '';
        products.map((product, index) => {
            tbody += `<tr style="text-align: center">
        <td>${index + 1}</td>
        <td>${product.name}</td>
        <td>${product.age}</td>
        <td>${product.countryside}</td>
        <td><a href="/view/edit/${product.id}" type="submit" class="btn btn-primary">Edit</a></td> 
        <td><a href="/view/delete/${product.id}" type="button" class="btn btn-danger">Delete</a></td>
    </tr>`
        });
        indexHtml = indexHtml.replace('{product}', tbody);
        return indexHtml;
    }
    static showHome(req, res) {
        if (req.method === 'GET') {
            fs.readFile('D:\\untitled\\btap\\src\\view\\home.html', 'utf-8', async (err, homeHtml) => {
                if (err) {
                    console.log(err)
                } else {
                    let products = await ProductService.getProducts();
                    homeHtml = ProductRouting.getHtmlProducts(products, homeHtml);
                    res.writeHead(200, 'text/html');
                    res.write(homeHtml);
                    res.end();
                }
            })
        } else {
            let data = '';
            req.on('data', chuck => {
                data += chuck;
            })
            req.on('end',async (err) => {
                if (err) {
                    console.log(err)
                } else {
                    let search = qs.parse(data)
                    console.log(search.search)
                    fs.readFile('D:\\untitled\\btap\\src\\view\\home.html', 'utf-8', async (err, homeHtml) => {
                        if (err) {
                            console.log(err)
                        } else {
                            let products = await ProductService.searchProduct(search.search)
                            homeHtml = ProductRouting.getHtmlProducts(products, homeHtml);
                            res.writeHead(200, 'text/html');
                            res.write(homeHtml);
                            res.end();
                        }
                    })
                }
            })
        }
    }
    static showFormCreate(req, res) {
        if (req.method === 'GET') {
            fs.readFile('D:\\untitled\\btap\\src\\view\\create.html', 'utf-8', (err,createHtml) => {
                if (err) {
                    console.log(err)
                } else {
                    res.writeHead(200, 'text/html');
                    res.write(createHtml);
                    res.end();
                }
            })
        } else {
            let productChuck = '';
            req.on('data', chuck => {
                productChuck += chuck
            })
            console.log(productChuck)
            req.on ('end', async(err) => {
                if (err) {
                    console.log(err)
                } else {
                    let product = qs.parse(productChuck);
                    await ProductService.saveProduct(product);
                    res.writeHead(301, {'location':'/home'});
                    res.end();
                }
            })
        }
    }
    static showFormEdit(req, res, id) {
        if (req.method === 'GET') {
            fs.readFile('D:\\untitled\\btap\\src\\view\\edit.html', 'utf-8', async (err,editHtml) => {
                if (err) {
                    console.log(err)
                } else {
                    console.log(id)
                    let product = await ProductService.findById(id);
                    editHtml = editHtml.replace('{name}', product[0].name);
                    editHtml = editHtml.replace('{age}', product[0].age);
                    editHtml = editHtml.replace('{countryside}', product[0].countryside);
                    res.writeHead(200, 'text/html');
                    res.write(editHtml);
                    res.end();
                }
            })
        } else {
            let productChuck = '';
            req.on('data', chuck => {
                productChuck += chuck
            })
            req.on ('end', async(err) => {
                if (err) {
                    console.log(err)
                } else {
                    let product = qs.parse(productChuck);
                    await ProductService.editProduct(product, id);
                    res.writeHead(301, {'location':'/home'});
                    res.end();
                }
            })
        }
    }
    static showFormDelete(req, res,id) {
        if (req.method === 'GET') {
            fs.readFile('./view/delete.html', 'utf-8', async (err,deleteHtml) => {
                if (err) {
                    console.log(err)
                } else {
                    res.writeHead(200, 'text/html');
                    deleteHtml = deleteHtml.replace('{id}', id);
                    res.write(deleteHtml);
                    res.end();
                }
            })
        } else {
            let mess =  ProductService.deleteProduct(id);
            res.writeHead(301, {'location': '/home'});
            res.end();
        }
    }

}
module.exports = ProductRouting;