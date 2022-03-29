


let apiUrl = "http://localhost:6009/api";


function createProfile(first, last, username, password, email,phone_number,address,pin) {

    let xhttp = new XMLHttpRequest();

    let messageText = document.getElementById('log-text');
let errorText = document.getElementById('error-text');
    xhttp.onload = function () {


        errorText.innerText = "";
        if (this.status === 200) {
					alert("Successfully created user: " + username);
					let auth = new XMLHttpRequest();
					auth.open("GET",apiUrl + "/auth?username="+username+"&password="+password);
					auth.onload = function () {
						if(this.status === 200){
							token = this.responseText;
							document.cookie = 'authToken='+token;
							let acc1 = new XMLHttpRequest();
							let acc2 = new XMLHttpRequest();
							acc1.open("POST", apiUrl + "/accounts?authToken="+token+"&type=CHECKING");
							acc2.open("POST", apiUrl + "/accounts?authToken="+token+"&type=SAVINGS");
							acc2.onload = function () {
								window.location.href = "MainMenu.html";
							}
							acc1.send();
							acc2.send();
						}
					}
					auth.send();
			}
        else if (this.status === 403) alert("Username already exists.");
        else if (this.status !== 0)alert("Err.. something happened :(");
    };
    xhttp.open("POST", apiUrl+"/user_profiles?first_name=" + first +"&last_name=" + last + "&username=" + username + "&password=" + password +
        "&email=" + email + "&phone_number=" + phone_number + "&address=" + address + "&pin=" + pin, true);
    xhttp.send();
}



function onSignUp() {


let usernameField = document.getElementById('username');
let first_nameField = document.getElementById('first_name');
let last_nameField = document.getElementById('last_name');
let passwordField = document.getElementById('password');
let EmailField = document.getElementById('email');
let AddressField = document.getElementById('address');
let PhoneField = document.getElementById('contact_no');
let PinField = document.getElementById('Pin');
		let first = first_nameField.value;
		let last = last_nameField.value;
    let username = usernameField.value;
    let password = passwordField.value;
    let email = EmailField.value;
    let phone_number = PhoneField.value;
    let address = AddressField.value;
    let pin = PinField.value;
    createProfile(first, last, username, password,email,phone_number,address,pin);
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
