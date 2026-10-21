import { Appointment } from "./appointments.js";
import { createRow } from "./dom.js";
import { JSONformater } from "./storge.js";
import { renderAppoinment } from "./dom.js";
export let tableBody = document.querySelector('tbody');
document.addEventListener('DOMContentLoaded', function main() 
{ 
    let client = document.getElementById('client'); 
    let master = document.getElementById('master'); 
    let service = document.getElementById('service'); 
    let date = document.getElementById('date'); 
    let time = document.getElementById('time'); 
    let price = document.getElementById('price'); 
    let formEvent = document.getElementById('appointmentForm');

   

   const appointments = JSON.parse(localStorage.getItem(('appointments')))|| []; ; 


  function createAppointment() 
  {   
   
    let parsedPrice = parseInt(price.value); 

    if(Number.isNaN(parsedPrice) || parsedPrice <= 0 
    || client.value.trim() === "" 
    || master.value.trim() === "" 
    ||  service.value.trim() === "" 
    ||  date.value.trim() ==="" 
    || time.value.trim() === "") 
    {   
    
      let error = "Incorrect data !";
      alert(error);
      return error; 

    }   
    else
    { 
      const appointment = new Appointment(

      client.value.trim(), 
      master.value.trim(),
      service.value.trim(),
      date.value.trim(),
      time.value.trim(),
      parsedPrice
    )

      return appointment; 
    }
  
  }
   


  formEvent.addEventListener('submit', function(event) 
  { 
    event.preventDefault(); 
    let createdResult = createAppointment(); 
  
    if (typeof createdResult === "object" && createdResult !== null )
    {  
      const createdRow = createRow(createdResult);
      appointments.push(createdResult); 
      tableBody.appendChild(createdRow);



      JSONformater('appointments', appointments);
      console.log(localStorage);
      formEvent.reset(); 
    }
    console.log(appointments); 
  }); 

renderAppoinment(); 
}
);




