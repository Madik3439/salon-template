export function JSONformater(key, value)
{
    localStorage.setItem(key, JSON.stringify(value)); 
} 




// import { appointments  } from "./main";
// localStorage.setItem("appointments", JSON.stringify(appointments)); 
// export const data = JSON.parse(localStorage.getItem("appointments"))||[];