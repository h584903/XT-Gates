// Sjekke om et prosjket finnes, returnere true eller false
function findProjectById(projectId: number): Promise<any> {
    return new Promise((resolve, reject) => {
      // Construct SQL query
      const query = `SELECT * FROM projects WHERE id = ?`;
  
      // Execute SQL query with projectId parameter
    });
  }


