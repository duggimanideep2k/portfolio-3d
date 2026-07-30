const oM = [
    {
      id: 0,
      name: "Multi-Robot Motion Planning",
      description:
        "ROS2 + OMPL framework for collision-aware multi-robot navigation using RRT/RRT*, KPIECE, and RVO, validated with hardware-in-the-loop testing.",
      image: "images/projects/motion-planning.png",
      tags: ["ros2", "cpp", "python", "ompl"],
      liveview: "https://github.com/duggimanideep2k",
      alt: "Multi-Robot Motion Planning",
    },
    {
      id: 1,
      name: "RL Manipulation — Franka Cube Stacking",
      description:
        "PPO cube-stacking policies with imitation learning and behavior cloning in the Genesis simulator, with reward shaping and success-rate metrics.",
      image: "images/projects/rl-manipulation.png",
      tags: ["python", "rl", "perception"],
      liveview: "https://github.com/duggimanideep2k",
      alt: "RL Manipulation — Franka Cube Stacking",
    },
    {
      id: 2,
      name: "Einstein Vision",
      description:
        "2D-to-3D perception pipeline (YOLOv8, Mask R-CNN, MiDaS) with a Tesla-style dashboard for real-time scene understanding.",
      image: "images/projects/einstein-vision.png",
      tags: ["python", "cv", "perception"],
      liveview: "https://github.com/duggimanideep2k",
      alt: "Einstein Vision",
    },
    {
      id: 3,
      name: "AV Lane-Change Control",
      description:
        "Autonomous lane-change control using vehicle dynamics, state-space models, and LQR/MPC concepts in MATLAB.",
      image: "images/projects/lane-change.png",
      tags: ["matlab", "controls"],
      liveview: "https://github.com/duggimanideep2k",
      alt: "AV Lane-Change Control",
    },
    {
      id: 4,
      name: "Multi-Robot Assistive System",
      description:
        "Pepper + Stretch assistive system with speech interaction, ROS2 navigation, and RGB-D grasping — the prototype behind an IROS 2026 paper.",
      image: "images/projects/assistive-robots.png",
      tags: ["ros2", "python", "perception"],
      liveview: "https://github.com/duggimanideep2k",
      alt: "Multi-Robot Assistive System",
    },
  ];
  
  class lM {
    constructor() {
      he(this, "domElements", {
        renderContainer: document.getElementById("work-render-container"),
      });
      (this.experience = new ye()),
        (this.sounds = this.experience.sounds),
        (this.items = oM),
        (this.tags = aM),
        this.renderItems();
    }
  
    renderItems() {
      this.items.forEach((e) => {
        this.domElements.renderContainer.insertAdjacentHTML(
          "beforeend",
          `
              <div id="work-item-${e.id}" class="work-item-container column">
                  <img class="work-item-image" src="${e.image}" alt="${
            e.alt
          }" height="300" width="334"/>
                  <div class="work-item-content-container">
                      <h3>${e.name}</h3>
                      <div class="work-item-tag-container row">
                          ${this.renderTags(e.tags)}
                      </div>
                      <span>${e.description}</span>
                  </div>
                  <div class="work-item-button-container row">
                      ${this.renderButtons(e)}
                  </div>
                  ${e.bannerIcons ? this.renderBanner(e) : ""}
              </div>
              `
        ),
          this.addEventListenersToCard(e);
      });
    }
  
    renderBanner(e) {
      let t = "";
      return (
        (t = `
              <div class="work-banner-container row center">
                  ${e.bannerIcons.map(
                    (n) =>
                      `<img src="${n.src}" alt="${n.alt}" height="64" width="64"/>`
                  )}
                  <span>Website Of<br>The Day</span>
              </div>
          `),
        t
      );
    }
  
    renderButtons(e) {
      // Only the Live View button will be rendered if available
      let t = "";
      if (e.liveview) {
        t = `
          <div id="work-item-orange-button-${e.id}" class="work-item-orange-button small-button center orange-hover" style="width: 100%; margin: 0;">
              Live View
          </div>`;
      } else {
        t = `
          <div id="work-item-gray-button-${e.id}" class="work-item-gray-button center" style="width: 100%; background: #a7adb8; cursor: unset;">
              Work in progress
          </div>`;
      }
      return t;
    }
  
    renderTags(e) {
      let t = "";
      for (let n = 0; n < e.length; n++) t += this.tags[e[n]];
      return t;
    }
  
    addEventListenersToCard(e) {
      const t = document.getElementById("work-item-" + e.id);
      t.addEventListener("click", () => {
        t.classList.contains("work-inactive-item-container") &&
          document
            .getElementById("work-item-0")
            .classList.contains("work-item-container-transition") &&
          ((this.experience.ui.work.cards.currentItemIndex = -e.id + 4),
          this.experience.ui.work.cards.updatePositions(),
          this.sounds.play("buttonClick"));
      });
  
      if (e.liveview) {
        document
          .getElementById("work-item-orange-button-" + e.id)
          .addEventListener("click", () => {
            window.open(e.liveview, "_blank").focus();
          });
      }
    }
  }
  