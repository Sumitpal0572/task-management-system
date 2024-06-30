let url = `http://localhost:3000/tasks`

let main = document.getElementById("container");
getData();

async function getData() {
    try {
        let res = await fetch(`${url}`)
        let data = await res.json()
        console.log(data);
        DisplayData(data);


    } catch (error) {
        console.log("error");
    }
}

function DisplayData(arr) {
    main.innerHTML = ""

    arr.forEach((ele) => {
        let card = document.createElement("div");

        let id = document.createElement("p");
        id.textContent = ele.id;

        let title = document.createElement("p")
        title.textContent = ele.title;

        let dis = document.createElement("p")
        dis.textContent = ele.dis;

        let status = document.createElement("p")
        status.textContent = ele.status;

        let date = document.createElement("p")
        date.textContent = ele.date;

        let priority = document.createElement("div")
        priority.textContent = ele.priority

        let edtBtn = document.createElement("button")
        edtBtn.textContent = "Edit";

        edtBtn.addEventListener("click", function () {
            localStorage.setItem("EditID", ele.id);
            window.location.href = "edit.html"
        })

        let dltbtn = document.createElement("button")
        dltbtn.textContent = "Delete"

        dltbtn.addEventListener("click", async function () {
            let response = await fetch(`${url}/${ele.id}`, {
                method: "DELETE"
            })
            getData()
        })

        card.append(id, title, dis, status, date, priority, edtBtn, dltbtn)
        main.append(card);
    })
}

let count = 1;
let next = document.getElementById("next");
next.addEventListener("click", function () {
    count++
    nextData();
});

let prev = document.getElementById("prev");
prev.addEventListener("click", function () {
    if (count == 1) {
        prev.button == disabled;
    } else {
        count--
    }
    nextData();
})

function nextData() {
    main.innerHTML = ""
    getData(`http://localhost:3000/tasks` `?_page=${page}&_limit=5`)
}