db = firebase.firestore();
localStorage.removeItem("rest");
showrestaurant();

function showrestaurant() {
    let allcontent = "";
    let count = 0;
    db.collection("restaurant").onSnapshot(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
            let star = 0;
            let allstar = 0;
            let starremainder = 0;
            let starcontent = "";

            for( i = 0; i < doc.data().star.length; i++){
                allstar += doc.data().star[i];
            }
            star = Math.floor(allstar/doc.data().star.length);
            starremainder = (((allstar/doc.data().star.length)-star)*10);
            console.log("all"+doc.data().star)
            console.log("star"+star)
            console.log("/"+allstar/doc.data().star.length)
            console.log("%"+(((allstar/doc.data().star.length)-star)*10))
            for( i = 0; i < star; i++){
                starcontent = starcontent.concat('<span class="fas fa-star star"></span>');
            }
            if(starremainder >= 5){
                starcontent = starcontent.concat('<span class="fas fa-star-half-alt star"></span>');
                star += 1;
            }
            if(5-star > 0){
                for( i = 0; i < 5-star; i++){
                    starcontent = starcontent.concat('<span class="far fa-star star"></span>');
                }
            }

            let content = '<button class="paragraph1" id="rest' + doc.id + '" onclick = "restClick('+ "'" + doc.id + "'" + ')">' +
                '<div class="container">' +
                '<div class="row rowFrom" style="padding-top:2% ;">' +
                '<div class="col-12 text-white">' +
                doc.id +
                '</div>' +
                '</div>' +
                '<div class="row rowFrom" style="padding-top:2% ;">' +
                '<div class="col-12 text-white">' +
                doc.data().type +
                '</div>' +
                '</div>' +
                '<div class="row rowFrom" style="padding-top:2% ;">' +
                '<div class="col-12">' +
                '<div id="star">' +
                starcontent
                '</div>' +
                '</div>' +
                '</div>' +
                '</div>' +
                '</button>'
            allcontent = allcontent.concat(content)
            count++
            
            if (count == querySnapshot.size) {
                console.log(allcontent)
                document.getElementById("rest_content").innerHTML = allcontent;
                document.getElementById("loadingIcon").setAttribute("style", "display:none;")
            }
        })
    });
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
                restClick(ans)
            }
        })
    });
}

function restClick(id){
    // var r = confirm("ผลลัพธ์ของคุณคือออออ  ' " + id + " ' คุณจะเอาหรือไม่?");
    // if (r == true) {
    //   localStorage.setItem("rest", id)
    // window.location.replace("menu.html");
    // }
    localStorage.setItem("rest", id)
    window.location.replace("menu.html");
}
function addBtn(){
    window.location.replace("addrest.html");
}