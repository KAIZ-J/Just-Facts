 const container = document.getElementById("container-main");
        const favPage = document.getElementById("fav-page");
        const favPageContainer = document.getElementById("container-favs")
        function addToContainer(array){
    container.innerHTML="";
    array.forEach(el=>{
        container.innerHTML+=`<div class="card" id="${el.id}">${el.text}</div>`
    })
   
      }
       let factsArray = [];
       let favoriteFactsArray = [];
        let currentId;
        async function getFacts() {
            for(let i=0;i<100;i++){
            try{
                let response = await fetch("https://uselessfacts.jsph.pl/api/v2/facts/random?language=en")
    let data = await response.json();
   if(data.text.length<100 && factsArray.some(el=>data.id===el.id)===false){
    data["isLiked"]=false;
factsArray.push(data);
   }
   
addToContainer(factsArray);
            }
            catch(err){
                 console.log("coundn't fetch")
            }
             const observer = new IntersectionObserver((entries)=>{ 
              entries.forEach((entry)=>{
              if(entry.isIntersecting){
             currentId = entry.target.id;
             let index = factsArray.findIndex(el=>el.id===currentId);
            
            let currentFactObj = factsArray[index];
             currentFactObj.isLiked?document.querySelector(".like-btn").classList.add("liked"):document.querySelector(".like-btn").classList.remove("liked");
             currentFactObj.isFav?document.querySelector(".fav-btn").classList.add("faved"):document.querySelector(".fav-btn").classList.remove("faved");
               }
             })
             },{})
            const cards = document.querySelectorAll('.card');
             cards.forEach(el => observer.observe(el));
            }
            
        }
        
        getFacts();
   
         
      function likeFact(elem){
        let fact  = document.getElementById(currentId);
        if(fact!==null){
            
            let index = factsArray.findIndex(el=>el.id===currentId);
            
            let currentFactObj = factsArray[index];
            currentFactObj.isLiked?currentFactObj.isLiked=false:currentFactObj.isLiked=true;
            currentFactObj.isLiked?elem.classList.add("liked"):elem.classList.remove("liked");
            console.log(currentFactObj.isLiked)
        }
      }
      // function favFact(elem){
      //   let fact  = document.getElementById(currentId);
      //   if(fact!==null){      
      //       let index = factsArray.findIndex(el=>el.id===currentId);
      //        let index2 = favoriteFactsArray.findIndex(el=>el.id===currentId);
      //       let currentFactObj = factsArray[index];
      //       currentFactObj.isFav?currentFactObj.isFav=false:currentFactObj.isFav=true;
      //       currentFactObj.isFav?elem.classList.add("faved"):elem.classList.remove("faved");
      //       currentFactObj.isFav?favoriteFactsArray.push(currentFactObj):favoriteFactsArray.splice(index2,1)
      //       console.log(favoriteFactsArray)
      //   }
      // }
     async function shareFact(){
         let fact  = document.getElementById(currentId);
        if(fact!==null){      
            let index = factsArray.findIndex(el=>el.id===currentId);
               let currentFactObj = factsArray[index];
       const shareData = {
        title: "JustFacts",
  text: `${currentFactObj.text}`,
  url: "https://faiz-justfacts.netlify.app",
       }
       try{
     await navigator.share(shareData)
       }
       catch(err){
    alert("Error:Fact Couldn't be Shared,Try Again!")
       }
        }
      }
     function copyFact(elem){
         let fact  = document.getElementById(currentId);
        if(fact!==null){      
            let index = factsArray.findIndex(el=>el.id===currentId);
               let currentFactObj = factsArray[index];
               setTimeout(()=>{elem.className="fa-solid fa-check"},100)
               setTimeout(()=>{elem.className="fa-solid fa-copy"},700)
      navigator.clipboard.writeText(currentFactObj.text)}
      }
    //   function openPage(){
    //     favPage.style.transform="translateX(0%)";
    //      favPageContainer.innerHTML="";
    //      favoriteFactsArray.forEach(el=>{
    //     favPageContainer.innerHTML+=`<div class="fav-card" id="${el.id}">${el.text}</div>`
    // })
    //   }
    //   function closePage(){
    //     favPage.style.transform="translateX(100%)"
    //   }