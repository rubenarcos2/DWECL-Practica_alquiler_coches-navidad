const ENDPOINT_CLIENTS = 'http://localhost:8080/customers';    
const optionsGet = {
                    method: 'GET',
                    headers: new Headers({
                        'Content-Type': 'application/json'
                    })
                };
const optionsDelete = {method: 'DELETE'};

class ClientController {
    
    constructor(clientView, clientService) {
        this.clientView = clientView;
        this.clientService = clientService;        

        this.clientView.bindBtnClientById(this.handleShowClientById);
        this.clientView.bindBtnShowClients(this.handleShowClients);

    }

    handleShowClientById = (id) => {
        if(id !== "" && id !== "undefined" && id !== undefined)
            Promise.resolve(this.getById(id) //Volatile client, not stored
                .then(client => client.message != undefined ? this.clientView.clientNotExist(client.message) : clientView.printClientById(client)));
    };
    
    handleShowClients = () => {
        Promise.resolve(this.getAll()                
                .then(clientes => clientes.map(cliente => this.clientService.add((cliente))))//Local storage all clients
                .then(clients => this.clientView.printListClients(this.clientService.getClientList())));
    };

    getAll = async () => await fetch(ENDPOINT_CLIENTS, optionsGet)
                    .then((resp) => resp.json())
                    .catch(error => console.log(error));
    
    getById = async (id) => await fetch(ENDPOINT_CLIENTS+"/"+id, optionsGet)
                    .then((resp) => resp.json())
                    .catch(error => console.log(error));

    //Get a client by user (client join users)

}