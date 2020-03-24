export default {
  create_ticket (req) {
    return {
      response: 'Create ticket';
    }
  },
  search_ticket (req) {
    return {
      response: `
        Search 1 \n
        Search 2
      `;
    }
  }
}
