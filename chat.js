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

    if (menuEdu) {
        menuEdu.addEventListener("click", () => {
            closeAllModals();
            infoModalTitle.innerText = "Education";
            infoModalBody.innerHTML = `
                <div style="font-family: 'Electrolize', sans-serif;">
                    <h3 style="color:#00D4FF;">Worcester Polytechnic Institute (WPI)</h3>
                    <p style="color:#CBD5E1; margin-top:5px;">Master of Science in Robotics Engineering<br><span style="color:#FF923E; font-size:14px;">GPA: 3.8/4.0 | Expected Dec 2025</span></p>
                    <ul style="margin-top:15px; padding-left:20px; line-height:1.6; color:#F8FAFC;">
                        <li>Deep Learning for Advanced Robot Perception</li>
                        <li>Motion Planning & Kinematics</li>
                        <li>Foundations of Robotics (ROS2/C++)</li>
                        <li>Human Robot Interaction (HRI)</li>
                    </ul>
                </div>
            `;
            infoModal.classList.remove("hide");
        });
    }

    if (menuPub) {
        menuPub.addEventListener("click", () => {
            closeAllModals();
            infoModalTitle.innerText = "Publications";
            infoModalBody.innerHTML = `
                <div style="font-family: 'Electrolize', sans-serif;">
                    <h3 style="color:#00D4FF;">Enhancing Quality of Life for PWD through Context-Aware Assistive Robotics</h3>
                    <p style="color:#CBD5E1; margin-top:5px;"><span style="color:#FF923E; font-size:14px;">WPI RoboCare Lab | Spring 2025</span></p>
                    <p style="margin-top:15px; line-height:1.6; color:#F8FAFC;">
                        First-author publication engineering a multi-robot system utilizing SoftBank Pepper and Hello Robot Stretch 3. Proved significant reduction in cognitive load and a 4x increase in user task awareness through contextual state-machine modeling.
                    </p>
                </div>
            `;
            infoModal.classList.remove("hide");
        });
    }

    if (menuCert) {
        menuCert.addEventListener("click", () => {
            closeAllModals();
            infoModalTitle.innerText = "Certifications";
            infoModalBody.innerHTML = `
                 <div style="font-family: 'Electrolize', sans-serif;">
                    <h3 style="color:#00D4FF;">Udacity Nanodegree: C++ </h3>
                    <h3 style="color:#00D4FF; margin-top:20px;">LinkedIn Learning: ROS2 Masterclass</h3>
                    <h3 style="color:#00D4FF; margin-top:20px;">NVIDIA Deep Learning Institute: Computer Vision</h3>
                </div>
            `;
            infoModal.classList.remove("hide");
        });
    }

    if (infoModalClose) {
        infoModalClose.addEventListener("click", () => {
            infoModal.classList.add("hide");
        });
    }

    if (menuExp) {
        menuExp.addEventListener("click", () => {
            closeAllModals();
            expModal.classList.remove("hide");
        });
    }

    if (expModalClose) {
        expModalClose.addEventListener("click", () => {
            expModal.classList.add("hide");
        });
    }

});
