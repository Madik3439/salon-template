
export function Appointment(client, master, service, date, time, price)  
{ 
    this.client = client; 
    this.master = master; 
    this.service = service; 
    this.date = date; 
    this.time = time; 
    this.price = price; 
}
 export function getMasterServices(masterId, data)
{
    const result = data.filter((item) => 
    {   
        return item.master_id === masterId; 
    }
    )    
    const resultedService = result.map((item) => 
    { 
        return { 
            id: item.id, 
            name:item.name, 
            price: item.price 
        }
    });   
    return resultedService; 
}

export function getPriceFromInput(tooPrice) 
{   
    let getResult = tooPrice.reduce((result,item) => 
    { 
        return result += item.price; 
    },0 ); 
    return getResult
} 
export function throwServiceName(tooName)
{ 
    let getResult = tooName.map(( item) => 
    { 
        return item.name; 
    })
    return getResult; 
}