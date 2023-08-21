  function findClientBySocketId(id, clients) {
    for (let client in clients) {
      if (clients[client] != null || client[client !== undefined]) {
        if (clients[client].id === id) {
          return client;
        }
      }
    }
    return false;
  }

  export default findClientBySocketId