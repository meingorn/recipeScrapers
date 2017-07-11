const express = require('express');
const fs = require('fs');
const request = require('request');
const cheerio = require('cheerio');
const app = express();

app.get('/scrape', function(req, res){

  url = 'http://www.seriouseats.com/recipes/2015/05/print/sichuan-beef-burger-recipe.html';

  request(url, function(error, response, html){
    if(!error){
      let $ = cheerio.load(html);

        let title, ingredients;
        var json = { title : "", ingredients : [] };

      $('.recipe-title').filter(function(){
        var data = $(this);
        title = data.text();
        json.title = title;

      })
      $('.recipe-ingredients').filter(function(){
        var data = $(this);
        console.log(data)
        var ingredients1 = data.children()[1].children
        var ingredients = data.find("li")

        ingredients = data.text();
        json.ingredients = ingredients;

      })
    }

    fs.writeFile('output.json', JSON.stringify(json, null, 4), function(err){
      console.log('File successfully written! - Check your project directory for the output.json file');
    })

    res.send('Check your console!')
  })
})

app.listen('8090')
console.log('Now listening on port 8090')
exports = module.exports = app;
