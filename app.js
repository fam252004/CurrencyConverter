document.getElementById('converter-form').addEventListener('submit',async function(e){
    e.preventDefault();
    const amount=document.getElementById('amount').value || 1;  
    const from =document.getElementById('from').value;
    const to=document.getElementById('to').value;
    const resultdiv=document.getElementById('result');
    if(from==to){
        resultdiv.textContent=`Both The Currencies are the same ${amount} ${from}`;
        return;
    }
    const url=`https://api.frankfurter.app/latest?amount=${amount}&from=${from}&to=${to}`;
    try{
        const resp=await fetch(url);
        if(!resp.ok){
            throw new Error('Network is not responding');
        }
        const data= await resp.json();
        const conamount=data.rates[to];
        resultdiv.textContent=`${amount} ${from} = ${conamount.toFixed(4)} ${to}`;
    
    }
    catch(error){
        resultdiv.textContent=`Cant Fetch Exchange Rate,Try Later`;
        console.error('Cant Fetch Exchange Rate,Try Later',error);
    }
    

});