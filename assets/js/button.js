var inputVal = "";

function getInputValue(){

    var inputVal = document.getElementById("myInput").value;
    localStorage.setItem("storageName",inputVal);
}
