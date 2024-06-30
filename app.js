let url = `http://localhost:3000/tasks`


let getData = async (url) => {
    try {
        let res = await fetch(`${url}`)
        let data = await res.json()
        console.log(data);
        displayData(data);
    } catch (error) {
        console.log(error);
    }
}

getData(url);

function displayData(data) {
    let main = document.getElementById("container");
    main.innerHTML = ""

    data.forEach((ele) => {
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
            getData(url)
        })

        card.append(id, title, dis, status, date, edtBtn, dltbtn)
        main.append(card);
    })
}

let filter = document.getElementById("filter")
filter.addEventListener("click", function () {
    filterData();
})

function filterData() {
    let filterVal = filter.value;
    console.log(filterVal);
    getData(`${url}?status=${filterVal}`)
}

// pagination
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
    getData(`http://localhost:3000/tasks`)
}