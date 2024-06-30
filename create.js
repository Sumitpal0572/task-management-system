let url = "http://localhost:3000/tasks"

document.querySelector("form").addEventListener("submit", function () {
    getData()
})

async function getData() {
    event.preventDefault()

    let title = document.getElementById("input1").value
    let discription = document.getElementById("input2").value
    let status = document.getElementById("input3").value
    let dueDate = document.getElementById("input4").value

    let obj = {
        title,
        discription,
        status,
        dueDate
    }

    await fetch(`${url}`, {
        method: "POST",
        headers: {
            "content-type": "application/json"
        },
        body: JSON.stringify(obj)
    })
    window.location.href = "index.html"
}