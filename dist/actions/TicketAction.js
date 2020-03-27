'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _models = require('../models');

var _naturalLanguageUnderstanding = require('../services/naturalLanguageUnderstanding');

exports.default = {
  async create_ticket(req) {
    const description = req.body.description;
    const user_id = req.body.user_id;
    const initial_status = 1;
    let categories_id_list = [];

    if (!description) {
      return 'Description not found';
    }

    await (0, _naturalLanguageUnderstanding.analyze)({
      text: description
    }).then(async response => {
      // get all categories id and set in categories_id_list
      const categories = response.result.categories.map(categorie => categorie.label);
      categories_id_list = await (0, _models.categorie)().findAll({
        where: {
          name: categories
        }
      }).map(categorie => categorie.categorie_id);
      console.log('categories_id_list', categories_id_list);
    });
    const ticket_model = await (0, _models.ticket)().create({
      user_id,
      status_id: initial_status,
      description
    });
    await categories_id_list.forEach(async categorie_id => {
      await (0, _models.ticket_categorie)().create({
        ticket_id: ticket_model.ticket_id,
        categorie_id
      });
    });

    return 'Your ticket was sucefuly created';
  },
  async search_ticket(req) {
    const user_id = req.body.user_id;
    const ticket_list = await (0, _models.ticket)().findAll({
      where: {
        user_id
      }
    }).map(async ticket => `${ticket.description} - ${(await ticket.getStatus()).name}<br />`);

    return ticket_list.join('\n');
  }
};
//# sourceMappingURL=TicketAction.js.map