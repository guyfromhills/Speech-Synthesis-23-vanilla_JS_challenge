//Project Insights
// 1. SpeechSynthesisUtterance interface is part of web speech API, it represents speech request. It contains content to be read and provides info on how to be read etc.  
// 2. speechSynthesis is a global varible that lives inside browser




//creating content to deliver
const msg = new SpeechSynthesisUtterance;

//creating empty array to be filled in by voices
let voices = [];

//grabbing dropdown
const voicesDropdown = document.querySelector("[name='voice']");

//grabbing all inputs( type = range) and text area
const options = document.querySelectorAll("[type='range'], [name='text']");

//grabbing speak button
const speakButton = document.querySelector("#speak");

//grabbing stop button
const stopButton = document.querySelector("#stop");

//read whats written in text area by putting it into text property of message
msg.text = document.querySelector("[name='text']").value;

//function for populating array with voices fetched
function populateVoices()
{
    //putting all voices into empty array
     voices = this.getVoices();

      
     const voicesOption = voices
     .map(function (voice){
         return `<option value='${voice.name}'> ${voice.name} (${voice.lang})</option>`
     })
     .join('');
     voicesDropdown.innerHTML = voicesOption;
}

//function for setting voice in voice Dropdown
function setVoice()
{

    //return the first element if voice.name matches voicesDropdown's value  
    msg.voice = voices.find(function (voice){
        if( voice.name === voicesDropdown.value)
        {
            return true;
        }
    })

    //call toggle when voiceDropdown is set to some voice
    toggle();

}

//making voice work on toggle
function toggle(startOver = true)
{
    speechSynthesis.cancel(msg);

    if( startOver )
    {
    speechSynthesis.speak(msg);
    }
}

function setOption()
{
    //setting msg's property to a particular value
    msg[this.name] = this.value;

    // call toggle when options changed
    toggle();
}

//if voiceschanged event is delivered to speechSynthesis variable, call populate voices funct
speechSynthesis.addEventListener("voiceschanged",populateVoices);

//if voicesDropdown is clicked, call set voices 
voicesDropdown.addEventListener("click", setVoice);

//if any of the option's values change, call setOptions
options.forEach( function (option){
    option.addEventListener('change', setOption);
})

//if stop clicked, stop speech
stopButton.addEventListener("click", function (){
    toggle(false);
})

//if start clicked, start speech
speakButton.addEventListener("click", toggle);
