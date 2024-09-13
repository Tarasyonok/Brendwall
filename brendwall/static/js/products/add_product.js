let formNode = document.querySelector("#product-form");
let tableContentNode = document.querySelector("#table-content");


function loadProductsTable() {
    try {
        fetch("/api").then((response) => {
            response.json().then((products) => {
                tableContentNode.innerHTML = '';
                for (let product of products) {
                    tableContentNode.innerHTML += `
                      <tr>
                        <td>${product["name"]}</td>
                        <td>${product["description"]}</td>
                        <td>${product["price"]}</td>
                      </tr>
                    `;
                }
            });
        });
    } catch (error) {
        console.error(error);
    }
}


function getCookie(name) {
    var cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        var cookies = document.cookie.split(';');
        for (var i = 0; i < cookies.length; i++) {
            var cookie = cookies[i].trim();
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}


function addProduct(data) {
    try {
        let csrftoken = getCookie('csrftoken');
        let response = fetch('/api/', {
            method: 'POST',
            headers: {
                'X-CSRFToken': csrftoken
            },
            body: data,
        }).then((response) => response.json()
            .then((data) => ({ status: response.status, body: data })))
            .then((result) => {
                if (result.status == 200) {
                    tableContentNode.innerHTML = `
                      <tr>
                        <td>${data.get("name")}</td>
                        <td>${data.get("description")}</td>
                        <td>${data.get("price")}</td>
                      </tr>
                ` + tableContentNode.innerHTML;
                }
            });
    } catch (error) {
        console.error(error);
    }
}


formNode.addEventListener('submit', (event) => {
    event.preventDefault();
    let data = new FormData(formNode);
    addProduct(data);
    formNode.reset();
});

loadProductsTable();

