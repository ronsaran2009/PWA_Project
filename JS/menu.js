db = firebase.firestore();
let restName = localStorage.getItem("rest")
document.getElementById("rest_name").innerHTML = restName

showMenu()

function addBtn() {
    window.location.replace("addmenu.html");
}

function showMenu() {
    let menuContent = "";
    let count = 0
    db.collection("restaurant").doc(restName).get().then(function (doc) {
        menuMap = doc.data().food
        for (var property in menuMap) {
            console.log(property);
            let content = '<div class="paragraph1">' +
                '<div class="container">' +
                '<div class="row rowFrom" style="padding-top:2% ;">' +
                '<div class="col-12 text-white">' +
                property +
                '</div>' +
                '</div>' +
                '</div>' +
                '</div>'
            menuContent = menuContent.concat(content)
            count++
            if (count == getMapSize(menuMap)) {
                console.log(menuContent)
                document.getElementById("menu_content").innerHTML = menuContent;
                document.getElementById("loadingIcon").setAttribute("style", "display:none;")
            }
        }
        console.log(menuList)
    });
}

function menuRandom() {
    let menuList = [];
    db.collection("restaurant").doc(restName).get().then(function (doc) {
        menuMap = doc.data().food
        for (var property in menuMap) {
            console.log(property);
            menuList.push(property);
            count++
            if (count == getMapSize(menuMap)) {
                ans = menuList[Math.floor(Math.random() * menuList.length)];
                console.log(ans)
                window.alert(ans)
            }
        }
    });
}

function getMapSize(x) {
    var len = 0;
    for (var count in x) {
        len++;
    }

    return len;
}