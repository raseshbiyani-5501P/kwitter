var firebaseConfig = {
  apiKey: "AIzaSyBqOYBORWlGuWNVuT-vVIullWbBGWxIOGY",
  authDomain: "newpew-abcb4.firebaseapp.com",
  databaseURL: "https://newpew-abcb4.firebaseio.com",
  projectId: "newpew-abcb4",
  storageBucket: "newpew-abcb4.appspot.com",
  messagingSenderId: "949329081940",
  appId: "1:949329081940:web:e65641ae4284c415addfc1",
  measurementId: "G-T98V7TFQ2J"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

user_name = localStorage.getItem("user_name");
room_name = localStorage.getItem("room_name");
console.log(room_name);

function send() {
  msg = document.getElementById("msg").value;
  firebase.database().ref(room_name).push({
    name: user_name,
    message: msg,
    like: 0
  });

  document.getElementById("msg").value = "";
}
//making a function to get the data from the database
function getData() {
  firebase.database().ref("/" + room_name).on('value', function (snapshot) {
    document.getElementById("output").innerHTML = "";
    snapshot.forEach(function (childSnapshot) {
      childKey = childSnapshot.key;
      childData = childSnapshot.val();
      if (childKey != "purpose") {
        firebase_message_id = childKey;
        message_data = childData;

        //start code
        //getting the datafrom the database

        console.log(message_data);
        
        name = message_data['name']; //keyfolder was name
        message = message_data['message']; //keyfolder was message
        like = message_data['like']; //keyfolder was like
        row = "<h4> " + name + "<img class='user_tick' src='tick.png'></h4><h4 class='message_h4'>" + message + "</h4><button class='btn btn-warning' id='" + firebase_message_id + "' value='" + like + "' onclick='updateLike(this.id)'><span class='glyphicon glyphicon-thumbs-up'>Like: " + like + "</span></button><hr>";
        document.getElementById("output").innerHTML += row;


        //end code
      }
    });
  });
}
//calling the function
getData();

function updateLike(message_id) {
  button_id = message_id;
  likes = document.getElementById(button_id).value; //getting the value form id
  likes_in_number = Number(likes) + 1; //converting it into number format
  console.log(likes_in_number);

  firebase.database().ref(room_name).child(message_id).update({
    like: likes_in_number  //update the likes on database
  });

}

function logout() {
  localStorage.removeItem("user_name");
  localStorage.removeItem("room_name");
  window.location.replace("kwitter.html");
}
