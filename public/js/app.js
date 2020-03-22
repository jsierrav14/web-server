const weatherForm = document.querySelector('form');
const searchElement = document.querySelector('input');
const messageOne = document.querySelector('#messageOne');
const messageTwo = document.querySelector('#messageTwo');


weatherForm.addEventListener('submit',(e)=>{
  e.preventDefault();

   const location = searchElement.value;

    fetch(`http://localhost:3001/weather?address=${location}`).then((response)=>{
    response.json().then((data)=>{

        if(data.error){
           messageTwo.textContent = `${data.error}`;
        }else{

            messageOne.textContent =`Summary : ${data.summary} Temperature: ${data.temperature} PrecipProbability: ${data.precipProbability}`
        }
    })

})})