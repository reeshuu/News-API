let newsAccordian = document.getElementById('newsAccordian');
let alrt=document.getElementById('alrt');
let shw="";
let alerts=['danger','primary','secondary','success','warning','info','light','dark'];
let ctr=0;
setInterval(() => {
shw=`<div class="alert alert-${alerts[ctr]}" role="alert">
  <h3><center><a href="#" class="alert-link">! BREAKING NEWS !</a></center></h3>
</div>`;

    alrt.innerHTML=shw;
    ctr++;
if(ctr==alerts.length){
    ctr=0;
}
}, 500);


let api = "API Key"; //generate and enter the API Key
const xhr = new XMLHttpRequest();
xhr.open('GET', `https://newsapi.org/v2/top-headlines?country=in&apiKey=${api}`, true);
xhr.onload = function () {
    if (this.status == 200) {
        let json = JSON.parse(this.responseText);
        let articles = json.articles;
        console.log(json);
        let html = "";
        articles.forEach(function(element,index){
            html += `
                <div class="accordion-item">
                <h2 class="accordion-header" id="panelsStayOpen-heading${index}">
                <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapse${index}" aria-expanded="true" aria-controls="panelsStayOpen-collapse${index}">
                   ${element["title"]}
                </button>
                </h2>
                <div id="panelsStayOpen-collapse${index}" class="accordion-collapse collapse" aria-labelledby="panelsStayOpen-heading${index}">
                <div class="accordion-body">
                    ${element["content"]}. <a href="${element["url"]}">Read More.</a>
                </div>
                </div>
                </div>
                `;
            });

        newsAccordian.innerHTML = html;
    }
    else {
        console.log('ERROR');
    }

}
xhr.send();
