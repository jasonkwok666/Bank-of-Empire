let accountArea = document.getElementById("account-area");
let userProfile = document.getElementById("user-profile");
let accountType = document.getElementById("account-select");
let token = getCookie("authToken");

let apiUrl = "http://localhost:6009/api";

window.onload = loadAccounts();

function loadAccounts() {

    let xhttp = new XMLHttpRequest();
    xhttp.onload = function () {
        if (this.status === 200) {

            accountArea.innerHTML = "";

            let json = JSON.parse(this.response);

            let exist = false;

            for (var key in json) {
                if (json.hasOwnProperty(key)) {
                    let account_id = json[key]["account_id"];
                    let type = json[key]["type"];
                    let balance = json[key]["balance"];
                    accountArea.innerHTML += create_html_account(account_id, type, balance);
                    exist = true;
                }
            }

            if (!exist) {
                accountArea.innerHTML = "No accounts found."
            }
        }
    };
    xhttp.open('GET', apiUrl + '/accounts?authToken=' + token, false);
    xhttp.send();

    xhttp = new XMLHttpRequest();
    xhttp.onload = function () {
        if (this.status === 200) {
            let json = JSON.parse(this.response);
            userProfile.innerText = json['username'];
            userProfile.innerText = this.responseText;
        }
    };
    xhttp.open("GET", apiUrl + "/user_profiles?authToken=" + token, true);
    xhttp.send();
}


function onCreateAccount() {

    let type = accountType.options[accountType.selectedIndex].text;

    let xhttp = new XMLHttpRequest();
    xhttp.onload = function () {
        if (this.status === 200) {
            M.toast({html: "Created new " + type + " account."});
            loadAccounts();
        }
    };
    xhttp.open("POST", apiUrl + "/accounts?type=" + type + "&authToken=" + token, true);
    xhttp.send();
}


function create_html_account(account_id, type, balance) {
    return "<div class=\"card-panel light-green lighten-1\">\n" +
        "                        <p>Account id: " + account_id + "</p>\n" +
        "                        <div class=\"row\">\n" +
        "                            <div class=\"col m6\"><p>" + type + "</p></div>\n" +
        "                            <div class=\"col m6 right-align\"><p>Balance : " + balance + "</p></div>\n" +
        "                        </div>\n" +
        "                    </div>" +
        "";
}


function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) === ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) === 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}
