document.addEventListener("DOMContentLoaded", () => {
    const trigger = document.getElementById("chatbot-trigger");
    const modal = document.getElementById("chatbot-modal");
    const closeBtn = document.getElementById("chatbot-close");
    const messages = document.getElementById("chatbot-messages");
    const input = document.getElementById("chatbot-input");
    const sendBtn = document.getElementById("chatbot-send");



    let isOpen = false;

    trigger.addEventListener("click", () => {
        isOpen = !isOpen;
        if(isOpen) {
            modal.classList.remove("hide");
            trigger.classList.remove("chatbot-pulse");
        } else {
            modal.classList.add("hide");
        }
    });

    closeBtn.addEventListener("click", () => {
        isOpen = false;
        modal.classList.add("hide");
    });

    function addMessage(text, isBot) {
        const div = document.createElement("div");
        div.className = `chat-message ${isBot ? 'bot-message' : 'user-message'}`;
        div.innerText = text;
        messages.appendChild(div);
        messages.scrollTop = messages.scrollHeight;
    }

    function processInput() {
        const text = input.value.trim();
        if(!text) return;
        
        addMessage(text, false);
        input.value = "";
        
        // Disable temporarily
        input.disabled = true;
        
        setTimeout(() => {
            const lowerText = text.toLowerCase();
            let response = "I'm still learning! You can ask me about Manideep's skills, his robotics projects, or how to contact him.";
            
            if(lowerText.includes("hello") || lowerText.includes("hi")) {
                response = "Hello there! How can I answer your questions today?";
            } else if(lowerText.includes("skill") || lowerText.includes("stack") || lowerText.includes("tech")) {
                response = "Manideep specializes in ROS2, Python, C++, and MATLAB. He has deep expertise in Multi-Robot Motion Planning, Perception (Computer Vision), and Control Systems!";
            } else if(lowerText.includes("project") || lowerText.includes("work") || lowerText.includes("portfolio")) {
                response = "He has done amazing projects from RL-based Manipulation in the Genesis Simulator to building an AV Lane-Change Controller! Scroll up to check out his detailed interactive Project Cards.";
            } else if(lowerText.includes("contact") || lowerText.includes("email") || lowerText.includes("hire")) {
                response = "You can easily reach out to him via the Contact form at the bottom of the page, or simply email him directly at duggimanideep.dm@gmail.com.";
            } else if(lowerText.includes("who")) {
                response = "Manideep is an M.S. Robotics graduate from WPI. He specializes in designing, integrating, and validating intelligence architectures across multi-robot platforms and embedded controls.";
            } else if(lowerText.includes("robot") || lowerText.includes("ai")) {
                response = "Robotics and AI are our bread and butter! We love solving complex state-estimation and dynamic collision-avoidance logic in real time.";
            }
            
            addMessage(response, true);
            input.disabled = false;
            input.focus();
        }, 600 + Math.random() * 400); // 600-1000ms delay to feel natural
    }

    sendBtn.addEventListener("click", processInput);
    input.addEventListener("keypress", (e) => {
        if(e.key === "Enter") processInput();
    });

    // --- Info Modals ---
    const infoModal = document.getElementById("info-modal");
    const infoModalClose = document.getElementById("info-modal-close");
    const infoModalTitle = document.getElementById("info-modal-title");
    const infoModalBody = document.getElementById("info-modal-body");

    const modalData = {
        "menu-edu": { title: "Education", content: "<h3>WPI (Worcester Polytechnic Institute)</h3><p>M.S. Robotics Engineering</p><hr><h3>Undergrad</h3><p>B.S. Robotics & Automation</p>" },
        "menu-pub": { title: "Publications", content: "<p><strong>Integrating Large Language Models and Foundation Models into Multi-Agent Robotics</strong><br>Published 2024</p>" },
        "menu-cert": { title: "Certificates", content: "<ul><li>ROS2 Advanced Mechanics</li><li>NVIDIA Deep Learning Engineer</li><li>AWS Machine Learning</li></ul>" }
    };

    ["menu-edu", "menu-pub", "menu-cert"].forEach(id => {
        const btn = document.getElementById(id);
        if(btn) {
            btn.addEventListener("click", () => {
                infoModalTitle.innerHTML = modalData[id].title;
                infoModalBody.innerHTML = modalData[id].content;
                infoModal.classList.remove("hide");
            });
        }
    });

    if(infoModalClose) {
        infoModalClose.addEventListener("click", () => {
            infoModal.classList.add("hide");
        });
    }

});
