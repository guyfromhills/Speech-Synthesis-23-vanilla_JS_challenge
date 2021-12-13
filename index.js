//Project Insights
//1. Speech Synthesis Utterance interface is part of webspeech API, represents speech request. It contains the content the speech service should read and info about how to read.


  //new speechsynthesis utterance: what the person is going to say
  const msg = new SpeechSynthesisUtterance();

  //empty array to fill voices
  let voices = [];

  //who will say it
  const voicesDropdown = document.querySelector('[name="voice"]');

  //how fast/slow it will be said
  //pitch update
  //what is going to be said
  const options = document.querySelectorAll('[type="range"], [name="text"]');

  //start speaking
  const speakButton = document.querySelector('#speak');

  //stop speaking
  const stopButton = document.querySelector('#stop');

  //on page reload make text area content constant
  msg.text = document.querySelector("[name='text']").value;

  function populateVoices()
  {

    voices = this.getVoices();
    const voiceOptions = voices
    // .filter(function(voice){
    //     voice.lang.includes("en");
    // })
    .map(function(voice){
        return ` <option value=${voice.name}> ${voice.name} (${voice.lang})</option>`;

    })
    .join('');

    voicesDropdown.innerHTML = voiceOptions;
    
  }


  function setVoice()
  {

    //we need to find the corresponding speech synthesis voice object
    msg.voice = voices.find( function( voice){
        return voice.name === this.value;
    })  

  }


  function toggle(startOver = true)
  {

    //stop from speaking
      speechSynthesis.cancel();

      if( startOver)
      {
      //start over
      speechSynthesis.speak(msg);
      }

  }

  function setOption()
  {

    console.log(this.name, this.value);

    msg[this.name] = this.value;
    toggle();

  }

  //speech synthesis is a global variable that lives in the browser
  //if voices changed, populate voices
  speechSynthesis.addEventListener("voiceschanged",populateVoices);

  //if voice changed, call setVoice
  voicesDropdown.addEventListener("change",setVoice);


  //if option is changed call setoption
  options.forEach(function (option){
      option.addEventListener("change", setOption)
  })

  //if speak button is clicked call toggle
  speakButton.addEventListener("click", toggle);

  //if stop button is clicked, call toggle 
  stopButton.addEventListener("click", function(){
      toggle(false);
  });
