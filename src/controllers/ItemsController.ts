import { Request, Response } from 'express';
import knex from '../database/connection';
import Utils from '../utils/Utils';


class ItemsController {

   async index (request: Request, response: Response) {
        let items = await knex('items').select('*');

    let serializedItems = Utils.serialize(items);

    return response.json(serializedItems);
    }
}

export default ItemsController;