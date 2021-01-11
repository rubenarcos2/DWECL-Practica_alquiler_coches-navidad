class ClientView {

    constructor() {
        this.$listClients = document.getElementById("list_clients");
        this.$tableClient = document.getElementById("table_client_by_id");
    }

    bindBtnClientById = (handler) => {
        document.getElementById("show_client_by_id").addEventListener('click', _=> {
            handler(document.getElementById("client_by_id").value);
        });
    }

    bindBtnShowClients = (handler) => {
        document.getElementById("show_all_clients").addEventListener('click', _=> {
            handler(this);
        });
    }

    clientNotExist = (msg) => {
        document.getElementById("error_client_by_id").innerHTML = msg;
        this.$tableClient.innerHTML = "";
    }

    printClientById = (client) => {
        console.table(client);
        document.getElementById("error_client_by_id").innerHTML = "";
        this.$tableClient.innerHTML = "<tr><th>Id</th><th>DNI</th><th>Nombre</th><th>Apellidos</th><th>Teléfono</th></tr>";
        this.$tableClient.innerHTML += "<tr><td>" + client.id +"</td><td>" + client.dni + "</td><td>" + client.nombre + "</td><td>" + client.apellidos + "</td><td>" + client.telefono + "</td></tr>";
    }

    printListClients = (clients) => {
        console.table(clients);
        this.$listClients.innerHTML = "<tr><th>Id</th><th>DNI</th><th>Nombre</th><th>Apellidos</th><th>Teléfono</th></tr>";
        clients.map(client => this.$listClients.innerHTML += "<tr><td>" + client.id +"</td><td>" + client.dni + "</td><td>" + client.nombre + "</td><td>" + client.apellidos + "</td><td>" + client.telefono + "</td></tr>");
    }
}