let tableContentNode = document.querySelector("#table-content");


function loadProductsTable() {
    try {
        fetch("/api").then((response) => {
            response.json().then((products) => {
                console.log(products);
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
    } catch(error) {
        console.error(error);
    }
}


loadProductsTable();

