import { ADD_TICKET,DELETE_TICKET, UPDATE_TICKET } from "../constants/ticketConstant";

const initialState = {
    ticketData:[]
}

const ticketReducer = (state = initialState,action) => {
    switch (action.type) {
        case ADD_TICKET:
            const newTicket = {
				seat: action.payload,
				gender: "",
				name: "",
				age: "",
			};
            return{
                ticketData:[...state.ticketData,newTicket]
            }
        
        case UPDATE_TICKET:
            var tickets = state.ticketData;
            const index = tickets.map(item => item.seat).indexOf(action.payload.seat);
            tickets[index] = action.payload;
            return {
                ticketData:tickets
            }

        case DELETE_TICKET:
            console.log(typeof(action.payload));
            let data = state.ticketData;
            data = data.filter(ticket => ticket.seat !== action.payload)
            return {
                ticketData:[...data]
            }
        default:
            return state
    }
}

export default ticketReducer