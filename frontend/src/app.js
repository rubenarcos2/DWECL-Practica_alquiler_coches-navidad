clientView = new ClientView();
clientService = new ClientService();
new ClientController(clientView, clientService);

/*  script de comprobación rápida */
const testParam = {
    client1: {
      id: 1,      
      dni: '12345678A',
      name: 'Rubén',
      lastName: 'Arcos',
      phone: 12345678,
      guarantor: null
    },
    client2: {
      id: 2,      
      dni: '023456789Z',
      name: 'María',
      lastName: 'Almanzora',
      phone: 01234567,
      guarantor: '12345678A'
    },
    car1: {
        id: 1,
        brand: 'Ford',
        model: 'Fiesta',
        color: 'Negro',
        carpark: 'A1'
    },
    car2: {
        id: 2,
        brand: 'Alfa Romeo',
        model: 'Giulietta',
        color: 'Rojo',
        carpark: 'H4'
    },
    book1: {
        id: 1,
        idClient: 1,
        date: '01-01-2001',
        total: 100,
        details: 
            [
                {
                    idBook: 1,
                    idCar: 1,
                    dateStart: '01-01-2001',
                    dateEnd: '02-01-2001',
                    price: 100,
                    gasoline: 5,
                    available: 0
                }
            ]
    },
    book2: {
        id: 2,
        idClient: 2,
        date: '10-10-2010',
        total: 150,
        details: 
            [
                {
                    idBook: 1,
                    idCar: 1,
                    dateStart: '10-10-2010',
                    dateEnd: '12-10-2010',
                    price: 100,
                    gasoline: 5,
                    available: 1
                },
                {
                    idBook: 1,
                    idCar: 2,
                    dateStart: '11-10-2010',
                    dateEnd: '13-10-2010',
                    price: 50,
                    gasoline: 15,
                    available: 1
                }
            ]
    }
    
  }

  //clientCtrl.findAll();
  /* 
  const client1 = new Client(testParam.client1);
  const client2 = new Client(testParam.client2);
  
  clientService.add(client1);
  clientService.add(client2);  
  client2.name = 'cambiado';
  client2.dateEnd = new Date('02-01-1990'); */
  //console.table(clientService);
  
  //console.log(clientService.update(client2));
  //console.log(clientService.getClientList());
  //console.log(clientServ.findById(1));
  //console.log(clientService.getClientWithGuarantor());
  //console.log(clientCtrl.simulateWar(1));