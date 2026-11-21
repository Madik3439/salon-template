import { Appointment } from "./appointments.js";
import { createRow } from "./dom.js";
import { JSONformater } from "./storge.js";
import { renderAppoinment } from "./dom.js";
export let tableBody = document.querySelector('tbody');
import { getMasterServices } from "./appointments.js";
import { renderService } from "./dom.js";
document.addEventListener('DOMContentLoaded', function main() 
{ 
    let client = document.getElementById('client'); 
    let master = document.getElementById('master'); 
    let service = document.getElementById('service'); 
    let date = document.getElementById('date'); 
    let time = document.getElementById('time'); 
    let price = document.getElementById('price'); 
    let formEvent = document.getElementById('appointmentForm');
    let masterSelect = document.getElementById('master'); 
    let serviceList = document.getElementById('service'); //!!!
    const appointments = JSON.parse(localStorage.getItem(('appointments')))|| []; ; 

   const masterServices = [
    { id: 1, master_id: 1, name: "Маникюр", price: 5000 },
    { id: 2, master_id: 1, name: "Дизайн", price: 1500 },
    { id: 3, master_id: 2, name: "Маникюр", price: 6000 },
    { id: 4, master_id: 2, name: "Наращивание", price: 8000 },
    { id: 5, master_id: 3, name: "Маникюр", price: 4500 }
    ];




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
   
  
  masterSelect.addEventListener('change', () => 
  {   
    const selectedID = Number(masterSelect.value); 
    let resultedService = getMasterServices(selectedID, masterServices)

    console.log(resultedService); 

    renderService(resultedService, serviceList)
  });


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




