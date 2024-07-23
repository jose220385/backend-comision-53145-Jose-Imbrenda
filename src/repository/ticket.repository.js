export default class TicketRepository{
    constructor(TicketsDao){
        this.ticketsDao = TicketsDao
    }

    createTicket = async(ticket)=> {return await this.ticketsDao.create(ticket)}

    getTicket = async(ticketID)=>{return await this.ticketsDao.getBy({_id:ticketID})}
}