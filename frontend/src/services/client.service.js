class ClientService {

    constructor() {
        this._listClients = [];
    }

    add = (newClient) => {
        if(!this._listClients.some(c => c.id === newClient.id))
            this._listClients.push(newClient);
    }

    remove = (deleteClient) => {
        this._listClients.pop(deleteClient);
    }

    update = (modifyClient) => {
        const index = this._listClients.indexOf(modifyClient);
        this._listClients[index] = modifyClient;
    }

    findById = (findClient) => {
        return this._listClients.filter(e => e.id === findClient.id);
    }

    findByDni = (findClient) => {
        return this._listClients.filter(e => e.dni === findClient.dni);
    }

    getClientList = () => {
        return this._listClients.sort(function (a, b) {
            if (a.startDate > b.startDate) {
              return 1;
            }
            if (a.startDate < b.startDate) {
              return -1;
            }
            // a must be equal to b
            return 0;
        });
        //return this._listClients.sort((a, b) => a.startDate < b.startDate);
    }

    getClientWithGuarantor = (typeOfClient) => {
        return this._listClients.filter(c => c.guarantor !== null);
    }
}