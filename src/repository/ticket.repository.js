export default class TicketRepository{
    constructor(TicketsDao){
        this.ticketsDao = TicketsDao
    }

    createTicket = async(ticket)=> {return await this.ticketsDao.create(ticket)}
}