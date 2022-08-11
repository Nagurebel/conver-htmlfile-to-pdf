var mysql = require('mysql');
var path = require("path");
var pdf = require('html-pdf');
var fs = require('fs');
var handlebars = require("handlebars");
// var html_to_pdf = require('html-pdf-node');


var con = mysql.createConnection({
  host: "localhost", //host for connection
  user: "root", //default port for mysql
  password: "root", //password for my sql connection
  database: 'sakila'  //data base from which we want  to connect out node  applilcation
});

//executing connection
con.connect(function (err) {
  if (err) throw err;
  console.log("Connected!");
  // result()
});

var prepareHtml = (res) => {//res parameter passed in below function after get the mysql batabase data below written the code for get the mysql data
  // console.log("In this prepareHtml function",res);

  const filePath = path.join(__dirname + '/index.html'); //file path
  const source = fs.readFileSync(filePath, 'utf-8').toString(); //file reading
  const template = handlebars.compile(source);//store file source in template
  for (let i = 0; i < res.length; i++) {
    // console.log(res[i]);
    if (res[i] === 0) {
      console.log("No data found");
    } else {
      const replace = { //replace the mysql data in this variavle
        firstName: res[i].first_name,
        lastName: res[i].last_name,
        lastUpdate: res[i].last_update
      };
      console.log("replace", replace);



      const htmlToSend = template(replace);//pass the repalce object in template 
      // console.log("htmlToSend",htmlToSend);
      var html;
      const d_t = new Date();
      let year = d_t.getFullYear();
      let month = d_t.getMonth();
      let day = d_t.getDate();
      let hour = d_t.getHours();
      let minute = d_t.getMinutes();
      let millisec = d_t.getMilliseconds();

      var baseFileName = `${year}${month}${hour}${minute}${millisec}`;

      // var fileName=`updatefile${year}${month}${hour}${minute}${millisec}.html`
      var fileName = path.join(`updatefile${baseFileName}.html`);
      fs.writeFileSync(fileName, htmlToSend,'utf8', function (err) {
        if (err) {
          return console.log(err);
        }
        console.log("The file was saved!");
        
      });
      html = fs.readFileSync(fileName, 'utf8'); //to your html file
      console.log("html", html);
    // }, 0)
    var options = {
      format: 'Letter',
      timeout: 540000
    };
    var gerrateddoc = `pdfFile${baseFileName}.pdf`
      pdf.create(html, options).toFile(`./${gerrateddoc}`, function (err, res) {
        if (err) return console.log(err);
        console.log(res); // { filename: '/genrateddoc.pdf' } 
      });
   
    }
  }

  


  //single data creating html file and pdf
  
  //   const replacements = { //replace the mysql data in this variavle
  //     firstName: res[0].first_name,
  //     lastName: res[0].last_name,
  //     lastUpdate: res[0].last_update
  //   };
  //   // console.log("replacements",replacements);
  //   const htmlToSend = template(replacements);//pass the repalce object in template 
  //   console.log("htmlToSend",htmlToSend);

  //   var html;


  //   //save the file in hard disc
  //   const d_t = new Date();
  //   let year = d_t.getFullYear();
  // let month = d_t.getMonth();
  // let day = d_t.getDate();
  // let hour = d_t.getHours();
  // let minute = d_t.getMinutes();
  // let millisec =d_t.getMilliseconds();

  // var baseFileName = `${year}${month}${hour}${minute}${millisec}`;

  //   // var fileName=`updatefile${year}${month}${hour}${minute}${millisec}.html`
  //   var fileName=`updatefile${baseFileName}.html`
  //   fs.writeFile(fileName, htmlToSend, function(err) {
  //     if(err) {
  //         return console.log(err);
  //     }
  //     console.log("The file was saved!");
  //     setTimeout(()=>{
  //       html = fs.readFileSync(`./${fileName}`, 'utf8'); //to your html file
  //    console.log("html",html);
  //    },0)
  //    var options = { format: 'Letter' };
  // setTimeout(()=>{
  //   var gerrateddoc=`pdfFile${baseFileName}.pdf`
  //   pdf.create(html, options).toFile(`./${gerrateddoc}`, function(err, res) {
  //     if (err) return console.log(err);
  //     console.log(res); // { filename: '/genrateddoc.pdf' } 
  //   });
  // },0)
  // }); 

}



getMysqlres()
//get the mysql data 
function getMysqlres() {
  const query = "SELECT * FROM sakila.actor"
  con.query(query, (err, res) => {

    prepareHtml(res);//pass the response as parameter in prepareHtml funtion

  })
}