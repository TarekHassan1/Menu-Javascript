const allMenu = document.querySelectorAll(".type span");
const food = document.querySelector(".food");

async function fetchData(category = null) {
    try {
        const response = await fetch("json.json").then(response => response.json());
        const data = await response;
        if (category == null) {
            return data
        } else {
            const filterdData = data.filter(item => item.category === category);
            return filterdData;
        }
    } catch (error) {
        console.log(error);
    }

}



allMenu.forEach((e) => {
    e.addEventListener("click", async () => {
        allMenu.forEach(e => {
            e.style.backgroundColor = "inherit";
            e.style.color = "#74D3AE";

        })
        if (e.textContent === "All") {
            fetchData().then(
                response => {
                    for (let i = 0; i < response.length; ++i) {
                        const eat = document.createElement("div");
                        eat.classList.add("eat");
                        eat.innerHTML = `
                    <div class="img-container">
                    <img src="${response[i].img}" alt="">
                  </div>
            <div class="text-body">
              <div class="title">
           <span>${response[i].title}</span>
              <span>${response[i].price}</span>
            </div>
            <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Vel possimus nihil accusamus eos ullam provident?</p>
            </div>
                 `;
                        food.appendChild(eat);
                    }
                }
            );
        } else {
            const category = e.textContent;
            const data = await fetchData(category);
            food.innerHTML = "";
            if (data.length > 0) {
                for (let i = 0; i < data.length; ++i) {
                    const eat = document.createElement("div");
                    eat.classList.add("eat");
                    eat.innerHTML = `
                    <div class="img-container">
                    <img src="${data[i].img}" alt="">
                  </div>
            <div class="text-body">
              <div class="title">
           <span>${data[i].title}</span>
              <span>${data[i].price}</span>
            </div>
            <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Vel possimus nihil accusamus eos ullam provident?</p>
            </div>
                 `;
                    food.appendChild(eat);
                }
            }
        }

        e.style.backgroundColor = "#74D3AE";
        e.style.color = "white";

    });
})
window.addEventListener("load", () => {

    const all = document.querySelector(".type span:first-child");
    all.click();
})