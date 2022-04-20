const bodyParser = require("body-parser");
const express = require("express");
const https = require("https");
var app = express()
const port = 3000

app.use(express.static(__dirname + '/node_modules/bootstrap/dist'));
app.use(express.static(__dirname));
app.use(bodyParser.urlencoded({extended: true}))

app.get('/', (req, res) => {
    res.sendFile(__dirname + "/index.html")
})

app.post('/', (req,res) => {
    var firstName = req.body.fName
    var lastName = req.body.lName
    var email = req.body.email

    const data = {
        members:[
            {
                email_address : email,
                status: "subscribed",
                merge_fields: {
                    FNAME: firstName,
                    LNAME: lastName
                }
            }
        ]
    }

    const jsonData = JSON.stringify(data)
    

    const url = "https://us14.api.mailchimp.com/3.0/lists/d7eaebc50f"
    const options = {
        method: "POST",
        auth: "dhirajdalvi2001:94ab02028561feacf05d4de05092d82b-us14"
    }

    const request = https.request(url, options, (response) => {
        response.on("data", (data) => {
            console.log(JSON.parse(data));
        })
        // let str = ""

        // response.on('data', function (chunk) {
        //     str += chunk;
        //   });
        
        //   //the whole response has been received, so we just print it out here
        //   response.on('end', function () {
        //     console.log(str);
        //   });

    })

    request.write(jsonData)
    request.end()
})
  
app.listen(port, () => {
    console.log("started");
})

// 94ab02028561feacf05d4de05092d82b-us14
// d7eaebc50f