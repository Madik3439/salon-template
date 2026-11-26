import { Appointment } from "./appointments.js";
import {createRow } from "./dom.js";
import { createCard  } from "./dom.js";
import { JSONformater } from "./storge.js";
import { renderAppoinment } from "./dom.js";
export let tableBody = document.querySelector('tbody');
import { getMasterServices } from "./appointments.js";
import { renderService } from "./dom.js";
import {getPriceFromInput} from './appointments.js'
import {renderSelectedServices} from './dom.js'
import {throwServiceName} from './appointments.js'

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
    let selectedServicesList = document.getElementById('selected-services-list');
    let cardContainer = document.getElementById('card-container'); 
   const masterServices = [
    { id: 1, master_id: 1, name: "Маникюр", price: 5000 },
    { id: 2, master_id: 1, name: "Дизайн", price: 1500 },
    { id: 3, master_id: 2, name: "Маникюр", price: 6000 },
    { id: 4, master_id: 2, name: "Наращивание", price: 8000 },
    { id: 5, master_id: 3, name: "Маникюр", price: 4500 }
    ];
    let selectedServices = []; 
    let resultedServices = []


  function createAppointment() 
  {   
   
    let parsedPrice = parseInt(price.value); 
    let collectedService = throwServiceName(selectedServices)

    if(Number.isNaN(parsedPrice) || parsedPrice <= 0 
    || client.value.trim() === "" 
    || master.value.trim() === "" 
    || selectedServices.length === 0
    || date.value.trim() ==="" 
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
      master.options[master.selectedIndex].textContent.trim(),
      collectedService,
      date.value.trim(),
      time.value.trim(),
      parsedPrice
    )

      return appointment; 
    }
  
  } 
  masterSelect.addEventListener('change', () => 
  {  
    selectedServices = []; 
    selectedServicesList.replaceChildren();
    const selectedID = Number(masterSelect.value); 
    resultedServices = getMasterServices(selectedID, masterServices)

    console.log(resultedServices); 

    renderService(resultedServices, serviceList)
    price.value = 0
  });
  function deleteService(serviceId) 
  {   
      selectedServices = selectedServices.filter(item => 
      {
        return item.id !== serviceId; 
      }); 
      price.value = getPriceFromInput(selectedServices);
      renderSelectedServices(selectedServices, selectedServicesList, deleteService ); 
  }
  serviceList.addEventListener('change',() => 
  { 
    const selectedServiceId = Number(serviceList.value); 
    const selectedService = resultedServices.find((item) => 
    { 
      return item.id === selectedServiceId; 
    }); 
    if(!selectedService)
    { 
      return; 
    }
    else
    { 
      const allReadyAdded = selectedServices.some((item) => 
      { 
        return item.id ===  selectedServiceId; 
      }); 

      if(allReadyAdded === true) 
      { 
        alert("Данный заказ уже выбран !"); 
      }
      else 
      { 
        selectedServices.push(selectedService)  
        console.log(selectedServices); 
      }
    }
    price.value = getPriceFromInput(selectedServices);
    
    renderSelectedServices(selectedServices,selectedServicesList,deleteService);

  }); 
  formEvent.addEventListener('submit', function(event) 
  { 
    event.preventDefault(); 
    let createdResult = createAppointment(); 
  
    if (typeof createdResult === "object" && createdResult !== null )
    {  
      const createdRow = createRow(createdResult);
      tableBody.appendChild(createdRow); 
      const createdCard = createCard(createdResult); 
      cardContainer.appendChild(createdCard); 
      
      appointments.push(createdResult); 
      JSONformater('appointments', appointments);
      console.log(localStorage);
      formEvent.reset(); 
    }
    console.log(appointments); 
  }); 

renderAppoinment(); 
}
);