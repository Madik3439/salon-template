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
   
  }); 
  row.appendChild(createTagText('td', appointment.client)); 
  row.appendChild(createTagText('td', appointment.master));
  row.appendChild(createTagText('td', appointment.service));
  row.appendChild(createTagText('td', appointment.date)); 
  row.appendChild(createTagText('td', appointment.time)); 
  row.appendChild(createTagText('td', appointment.price)); 
  cellAction.appendChild(delBtn)
  row.appendChild(cellAction);

  return row; 
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
