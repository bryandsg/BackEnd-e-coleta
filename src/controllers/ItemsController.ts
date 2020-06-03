import { Request, Response } from 'express';
import knex from '../database/connection';

//Url para os assets estaticos da aplicacao
const baseURL = 'http://localhost:3333/uploads/';

class ItemsController {

    

    async index (request: Request, response: Response) {
        let items = await knex('items').select('*');

    let serializedItems = items.map( item => {
        return {
            id: item.id,
            title: item.title,
            image_url: `${baseURL}${item.image}`
        };
    });

    return response.json(serializedItems);
    }
}

export default ItemsController;