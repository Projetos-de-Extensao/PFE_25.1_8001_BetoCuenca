import React from 'react';
import { Link } from 'react-router-dom';
import EventCard from './EventCard';
import Container from './ui/container';
import Grid from './ui/grid';

const EventList = ({ title, events }) => {
  return (
    <div className="py-6 md:py-8">
      <Container>
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
          <h2 className="text-2xl md:text-3xl font-bold text-cuencos-purple mb-4 sm:mb-0">{title}</h2>
          <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4 w-full sm:w-auto">
            <div className="relative">
              <select className="w-full sm:w-auto appearance-none bg-white bg-opacity-10 border border-gray-600 rounded-full py-1 pl-4 pr-8 text-white">
                <option>Dias da Semana</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-white">
                <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                  <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
                </svg>
              </div>
            </div>
            <div className="relative">
              <select className="w-full sm:w-auto appearance-none bg-white bg-opacity-10 border border-gray-600 rounded-full py-1 pl-4 pr-8 text-white">
                <option>Qualquer Categoria</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-white">
                <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                  <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
                </svg>
              </div>
            </div>
          </div>
        </div>

        <Grid cols={4} className="mb-8">
          {events.map(event => (
            <EventCard key={event.id} event={event} />
          ))}
        </Grid>

        {events.length > 6 && (
          <div className="text-center mt-6 md:mt-8">
            <Link to="/events" className="border border-cuencos-purple text-cuencos-purple hover:bg-cuencos-purple hover:text-white py-2 px-6 md:px-8 rounded-full inline-block transition-colors">
              Explorar Mais
            </Link>
          </div>
        )}
      </Container>
    </div>
  );
};

export default EventList;
