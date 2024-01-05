
//aqui se obtienen los elementos del DOM
let input= document.getElementById("input")
let buton= document.querySelector(".buton")
let Pip=document.querySelector(".IPparrafo") 
let Location=document.querySelector(".Location")
let timeZone=document.querySelector(".timeZone")
let ISP=document.querySelector(".ISP")



let url='https://tile.openstreetmap.org/{z}/{x}/{y}.png'
let map
let urlmapa
let marker




//aqui es el codigo para que cuando se presione la tecla enter haga la misima funcion como cuando se presiona el boton
input.addEventListener('keyup', function(event) {


    if (event.code === 'Enter') {
        event.preventDefault();
        buton.click();
    }
});


//esto es las lineas de codigos para la funcion del boton

buton.addEventListener("click",(event)=>{
    event.preventDefault(); // hace que la pagina no recargue 
   
    let IP=input.value

    

    
//se hace una funcion del mapa para obtener la latitud y longitud  
    function latAndlon(lat,lon){
      
        if (map) {
            map.remove();
        }


        map = L.map('map').setView([lat,lon], 13);
       urlmapa =L.tileLayer(url, {
           maxZoom: 22,
       }).addTo(map);
       
    marker = L.marker([lat, lon]).addTo(map);}



let api_key ="at_LxilfS8MGrDJ8ihPF8AKcCnJjiwkS";//la llave de mi usuario

let urlAPI=`https://geo.ipify.org/api/v2/country,city?apiKey=${api_key}&ipAddress=`+ IP//enlace de mi api

 //aqui se hace una funcion que hara la peticion al api de geocalizacion y si la peticion es exitosa  
 //se llama a funcion del mapa y se le da la latitud y longitud que se obtiene al darle la direccion IP
 async function Geocalizacion (urlAPI){

//aqui este cuadro hara todo si no hay un error al solcitar el api 
try{
     let solicitud = await fetch(urlAPI)
    
     let data= await solicitud.json()
     console.log(data)
     
        Pip.innerHTML=(data.ip)
        Location.innerHTML=(`${data.location.country} ${data.location.region}`)
        timeZone.innerHTML=(`UTC ${data.location.timezone}`)
        ISP.innerHTML=(data.isp)
       latAndlon(data.location.lat,data.location.lng)
     
     

 
}//este lado catch  mandara un mensaje de error en la consola si la peticion no se cumple 
catch{
    console.log("a ocurrido un error en la petición")
      
    Pip.innerHTML=("")

    Location.innerHTML=("")
    timeZone.innerHTML=("")
    ISP.innerHTML=("")
    alert("lo sentimos pero no tenemos esa información")

}

 }


     Geocalizacion(urlAPI)
     


     
})



