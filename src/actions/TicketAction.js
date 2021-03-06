import { ticket, categorie as categorie_model, ticket_categorie } from '~/models';
import { analyze } from '~/services/naturalLanguageUnderstanding';

export default {
  async create_ticket (req) {
    const description = req.body.description;
    const user_id = req.body.user_id;
    const initial_status = 1;
    let categories_id_list = [];

    if (!description) {
      return 'Description not found';
    }

    await analyze({
      text: description
    })
    .then(async response => {
      // get all categories id and set in categories_id_list
      const categories = response.result.categories.map(categorie => categorie.label);
      categories_id_list = await categorie_model().findAll({
        where: {
          name: categories
        }
      }).map(categorie => categorie.categorie_id)
      console.log('categories_id_list', categories_id_list);
    });
    const ticket_model = await ticket().create({
      user_id,
      status_id: initial_status,
      description
    });
    await categories_id_list.forEach(async categorie_id => {
      await ticket_categorie().create({
        ticket_id: ticket_model.ticket_id,
        categorie_id
      })
    });

    return 'Your ticket was sucefuly created';
  },
  async search_ticket (req) {
    const user_id = req.body.user_id;
    console.log(user_id)
    const ticket_list = await ticket().findAll({
      where: {
        user_id
      }
    }).map(async ticket => (
      `${ticket.description} - ${(await ticket.getStatus()).name}<br />`
    ));

    return ticket_list.join('\n');
  }
}
