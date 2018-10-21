const express = require("express");
const nunjucks = require('nunjucks');
const fileUpload = require('express-fileupload');
var fs = require('fs');
const app = express();
app.listen(9000);
app.use(fileUpload());
app.use("/public", express.static("public"));
app.use("/img", express.static("img"));


nunjucks.configure('views',
    {
        autoescape: true,
        express: app,
        noCache: true,
    });


app.post('*/api/file-upload', (req, res) => {

    let upLoadFile = req.files.file;

    if (!req.files)
        return res.status(400).send('No files were uploaded.');

    upLoadFile.mv('img/' + upLoadFile.name, function (err) {
        if (err) {
            return res.status(500).send(err);
        }

        res.send("<a class=\"custom\" href=\"/Image.html\"" +
            "style=\"background: lightblue; padding: 10px;\"\n" +
            "onmouseover=\"this.style.backgroundColor='blue';this.style.color='white';\" onmouseout=\"this.style.backgroundColor='lightblue';\"" +
            ">Главная страница</a>");
    });

    // let filess = fs.readdirSync('img');
    // let data = {
    //     items: filess,
    // }

    // res.render('ImagesLayout.html', data);
});





app.get('*/Image.html', (request, response) => {

    let files = fs.readdirSync('img');

    let data = {
        items: files,
    }

    response.render('ImagesLayout.html', data);
});






var arrPages = [['HOME', '/Index.html'], ['PageTwo', '/PageTwo.html'], ['PageThree', '/PageThree.html']];


app.get('/', (request, response) => {

    let data = filterPages("HOME");
    response.render('Index.html', data);
});

app.get('*/PageTwo.html', (request, response) => {

    let data = filterPages("PageTwo");
    response.render('PageTwo.html', data);
});

app.get('*/Index.html', (request, response) => {
    let data = filterPages("Home");
    response.render('Index.html', data);
});

app.get('*/PageThree.html', (request, response) => {
    let data = filterPages("PageThree");
    response.render('PageThree.html', data);
});

app.get('*/FAQ.html', (request, response) => {
    let data =
    {
        h1: "FAQ",
    }
    response.render('FAQ.html', data);
});

app.get('*/Style.css', (request, response) => {
    response.download('public/Style.css');
});

app.get('*/Controller.js', (request, response) => {
    response.download('public/Controller.js');
});

app.get('*/VideoPage.html', (request, response) => {
    response.render('VideoPage.html');
});

function filterPages(h1) {
    let array = [];

    arrPages.forEach(function (item, i, arr) {
        if (item[0] != h1) {
            array.push(item);
        }
    });

    let data =
    {
        h1: h1,
        link1: array[0][0],
        link11: array[0][1],
        link2: array[1][0],
        link22: array[1][1],
    }

    return data;
}





