
//create like enter fully-qualified domain name such as wikipedia.org, youtube.com, or bbc.co.uk.
//Sometimes, a website doesn't have any icons at all – or that site might not exist. But in your UI, you may want to still show an icon anyway, and a broken image doesn't look too nice.
//For this reason, we automatically serve a fallback icon

//<img src="https://icon.horse/icon/youtube.com"> -->just load image like this
//display like 10 to compare and the search term


let searchbar = document.querySelector("#searchbar");
let content = document.querySelector(".content");
let searchbtn = document.querySelector(".searchbtn");
let value;


function search(){
     value = searchbar.value.trim();
        if(value!=""){
            //removes http or https if present
            //if https://github.com -> github.com
            //if https://www.w3schools.com -> www.w3schools.com
            if(value.includes("https://")==true ){
                value=value.split("https://")[1]
             } 
              else if(value.includes("http://")==true){
                 value=value.split("http://")[1]
                 console.log(value)
                 }
                 //removes if any extra parameters ,only till xyz.com/...
                 // if enter "https://github.com/inavis/get-thirukural" -> gives github logo
                 // if https://www.w3schools.com/jsref/jsref_includes.asp -> w3schools logo
                if(value.includes("/")){
                    value=value.split("/")[0];
                } 
             
        // console.log(value)
         api(value)
        }else{
            appear("Enter any domain name to search.It cannot be empty")
            // alert("cannot be empty")
        }
    
}

function api(value){
    let url5 =`https://icon.horse/icon/${value}`
fetch(url5)
.then(function(res){
   // console.log(res.url)
   let div = document.createElement("div");
   div.classList="card m-5";
   content.prepend(div)
   let div1 = document.createElement("div");
   div1.className="title"
   div1.innerHTML=value;
   div.appendChild(div1)
   let div2 = document.createElement("div");
   div2.className="icon";
   let img = document.createElement("img");
   img.setAttribute("src",res.url);
   img.setAttribute("height","200px")
   img.setAttribute("width","200px")
   div2.appendChild(img)
   div.appendChild(div2);

   searchbar.value=""
})
.catch(function(err){
    console.log(err);
    appear("Please check the entered URL again or failed to  load the resource");
    // alert("Please check the entered URL again or failed to  load the resource")
})
}

//for error message to appear and disappaear
function appear(value){
    document.querySelector(".message").innerHTML=value;
    document.getElementById("confirm").style.display="block";
    document.querySelector("#searchbar").disabled=true
    document.querySelector(".searchbtn").disabled=true
   
}
function disappear(){
    document.getElementById("confirm").style.display="none";
    searchbar.setAttribute("disabled",false);
    document.querySelector("#searchbar").disabled=false
    document.querySelector(".searchbtn").disabled=false
}

//card positioning