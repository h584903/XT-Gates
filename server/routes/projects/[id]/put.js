// Usikker på om vi trenger å importere
import { defineEventHandler } from '@nuxt/bridge';

// event handler for put
export default defineEventHandler((event) => {
    if (event.node.req.method === 'PUT') {
        // henter ut prosjtId fra parametre
        const projectId = event.node.req.params.projectId;
      // oppdaterer prosjekt med gitt ID -- Query
      const query = `
      UPDATE projects
      SET /* Update project fields */
      WHERE id = @projectId;
    `;
      // returnere prosjektet
        return { success: true, message: 'Project updated successfully' };
    }
  });