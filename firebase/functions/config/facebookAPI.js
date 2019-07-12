
const requestAPI = require('request-promise');

module.exports = {
    callApiFacebook: function(user_id){
        return requestAPI("https://graph.facebook.com/" +
        user_id + "?fields=first_name&access_token=" +
        "EAAK4XIvoEDYBAN9Evy9Xz1zlq3vmd7QFMkfZBKYdEZB6usD6wxxzZCZB3OGI7uIjc1psVakKRyxU60INSZCFUCRTqlWfawMiZClgYAciAJ1ftejPrWoXbZCYQ64GiXvVrWl91ofkoZAJHpd8Vyb19K7vLAqN0kNlW0gcBK57s09WiwZDZD")
        .then(function (data) {
            let username = JSON.parse(JSON.stringify(data));
            username = username.first_name;
            console.log(username)
            return username;
        });
    }
}