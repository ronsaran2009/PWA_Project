db = firebase.firestore();
function viewRestList(){
    window.location.replace("rest.html");
}
function randomRest(){
    let restList = [];
    db.collection("restaurant").onSnapshot(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
            restList.push(doc.id)
            console.log(restList)
            if (restList.length == querySnapshot.size) {
                ans = restList[Math.floor(Math.random() * restList.length)];
                console.log(ans)
                window.alert(ans)
            }
        })
    });
}
function randomMenu(){
    let restList = [];
    let menuList = [];
    db.collection("restaurant").onSnapshot(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
            restList.push(doc.id)
            mapKey = doc.data().food
            for ( var property in mapKey ) {
                if(!menuList.includes(property)){
                    console.log( property ); 
                    menuList.push(property);
                }
              }
            console.log(menuList)
            if (restList.length == querySnapshot.size) {
                ans = menuList[Math.floor(Math.random() * menuList.length)];
                console.log(ans)
                window.alert(ans)
            }
        })
    });
}