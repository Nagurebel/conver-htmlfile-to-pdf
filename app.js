// //importing mysql module

// const mysql = require('mysql');

// //configaration for creating mysql connection
// const connection = mysql.createConnection({
// host : 'localhost', //host for connection
// port : 3306,  //default port for mysql
// database : 'sakila', //data base from which we want  to connect out node  applilcation
// user : 'root', // user name of mysql connection
// password :'root' //password for my sql connection
// })

// //executing connection
// connection.connect(function (err) {
//     if(err){
//         console.log("error occurred while connecting");
//     }
//     else{
//         console.log("connection created with Mysql successfully");
//     }
//  });

var mysql = require('mysql');
var path = require("path");
var pdf=require('html-pdf');
var fs = require('fs');
var handlebars = require("handlebars");
// var html_to_pdf = require('html-pdf-node');


var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database : 'sakila'
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
  // result()
});

// var output={};
// // var dataGet= (function(data){
// //   // output=data;
// //   // console.log("output==>",output);
// //   return data; 
// // })();
// // console.log("output",dataGet);

// const query="SELECT * FROM sakila.actor"
// var result = ()=>{
//    con.query(query,async (err,res)=>{
//     for(let i=0;i<=res.length;i++){
//   if(!res[i]){
//     console.log("error",err);
//   }else{
//     output.first_name=res[i].first_name;
//     output.last_name=res[i].last_name;
//     output.last_update=res[i].last_update;
//     // console.log("output",output);
//     return output;
//   }
//     }
    // output =res[i];
  //   if (err) {
  //     console.log('db fetch error',err);
  //     throw err;
  // }
  // else {
  // output =res;
  // // dataGet(res);
  // console.log('user=>',output[0].first_name);
  // // return output;
  // }
          // return console.log(res);
//   });
// }
// console.log('user=>',result());




// module.exports=result;
// let output;
  
// const setOutput = (rows) => {
//     output = rows;
//     // console.log(output);
// }
// console.log("output",output);
  
// con.connect(async(err) => {
//     if (err) {
//         console.log("Database Connection Failed !!!", err);
//         return;
//     }
  
//     console.log("Connected to Database");
  
//     const query="SELECT * FROM sakila.actor"
//    con.query(query, (err, rows) => {
//         if (err) {
//             console.log("internal error", err);
//             return;
//         }
          
//         // This is the important function
//         setOutput(rows);
//         console.log(setOutput(rows));
//     });
// });
// console.log(con.query(query));

// const result =  ()=>{
//     var getMysqlData;
//     var query="SELECT * FROM sakila.actor";
//  con.query(query,(err,res)=>{
    
//         getMysqlData=res;
//         console.log(getMysqlData);
//         // return getMysqlData;
// return getMysqlData;
//         // return console.log(res);
//         // return res;
       
// });
//  console.log(getMysqlData);
// }
// result();
/**
 * @description
 * @params {string} typeOfFile
 * @params {string} filePath
 * @params {string} fileName
 * @params {string} toBeGenFileName
 */

//  function generatePdf(typeOfFile,filePath,fileName,toBeGenFileName){
//   try{
//     let HTMFliePath = `.${filePath}${fileName}`
//     if(!fs.existsSync(HTMFliePath)){
//       console.log("File doesn't exsists.");
//     }

//   typeOfFile ==="PNG"?toBeGenFileName+=".png":toBeGenFileName+=".pdf"

//   const htmlContent = fs.readFileSync(HTMFliePath,'utf-8');
//   const htmlToPdfOption={
//     "type":typeOfFile ,//allowed file type
//     "height":"650px",
//     "width":"850px",
//     "renderDelay":2000
//   }
//   htmlpdf.create(htmlContent,htmlToPdfOption)
//   .toFile(toBeGenFileName, (err,result)=>{
//     if(err){
//       return console.log(err);
//     }else{
//       console.log(result);
//     } 
//   });
//   }catch(error){
//     console.log("Error while converting to html-to-pdf",error);
//   }
// }

var prepareHtml = (res)=> {
  // console.log("In this prepareHtml function",res);

  const filePath = path.join(__dirname + '/index.html');
  const source = fs.readFileSync(filePath, 'utf-8').toString();
  const template = handlebars.compile(source);
  const replacements = {
    firstName: res[0].first_name,
    lastName: res[0].last_name,
    lastUpdate: res[0].last_update
  };
  // console.log("replacements",replacements);
  const htmlToSend = template(replacements);
  console.log("htmlToSend",htmlToSend);
  fs.writeFile("hdd.html", htmlToSend, function(err) {
    if(err) {
        return console.log(err);
    }
    console.log("The file was saved!");
}); 

// var html =fs.readFile('hdd.html', 'utf8', function (err, content) {
//   if (err) {
//     return res.status(400).send({error: err});
//   }
//   console.log(content);
// });

var html = fs.readFileSync('./hdd.html', 'utf8'); //to your html file
var options = { format: 'Letter' };
 //in your case just your html code in place of html
     //pdf.create(<html><div>test</div></html>,.....)
     pdf.create(html, options).toFile('./gerrateddoc.pdf', function(err, res) {
  if (err) return console.log(err);
  console.log(res); // { filename: '/genrateddoc.pdf' } 
});
// generatePdf("PDF","/","hdd.html","cert_sample");

// let options = { format: 'A4' };
// // console.log("file",file);
// html_to_pdf.generatePdf('hdd.html', options).then(pdfBuffer => {
//   console.log("PDF Buffer:-", pdfBuffer);
// });

}

getMysqlres()
 function getMysqlres() {
  const query="SELECT * FROM sakila.actor"
  con.query(query,(err,res)=>{
// console.log("res",res);
  //   for(let i=0;i<=res.length;i++){
  // if(!res[i]){
  //   console.log("error",err);
  // }else{
  //   output.first_name=res[i].first_name;
  //   output.last_name=res[i].last_name;
  //   output.last_update=res[i].last_update;
  //   console.log("output",output);
    prepareHtml(res);
  //   // return output;
  // }
  //   }
})
}