// Mock data for tickets with localStorage persistence
const TICKETS_STORAGE_KEY = 'cuencos_tickets';

// Load tickets from localStorage
const loadTickets = () => {
  try {
    const storedTickets = localStorage.getItem(TICKETS_STORAGE_KEY);
    if (storedTickets) {
      return JSON.parse(storedTickets);
    }
  } catch (error) {
    console.error("Erro ao carregar tickets do localStorage:", error);
  }
  return [];
};

// Save tickets to localStorage
const saveTickets = (tickets) => {
  try {
    localStorage.setItem(TICKETS_STORAGE_KEY, JSON.stringify(tickets));
  } catch (error) {
    console.error("Erro ao salvar tickets no localStorage:", error);
  }
};

// Get the next ticket ID
const getNextId = (tickets) => {
  return tickets.length > 0 ? Math.max(...tickets.map(t => t.id)) + 1 : 1;
};

// Add a new ticket
export const addTicket = (ticketData) => {
  const tickets = loadTickets();
  const newTicket = {
    id: getNextId(tickets),
    purchaseDate: new Date().toISOString(),
    ...ticketData
  };
  
  tickets.push(newTicket);
  saveTickets(tickets);
  return newTicket;
};

// Get tickets by user ID
export const getTicketsByUserId = (userId) => {
  if (!userId) return [];
  
  const tickets = loadTickets();
  return tickets.filter(ticket => ticket.userId === userId);
};

// Get a specific ticket by ID
export const getTicketById = (ticketId) => {
  try {
    const tickets = JSON.parse(localStorage.getItem('tickets')) || [];
    return tickets.find(ticket => ticket.id === ticketId);
  } catch (error) {
    console.error('Erro ao buscar ingresso:', error);
    return null;
  }
};

// Check if a user has purchased a specific ticket for an event
export const hasTicketForEvent = (userId, eventId) => {
  if (!userId) return false;
  
  const userTickets = getTicketsByUserId(userId);
  return userTickets.some(ticket => ticket.eventId === eventId);
};

// Initialize with some sample tickets for the test user
const initializeTickets = () => {
  const tickets = loadTickets();
  
  // Only initialize if there are no tickets
  if (tickets.length === 0) {
    // Add a sample ticket for the test user
    const sampleTicket = {
      id: 1,
      userId: "johnfrontend@gmail.com",
      eventId: 2,
      eventTitle: "Calourada 2025.1",
      eventImage: "/lovable-uploads/68619dad-8ba1-48be-8d77-8858c3151a75.png",
      eventDate: "8 de Maio de 2025",
      eventLocation: "UFRJ - Rio de Janeiro / RJ",
      ticketType: "Lote 1",
      quantity: 1,
      attendeeName: "John Frontend",
      attendeeEmail: "johnfrontend@gmail.com",
      attendeePhone: "+5521999887766",
      purchaseDate: new Date().toISOString()
    };
    
    saveTickets([sampleTicket]);
  }
};

// Run initialization
initializeTickets();
