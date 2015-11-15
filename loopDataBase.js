var Firebase = require("firebase");

var myFirebaseRef = new Firebase("https://hackharvard.firebaseio.com/");

myFirebaseRef.push({
  task: "follow iraq"
});

// myFirebaseRef.child("location/city").on("value", function(snapshot) {
//   alert(snapshot.val());  // Alerts "San Francisco"
// });