// Function to handle user speech and provide a response
async function handleUserSpeech() {
    const speechRecognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
    speechRecognition.lang = 'en-US';
    speechRecognition.interimResults = false;

    speechRecognition.onstart = () => {
        document.getElementById('inputText').innerText = "Listening...";
    };

    speechRecognition.onresult = (event) => {
        const userSpeech = event.results[0][0].transcript;  // Get the spoken text
        console.log('User said:', userSpeech);

        // Display user input text
        document.getElementById('inputText').innerText = userSpeech;

        // Generate bot response
        const botResponse = generateBotResponse(userSpeech);  // Custom logic to generate response

        // Display the bot's response
        document.getElementById('outputText').innerText = botResponse;

        // Bot speaks the response
        speakResponse(botResponse);  // Function to speak the response
    };

    speechRecognition.onerror = (event) => {
        document.getElementById('inputText').innerText = "Error occurred in recognition: " + event.error;
    };

    speechRecognition.onend = () => {
        document.getElementById('inputText').innerText = "Click 'Start Talking' to speak again.";
    };

    speechRecognition.start();
}

// Function to generate a bot response based on user speech
function generateBotResponse(userSpeech) {
    // Convert speech to lowercase for better matching
    const lowerCaseSpeech = userSpeech.toLowerCase();

    // Simple predefined responses for specific queries
    if (lowerCaseSpeech.includes('hello')) {
        return "Hello! How can I assist you today?";
    } else if (lowerCaseSpeech.includes('what is your name')) {
        return "I am your virtual assistant. How can I help?";
    } else if (lowerCaseSpeech.includes('what time is it')) {
        return `The current time is ${new Date().toLocaleTimeString()}.`;
    } else if (lowerCaseSpeech.includes('how are you')) {
        return "I'm just a program, but thanks for asking! How can I assist you?";
    } else {
        // Fallback response for unrecognized queries
        return "I don't have information for that.";
    }
}

// Function to speak the bot's response using Text-to-Speech (TTS)
function speakResponse(text) {
    const speechSynthesis = window.speechSynthesis;
    const utterance = new SpeechSynthesisUtterance(text);  // Convert text to speech
    speechSynthesis.speak(utterance);  // Speak out loud
}
