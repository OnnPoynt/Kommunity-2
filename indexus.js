//variables
const KommunityBtn = document.getElementById("Kommunity");
const businessBtn = document.getElementById("business");
const sportsBtn = document.getElementById("sports");
const technologyBtn = document.getElementById("technology");
const entertainmentBtn = document.getElementById("entertainment");
const searchBtn = document.getElementById("search");


const newsQuery = document.getElementById("newsQuery");
const newstype = document.getElementById("newstype");
const newsdetails = document.getElementById("newsdetails");


//array
var newsDataArr = [];


//api's

const API_KEY = "909bd2bc78a14f208a7f67295a47f51c"
const HEADLINES_NEWS = "https://newsapi.org/v2/top-headlines?country=us&apiKey="
const BUSINESS_NEWS = "https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey="
const SPORTS_NEWS = "https://newsapi.org/v2/top-headlines?country=us&category=sports&apiKey="
const TECHNOLOGY_NEWS = "https://newsapi.org/v2/top-headlines?country=us&category=technology&apiKey="
const ENTERTAINMENT_NEWS = "https://newsapi.org/v2/top-headlines?country=us&category=entertainment&apiKey="
const SEARCH_NEWS = "https://newsapi.org/v2/everything?q=";

window.onload = function(){
    newstype.innerHTML="<h4>Headlines</h4>";
    fetchHeadlines();

};


// generalBtn.addEventListener("click", function(){
//     newstype.innerHTML="<h4>General news</h4>";
//     fetchgeneralnews();
// });

businessBtn.addEventListener("click", function(){
    newstype.innerHTML="<h4>Business news</h4>";
    fetchbusinesslnews();
});

sportsBtn.addEventListener("click", function(){
    newstype.innerHTML="<h4>sports news</h4>";
    fetchsportsnews();
});

technologyBtn.addEventListener("click", function(){
    newstype.innerHTML="<h4>technology news</h4>";
    fetchtechnologytnews();
});

entertainmentBtn.addEventListener("click", function(){
    newstype.innerHTML="<h4>entertainment news</h4>";
    fetchentertainmentnews();
});

searchBtn.addEventListener("click", function(){
    newstype.innerHTML="<h4>search : "+newsQuery.value+"</h4>";
    fetchquerynews();
});


const fetchHeadlines = async () => {
    const response = await fetch(HEADLINES_NEWS+API_KEY);
    newsDataArr = [];
    if(response.status >=200 && response.status < 300) {
        const myJson = await response.json();
        newsDataArr = myJson.articles;
    } else {
        //handle errors
        console.log(response.status, response.statusText);
    }

    displaynews();
}

// const fetchgeneralnews = async () => {
//     const response = await fetch(GENERAL_NEWS+API_KEY);
//     newsDataArr = [];
//     if(response.status >=200 && response.status < 300) {
//         const myJson = await response.json();
//         newsDataArr = myJson.articles;
//     } else {
//         //handle errors
//         console.log(response.status, response.statusText);
//     }
//     displaynews();
// }


const fetchbusinesslnews = async () => {
    const response = await fetch(BUSINESS_NEWS+API_KEY);
    newsDataArr = [];
    if(response.status >=200 && response.status < 300) {
        const myJson = await response.json();
        newsDataArr = myJson.articles;
    } else {
        //handle errors
        console.log(response.status, response.statusText);
    }

    displaynews();
}

const fetchsportsnews = async () => {
    const response = await fetch(SPORTS_NEWS+API_KEY);
    newsDataArr = [];
    if(response.status >=200 && response.status < 300) {
        const myJson = await response.json();
        newsDataArr = myJson.articles;
    } else {
        //handle errors
        console.log(response.status, response.statusText);
    }

    displaynews();
}

const fetchtechnologytnews = async () => {
    const response = await fetch(TECHNOLOGY_NEWS+API_KEY);
    newsDataArr = [];
    if(response.status >=200 && response.status < 300) {
        const myJson = await response.json();
        newsDataArr = myJson.articles;
    } else {
        //handle errors
        console.log(response.status, response.statusText);
    }

    displaynews();
}

const fetchentertainmentnews = async () => {
    const response = await fetch(ENTERTAINMENT_NEWS+API_KEY);
    newsDataArr = [];
    if(response.status >=200 && response.status < 300) {
        const myJson = await response.json();
        console.log(myJson);
        newsDataArr = myJson.articles;
    } else {
        //handle errors
        console.log(response.status, response.statusText);
    }

    displaynews();
}

const fetchquerynews = async () => {

    if(newsQuery.value == null)
    return;
    
    const response = await fetch(SEARCH_NEWS+encodeURIComponent(newsQuery.value)+"&apikey="+API_KEY);
    newsDataArr = [];
    if(response.status >=200 && response.status < 300) {
        const myJson = await response.json();
        newsDataArr = myJson.articles;
    } else {
        //handle errors
        console.log(response.status, response.statusText);
    }

    displaynews();
}

function displaynews() {

    newsdetails.innerHTML = "";

    if(newsDataArr.length == 0){
        newsdetails.innerHTML = "<h5>No data found</h5>"
        return;
    }

    newsDataArr.forEach(news => {

        var date = news.publishedAt.split("T");

        var col = document.createElement('div')
        col.className="col-sm-12 col-md-4 col-lg-3 p-2 card";

        var card = document.createElement('div');
        card.className = "p-2";

        var image = document.createElement('img');
        image.setAttribute("height","matchparnt");
        image.setAttribute("width","100%");
        image.src=news.urlToImage;

        var cardBody = document.createElement('div');

        var newsHeading = document.createElement('h5');
        newsHeading.className = "card-title";
        newsHeading.innerHTML = news.title;

        var dateHeading = document.createElement('h6');
        dateHeading.className = "text-primary";
        dateHeading.innerHTML = date[0];


        var description = document.createElement('p');
        description.className = "text-muted";
        description.innerHTML = news.description;

        var link = document.createElement('a');
        link.className="btn btn-dark";
        link.setAttribute("target", "_blank");
        link.href= news.url;
        link.innerHTML="Read more";

        cardBody.appendChild(newsHeading);
        cardBody.appendChild(dateHeading);
        cardBody.appendChild(description);
        cardBody.appendChild(link);

        card.appendChild(image);
        card.appendChild(cardBody);

        col.appendChild(card);

        newsdetails.appendChild(col);
        
    });
}


// dropdown menu for language change

function myFunction() {
    document.getElementById("myDropdown").classList.toggle("show");
  }
  
  // Close the dropdown menu if the user clicks outside of it
  window.onclick = function(event) {
    if (!event.target.matches('.dropbtn')) {
      var dropdowns = document.getElementsByClassName("dropdown-content");
      var i;
      for (i = 0; i < dropdowns.length; i++) {
        var openDropdown = dropdowns[i];
        if (openDropdown.classList.contains('show')) {
          openDropdown.classList.remove('show');
        }
      }
    }
  }
  