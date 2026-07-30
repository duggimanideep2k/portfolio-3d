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

    // Load portfolio data from JSON
    let portfolioData = null;
    fetch('./data.json')
        .then(r => r.json())
        .then(data => { portfolioData = data; })
        .catch(() => { portfolioData = null; });

    function findAnswer(text) {
        if (!portfolioData) return "I'm still loading — please try again in a second!";
        const q = text.toLowerCase();

        // Greeting
        if (/\b(hi|hello|hey|sup|yo|greetings)\b/.test(q)) {
            return `Hello! 👋 I'm Manideep's Robot Assistant 🤖 Ask me about his skills, experience, projects, education, publications, or how to contact him!`;
        }

        // Who / bio
        if (/\b(who|about|bio|summary|background)\b/.test(q)) {
            const p = portfolioData.profile;
            return `${p.name} is a ${p.title}. ${p.summary}`;
        }

        // Skills
        if (/\b(skill|tech|stack|language|programming|tools|know|framework)\b/.test(q)) {
            const s = portfolioData.skills;
            return `Manideep's skills span multiple areas:\n`
                + `• Programming: ${s.programming_and_development.join(', ')}\n`
                + `• Robotics & Autonomy: ${s.robotics_and_autonomy.join(', ')}\n`
                + `• Perception & Sensors: ${s.sensors_perception_and_data.join(', ')}\n`
                + `• Controls & Electromechanical: ${s.electromechanical_and_controls.slice(0,5).join(', ')} & more\n`
                + `• Planning: ${s.planning_and_algorithms.join(', ')}`;
        }

        // Experience / work history
        if (/\b(experience|work|job|career|role|company|intern|virya|maini|wpi|robocare|tranqvolt)\b/.test(q)) {
            const exps = portfolioData.experience;
            return `Manideep has ${exps.length} key roles:\n`
                + exps.map((e, i) => `${i+1}. ${e.role} @ ${e.organization} (${e.start}–${e.end}): ${e.highlights[0]}`).join('\n');
        }

        // Projects
        if (/\b(project|build|built|made|develop|portfolio|simulation|planner|rl|vision|einstein|lane)\b/.test(q)) {
            const projs = portfolioData.projects;
            return `Manideep's key projects:\n`
                + projs.map((p, i) => `${i+1}. ${p.name} [${p.stack.join(', ')}] — ${p.highlights[0]}`).join('\n');
        }

        // Education
        if (/\b(education|study|university|degree|gpa|college|school|wpi|srm|graduate|undergrad)\b/.test(q)) {
            const edu = portfolioData.education;
            return edu.map(e => `${e.degree} — ${e.institution} (${e.start}–${e.end}), GPA: ${e.gpa}`).join('\n');
        }

        // Publications / research
        if (/\b(publication|paper|research|published|journal|conference|iros)\b/.test(q)) {
            const r = portfolioData.research[0];
            return `${r.title} — ${r.venue} (${r.status}). ${r.description}`;
        }

        // Contact
        if (/\b(contact|email|reach|hire|available|connect|linkedin|github|phone)\b/.test(q)) {
            const c = portfolioData.profile.contact;
            return `You can reach Manideep at:\n📧 ${c.email}\n📞 ${c.phone}\n💼 ${c.linkedin}\n💻 ${c.github}\nOr use the Contact form at the bottom of this page!`;
        }

        // Quick facts / open to work
        if (/\b(open|looking|available|hire|relocat|opportunity|role)\b/.test(q)) {
            const qf = portfolioData.quick_facts;
            return `Manideep is open to: ${qf.open_to}. He has ${qf.years_of_experience} years of experience in ${qf.core_domains.slice(0,3).join(', ')} and more.`;
        }

        return `I'm not sure about that! Try asking about Manideep's "skills", "experience", "projects", "education", "publications", or how to "contact" him.`;
    }


    function processInput() {
        const text = input.value.trim();
        if (!text) return;
        addMessage(text, false);
        input.value = "";
        input.disabled = true;
        setTimeout(() => {
            addMessage(findAnswer(text), true);
            input.disabled = false;
            input.focus();
        }, 500 + Math.random() * 300);
    }

    sendBtn.addEventListener("click", processInput);
    input.addEventListener("keypress", (e) => {
        if(e.key === "Enter") processInput();
    });

    // --- Modal Elements ---
    const infoModal     = document.getElementById("info-modal");
    const infoModalClose = document.getElementById("info-modal-close");
    const infoModalTitle = document.getElementById("info-modal-title");
    const infoModalBody  = document.getElementById("info-modal-body");

    const expModal      = document.getElementById("experience-modal");
    const expModalClose = document.getElementById("experience-modal-close");

    const menuEdu  = document.getElementById("menu-edu");
    const menuPub  = document.getElementById("menu-pub");
    const menuCert = document.getElementById("menu-cert");
    const menuExp  = document.getElementById("menu-exp");

    // Close ALL open modals (chatbot, info, experience)
    function closeAllModals() {
        if (modal)     modal.classList.add("hide");
        if (infoModal) infoModal.classList.add("hide");
        if (expModal)  expModal.classList.add("hide");
        isOpen = false;
    }

    // --- Education ---
    if (menuEdu) {
        menuEdu.addEventListener("click", () => {
            closeAllModals();
            infoModalTitle.innerText = "Education";
            infoModalBody.innerHTML = `
                <div style="font-family:'Electrolize',sans-serif;">
                    <h3 style="color:#00D4FF;">Worcester Polytechnic Institute (WPI)</h3>
                    <p style="color:#CBD5E1;margin-top:5px;">Master of Science in Robotics Engineering<br>
                    <span style="color:#FF923E;font-size:14px;">GPA: 3.8/4.0 | Expected Dec 2025</span></p>
                    <ul style="margin-top:15px;padding-left:20px;line-height:1.8;color:#F8FAFC;">
                        <li>Deep Learning for Advanced Robot Perception</li>
                        <li>Motion Planning &amp; Kinematics</li>
                        <li>Foundations of Robotics (ROS2/C++)</li>
                        <li>Human Robot Interaction (HRI)</li>
                    </ul>
                    <h3 style="color:#00D4FF;margin-top:25px;">Mahatma Gandhi Institute of Technology</h3>
                    <p style="color:#CBD5E1;margin-top:5px;">Bachelor of Technology in Electronics &amp; Communication Engineering</p>
                </div>`;
            infoModal.classList.remove("hide");
        });
    }

    // --- Publications ---
    if (menuPub) {
        menuPub.addEventListener("click", () => {
            closeAllModals();
            infoModalTitle.innerText = "Publications";
            infoModalBody.innerHTML = `
                <div style="font-family:'Electrolize',sans-serif;">
                    <h3 style="color:#00D4FF;">Enhancing Quality of Life for PWD through Context-Aware Assistive Robotics</h3>
                    <p style="color:#CBD5E1;margin-top:5px;"><span style="color:#FF923E;font-size:14px;">WPI RoboCare Lab | Spring 2025</span></p>
                    <p style="margin-top:15px;line-height:1.6;color:#F8FAFC;">
                        First-author publication engineering a multi-robot system utilizing SoftBank Pepper and Hello Robot Stretch 3. Proved significant reduction in cognitive load and a 4x increase in user task awareness through contextual state-machine modeling.
                    </p>
                </div>`;
            infoModal.classList.remove("hide");
        });
    }

    // --- Certificates ---
    if (menuCert) {
        menuCert.addEventListener("click", () => {
            closeAllModals();
            infoModalTitle.innerText = "Certifications";
            infoModalBody.innerHTML = `
                <div style="font-family:'Electrolize',sans-serif;">
                    <h3 style="color:#00D4FF;">Udacity Nanodegree: C++</h3>
                    <h3 style="color:#00D4FF;margin-top:20px;">LinkedIn Learning: ROS2 Masterclass</h3>
                    <h3 style="color:#00D4FF;margin-top:20px;">NVIDIA Deep Learning Institute: Computer Vision</h3>
                </div>`;
            infoModal.classList.remove("hide");
        });
    }

    if (infoModalClose) {
        infoModalClose.addEventListener("click", () => {
            infoModal.classList.add("hide");
        });
    }

    // --- Experience ---
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
