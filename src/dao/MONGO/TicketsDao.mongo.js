import DaoMongo from "./daoMongo.js";
import { ticketModel } from "./models/ticket.model.js";

export default class TicketsDaoMongo extends DaoMongo {
    constructor(){
        super(ticketModel)
    }
}

