const baseAPIUrl= 'https://portfolio-render-59ha.onrender.com/api';

function openPopup() {
    document.getElementById("chatModal").classList.remove("hidden");
}

function closePopup() {
    document.getElementById("response").innerHTML="";
    document.getElementById("question").value="";
    document.getElementById("response").style.display="none";
    document.getElementById("typing").classList.add("hidden");
    document.getElementById("chatModal").classList.add("hidden");
}

async function sendMessage() {
    const question = document.getElementById("question").value;
    const responseDiv = document.getElementById("response");
    const typingIndicator = document.getElementById("typing");

    if (!question.trim()) {
        responseDiv.innerHTML = "Please enter a question.";
        return;
    }
    responseDiv.innerHTML = "";
    typingIndicator.style.display = "block";


    try {
        const response = await fetch(`${baseAPIUrl}/generate/ask`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ "question": question })
        });
    
        const data = await response.json();

        const fullText = data.candidates[0].content.parts[0].text;
        
        responseDiv.style.display = "block";
        typingIndicator.style.display = "none";
        typeText(responseDiv, fullText, 30);
        
    } catch (error) {
        responseDiv.innerHTML = "Error fetching response.";
        console.error(error);
    }
}

function typeText(element, text, speed) {
    let i = 0;
    element.innerHTML = ""; // Clear previous response
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    type();
}