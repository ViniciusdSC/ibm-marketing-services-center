import { ticket, categorie as categorie_model, ticket_categorie } from '~/models';
import { analyze } from '~/services/naturalLanguageUnderstanding';

export default {
  async create_ticket (req) {
    const description = req.body.description;

    if (!description) {
      return 'Description not found';
    }

    await analyze({
      text: description
    })
    .then(async response => {
      // get all categories id and set in categories_id_list
      const categories = response.result.categories.map(categorie => { name: categorie.label });
      const categories_id_list = await categorie_model.findAll({
        where: {
          name: categories
        }
      }).map(categorie => categorie.categorie_id);
    });
    const ticket_model = await ticket.create({
      user_id: 1,
      status_id: 1,
      description
    });
    await categories_id_list.forEach(async categorie_id => {
      await ticket_categorie.create({
        ticket_id: ticket_model.id,
        categorie_id
      })
    });
    console.log(ticket_model);
    return 'Create ticket';
  },
  search_ticket (req) {
    return `
      Search 1 \n
      Search 2
    `;
  }
}
