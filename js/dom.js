import { tableBody } from "./main.js";

export function createTagText(tag, text) 
{ 
  const element = document.createElement(tag)
  element.textContent = text; 
  return element; 
}
export function createTag(tag) 
{ 
  return document.createElement(tag)
}
export function  createRow(appointment) 
{ 
  const row = createTag('tr'); 
  const cellAction = createTag('td');
  const delBtn = createTag('button');

  delBtn.textContent = "Delete"; 

  delBtn.classList.add('delete-btn'); 
  delBtn.type = 'button'; 

  delBtn.addEventListener('click',function dlt()
  { 
    localStorage.clear();
  }); 



  row.appendChild(createTagText('td', appointment.client)); 
  row.appendChild(createTagText('td', appointment.service));
  row.appendChild(createTagText('td', appointment.master));
  row.appendChild(createTagText('td', appointment.date)); 
  row.appendChild(createTagText('td', appointment.time)); 
  row.appendChild(createTagText('td', appointment.price)); 
  cellAction.appendChild(delBtn)
  row.appendChild(cellAction);

  return row; 
}
export function createCard(appointment) 
{  
  const appCard = createTag('div'); 
  const appCardBody = createTag('div');
  const appCardAction = createTag('div');

  appCardAction.classList.add('appointment-card-actions"')
  appCardBody.classList.add('appointment-card-body');
  appCard.classList.add('appointment-card');
  
  const delBtn = createTag('button');
  delBtn.classList.add('delete-appointment')
  delBtn.textContent = "Delete"; 
  delBtn.classList.add('delete-btn'); 
  delBtn.type = 'button'; 
  delBtn.addEventListener('click',function dlt()
  { 
    localStorage.clear();
  }); 
  const cardAction = createTag('div'); 
  
 
  appCardBody.appendChild(createTagText('p', appointment.client));
  appCardBody.appendChild(createTagText('p', appointment.service)); 
  appCardBody.appendChild(createTagText('p', appointment.master));
  appCardBody.appendChild(createTagText('p', appointment.date));
  appCardBody.appendChild(createTagText('p', appointment.time));
  appCardBody.appendChild(createTagText('p', appointment.price));
  cardAction.appendChild(delBtn);
  appCardAction.appendChild(cardAction);

  appCard.appendChild(createTagText('h3', "Информация записи")); 
  appCard.appendChild(appCardBody);
  appCard.appendChild(appCardAction);
  return appCard; 
}
export function renderService(srArr, listBar) 
{
  listBar.replaceChildren(); 
    const takelessOption = createTagText('option', "Выберите услугу");
    takelessOption.disabled = true; 
    takelessOption.selected = true;
    listBar.appendChild(takelessOption);  
  srArr.forEach(item => 
  {  
    
    const option = createTagText('option',`${item.name} --- ${item.price}KZT`);

    option.value = item.id; 

   
    listBar.appendChild(option); 
  });
}
export function renderSelectedServices(srArr, listBar, deleteService)  
{ 
  listBar.replaceChildren(); 
  srArr.forEach( item => 
  { 
    const renderedService = createTagText('div',`${item.name} --- ${item.price}KZT`);
    const delBtn = createTag('button');
    delBtn.textContent = "Delete"; 
    delBtn.classList.add('delete-btn'); 
    delBtn.type = 'button'; 
    delBtn.value = item.id; 


    delBtn.addEventListener('click',function dlt()
    { 
      deleteService(Number(delBtn.value))
    }); 
    listBar.appendChild(renderedService);
    listBar.appendChild(delBtn)

  });


}
export function renderAppoinment()
{   
  
  const JSONrowRander  = JSON.parse(localStorage.getItem('appointments')) || [];
  JSONrowRander.forEach((item) => 
  {  
    const rowRandered = createRow(item); 
    tableBody.appendChild(rowRandered); 
  }); 

  // const JSONcardRander  = JSON.parse(localStorage.getItem('appointments')) || [];
  // JSONcardRander.forEach((item) => 
  //   {  
  //     const cardRandered = createCard(item); 
  //     cardContainer.appendChild(cardRandered); 
  // });
} 
