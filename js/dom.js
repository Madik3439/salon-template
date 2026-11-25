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

  let orderCard = createTag('div'); 
  let orderInfo = createTag('div');
  // let priceSpan = createTag('span'); 
  // let orderName = createTag('h3')
  const delBtn = createTag('button'); 
  delBtn.type = 'button'; 
  delBtn.addEventListener('click',function dlt()
  {

  }); 
  orderInfo.appendChild(createTagText('h3', appointment.client))
  orderCard.appendChild(orderInfo);
  orderCard.appendChild(delBtn); 




  cellAction.appendChild(delBtn);
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


export function renderSelectedServices(srArr, listBar)  
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
      const selectedID = Number(delBtn.value)
       srArr =  srArr.filter((item) => 
      { 
        return item.id !== selectedID; 


      });  
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
}
