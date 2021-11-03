const backlogBtn = document.querySelector(".add-backlog");
const backlogCard = document.querySelector(".container-backlog");
const inProgressBtn = document.querySelector(".add-in-progress");
const inProgressCard = document.querySelector(".container-in-progress");
const completeBtn = document.querySelector(".add-complete");
const completeCard = document.querySelector(".container-complete");
const onHoldBtn = document.querySelector(".add-onHold");
const onHoldCard = document.querySelector(".container-onHold");

function cardLogic(btn, card) {
  btn.addEventListener("click", () => {
    const elArea = document.createElement("div");
    elArea.classList.add("text-holder");
    elArea.setAttribute("draggable", "true");
    elArea.innerHTML = `<textarea  rows="4" class="text-parth"></textarea> 
      <button class="add-btn add-card">add card</button>`;
    card.appendChild(elArea);
    btn.style.display = "none";

    const cardBtn = document.querySelector(".add-card");
    cardBtn.addEventListener("click", () => {
      btn.style.display = "flex";

      const textAreaValue = document.querySelector(".text-parth").value;
      const textHolder = document.querySelector(".text-holder");
      textHolder.remove();
      card.innerHTML += `<div class="draggable" draggable="true" contenteditable="true">${textAreaValue}</div>`;
      const draggables = document.querySelectorAll(".draggable");
      const containers = document.querySelectorAll(".container");

      draggables.forEach((draggable) => {
        draggable.addEventListener("dragstart", () => {
          draggable.classList.add("dragging");
        });

        draggable.addEventListener("dragend", () => {
          draggable.classList.remove("dragging");
        });
      });

      containers.forEach((container) => {
        container.addEventListener("dragover", (e) => {
          e.preventDefault();
          const afterElement = getDragAfterElement(container, e.clientY);
          const draggable = document.querySelector(".dragging");

          if (afterElement == null) {
            container.appendChild(draggable);
          } else {
            container.insertBefore(draggable, afterElement);
          }
        });
      });
    });
  });
}

function getDragAfterElement(container, y) {
  const draggableElements = [...container.querySelectorAll(".draggable:not(.dragging)")];
  return draggableElements.reduce(
    (closest, child) => {
      const box = child.getBoundingClientRect();
      const offset = y - box.top - box.height / 2;
      if (offset < 0 && offset > closest.offset) {
        return { offset: offset, element: child };
      } else {
        return closest;
      }
    },
    { offset: Number.NEGATIVE_INFINITY }
  ).element;
}

cardLogic(backlogBtn, backlogCard);
cardLogic(inProgressBtn, inProgressCard);
cardLogic(completeBtn, completeCard);
cardLogic(onHoldBtn, onHoldCard);
