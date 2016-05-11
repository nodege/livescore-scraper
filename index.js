var $ = require('cheerio')
var request = require('request')
var express = require('express')
var app = express()

app.get('/', function(req, res) {
    var team_name = req.param('id');

    function display(arr) {
        if (team_name.length <= 3) {
            res.send("Name is to short")
        } else {
            var items = arr.filter(function (item) {
                return item.indexOf(team_name) > -1;
            });
            
            if (items.length) {
                res.send(items);
            } else {
                res.send("else");
            }
        }
    }
    function gotHTML(err, resp, html) {
        if (err) return console.error(err)
        var arr = [];
        var parsedHTML = $.load(html)
        parsedHTML('div.row-gray').map(function(i, foo) {
            foo = $(foo)
            arr.push(foo.text())
        });

        display(arr);
    }
    var domain = 'http://www.livescore.com/'
    request(domain, gotHTML)
})
app.listen(9090)
