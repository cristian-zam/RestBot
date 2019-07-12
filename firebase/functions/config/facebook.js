
const requestAPI = require('request-promise');
var userfirstname = "";
function facebook (user_id){
        return requestAPI("https://graph.facebook.com/" +
        user_id + "?fields=first_name&access_token=" +
        "EAAGnCGRLF7QBAGZCid09swCLGkM6pZBHLQCpw9LOxdUiotiLwmNZCRwhpsddZAE8lRHqA9qU6n6d73cBWFJ8buKgsR582hBXCj6cwZCW9oeYAyCH3toLmWoF81Yajp7KLKK2SyF8B7DsMD9jo4kBDyvljdrVT0ZCMZCjpAzoD8atRjLxEd6qC0B")
        .then(function (data) {
            let username = JSON.parse(data);
            userfirstname = username.first_name;
            console.log(userfirstname)
        });
    }
facebook("2204015836310926");
console.log(userfirstname);