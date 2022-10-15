/* Getting Data */
/* 
Template
{
    id: ,
    arr: [],
    sheet: ,
},
*/

const infoBook = "2PACX-1vTOQIkSIlop0IKyYaLhp7kW7KRCZKkth2_SolL0m3Bl4WUUi9u5yiLJ7bc4RUkshEoA8JIVhuGsqeq1";
const infoSheets = [
    {
        to: "types",
        arr: [],
        sheet: 1172164589,
    },
    {
        to: "biodiversity",
        arr: [],
        sheet: 528846846,
    },
];
infoSheets.forEach(g => { getCSVData(g.arr, infoBook, g.sheet); });

const descBook = "2PACX-1vSZc_l7YhEN05nfqYUAo4-yK8ODC9Nciy_SL15F2wTNNLD328EZywR1_5CYvV6IdSbEz7lzxqIcIToU";
const gSheets = [
    {
        id: "problems",
        arr: [],
        sheet: 348739149,
    },
    {
        id: "types",
        arr: [],
        sheet: 1872552128,
    },
    {
        id: "biodiversity",
        arr: [],
        sheet: 865407073,
    },
];
gSheets.forEach(g => { 
    getCSVData(g.arr, descBook, g.sheet);
    g.arr.forEach(obj => content(document.getElementById(g.id), obj));
});

/* Scripts */
const sections = document.getElementById("sections");
document.getElementById("ham-menu").onclick = () => {
    (sections.style.display !== "block") 
        ? sections.style.display = "block" 
        : sections.style.display = "none"; 
}

//Fill the website
function content(sec, obj){
    //Make the thumbnails
    let photoCon = document.getElementById("photo-con-temp").cloneNode(true); 
    photoCon.id = obj.id;
    photoCon.setAttribute("target-modal", `${obj.id}-modal`);

    //Fill with content
    //Image
    let imgSrc = `https://drive.google.com/uc?export=download&id=${obj.img}`;

    let photo = photoCon.getElementsByClassName("photo")[0]; 
    photo.src = imgSrc;
    photo.alt = obj.topic;

    photoCon.getElementsByClassName("title-card")[0].getElementsByTagName("h6")[0].innerHTML = obj.topic; //Title Card

    //Add event listeners
    photoCon.onclick = () => {
        document.getElementById(`${obj.id}-modal`).style.display = "block";
    }
    
    //Make photo gallery subsections    
    //Type section
    if(
        sec.id === "types" 
        && sec.getElementsByClassName(obj.type)[0] === undefined
    ){
        div = document.createElement("div");
        div.classList.add(obj.type);

        let h4 = document.createElement("h4");
        h4.innerHTML = obj.type;
        div.appendChild(h4);

        sec.appendChild(div);
    }

    //Taxon section
    if(
        (sec.id === "types" && sec.getElementsByClassName(obj.type)[0].getElementsByClassName(obj.taxon)[0] === undefined) 
        || (sec.id === "biodiversity" && sec.getElementsByClassName(obj.taxon)[0] === undefined)
    ){
        let div = document.createElement("div");
        div.classList.add(obj.taxon);

        let h5 = document.createElement("h5");
        h5.innerHTML = obj.taxon;
        div.appendChild(h5);

        //Gallery section
        let gallery = document.createElement("div");
        gallery.classList.add("gallery");
        div.appendChild(gallery);

        (sec.id === "types") ? sec.getElementsByClassName(obj.type)[0].appendChild(div) : sec.appendChild(div);
    }

    //Gallery section
    if(
        (sec.id !== "types" && sec.id !== "biodiversity") 
        && sec.getElementsByClassName("gallery")[0] === undefined
    ){
        let gallery = document.createElement("div");
        gallery.classList.add("gallery");
        sec.appendChild(gallery);
    }

    //Append to the right section
    switch(sec.id){
        case "types":
            sec.getElementsByClassName(obj.type)[0].getElementsByClassName(obj.taxon)[0].getElementsByClassName("gallery")[0].appendChild(photoCon);
            break;
        case "biodiversity":
            sec.getElementsByClassName(obj.taxon)[0].getElementsByClassName("gallery")[0].appendChild(photoCon);
            break;
        default:
            sec.getElementsByClassName("gallery")[0].appendChild(photoCon);
            break;
    }
    
    //Make the modals
    let infoModal = document.getElementById("info-modal-temp").cloneNode(true); 
    infoModal.id = `${obj.id}-modal`;

    //Fill with content
    //Image
    let infoPhoto = infoModal.getElementsByClassName("info-photo")[0]; 
    infoPhoto.src = imgSrc;
    infoPhoto.alt = obj.topic;

    //Info Text
    let infoTxt = infoModal.getElementsByClassName("info-text")[0];
    infoTxt.getElementsByTagName("h5")[0].innerHTML = obj.topic;
    infoTxt.getElementsByClassName("description")[0].innerHTML = obj.description;

    //Info 
    let infoGroup = infoSheets.find(g => g.to === sec.id);
    if(infoGroup !== undefined){
        let info = infoGroup.arr.find(r => r.to === obj.id);
        console.log(info);
        let k = Object.getOwnPropertyNames(info);
        for(let i = 1; i < k.length; i++){
            let v = document.createElement("li");
            v.innerHTML = `${k[i]}: ${info[`${k[i]}`]}`;
            infoTxt.getElementsByClassName("info")[0].appendChild(v);
        }
    }

    //Sources
    let sources = obj.sources.split(" ");
    sources.forEach(s => {
        let li = document.createElement("li");
        li.innerHTML = `<a href="${s}">${s}</a>`;
        infoModal.getElementsByClassName("sources")[0].appendChild(li);
    });

    //Controls
    infoModal.getElementsByClassName("exit")[0].onclick = () => { infoModal.style.display = "none"; }

    infoModal.getElementsByClassName("prev")[0].onclick = () => {
        infoModal.style.display = "none";
        //Display previous modal
    }

    infoModal.getElementsByClassName("next")[0].onclick = () => {
        infoModal.style.display = "none";
        //Display next modal
    }
    
    sec.getElementsByClassName("info-sec")[0].appendChild(infoModal); //Append to the right section
    
    return;
}