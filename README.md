# conver-htmlfile-to-pdf
install 
var mysql = require('mysql');
var path = require("path");
var pdf=require('html-pdf');
var fs = require('fs');
var handlebars = require("handlebars");


here i am dynamically get the data from mysql database, using that data i am storing in html template,save this html file in hard disc because when store the data in html that file store in locally not in hard disc, when we run the browser we can't visible that file so that wise we use fs inbuilt library to save the html file in hard disc then we convert this html file into pdf formate using html-pdf library. 
