const firebaseConfig = {
  apiKey: "AIzaSyDmSFXwd7OB6Ad1Af_VjijsCIqwSel-k4A",
  authDomain: "cat-or-not-32dac.firebaseapp.com",
  databaseURL: "https://cat-or-not-32dac-default-rtdb.firebaseio.com",
  projectId: "cat-or-not-32dac",
  storageBucket: "cat-or-not-32dac.appspot.com",
  messagingSenderId: "1068681029364",
  appId: "1:1068681029364:web:53b261a35ad6b9f00560a1",
  measurementId: "G-QEB97SRBX8"
};

  firebase.initializeApp(firebaseConfig);

  var fileText = document.querySelector(".fileText");
  var uploadPercentage = document.querySelector(".uploadPercentage");
  var progress = document.querySelector(".progress");
  var percentVal;
  var fileItem;
  var fileName;
  var img = document.querySelector(".img");
   function getFile(e){
    fileItem = e.target.files[0];
    fileName = fileItem.name;
    fileText.innerHTML = fileName;
   }
  
  function uploadImage(){
    let storageRef = firebase.storage().ref("images/"+fileName);
    let uploadTask = storageRef.put(fileItem);

    uploadTask.on("state_changed",(snapshot)=>{
        console.log(snapshot);
        percentVal = Math.floor((snapshot.bytesTransferred/snapshot.totalBytes)*100);
        console.log(percentVal);
        uploadPercentage.innerHTML = percentVal + "%";
        progress.style.width=percentVal+"%";
    },(error)=>{
        console.log("Error is ", error);
    },()=>{
        uploadTask.snapshot.ref.getDownloadURL().then((url)=>{
            console.log("URL",url);

            if(url !=""){
                img.setAttribute("src",url)
                img.style.display="block";
            }
        })

    })
  }
