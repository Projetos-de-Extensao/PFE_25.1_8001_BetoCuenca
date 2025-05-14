import { Link } from 'react-router-dom';
import Header from '../../../../prototipo-react/src/components/common/Header';
import Footer from '../../../../prototipo-react/src/components/common/Footer';
import './Home.css';

const Home = () => {
  return (
    <>
      <Header isLoggedIn={false} />
      
      <main>
        {/* Hero Section */}
        <section className="hero">
          <div className="hero-content">
            <h1>PUC IN RIO</h1>
            <p>Quem aí não perde uma festa da MAIOR DA CAPITAL? Pensando em vocês, o Hellboy soltou mais uma edição da PUC IN RIO!!</p>
            <div className="hero-buttons">
              <Link to="#" className="btn primary">Comprar</Link>
              <Link to="#" className="btn secondary">Saiba Mais</Link>
            </div>
          </div>
        </section>

        {/* Filtros */}
        <section className="filtro-central">
          <div className="filtro-box">
            <div className="filtro-item">
              <span className="filtro-label">Search Event</span>
              <span className="filtro-valor">Jogos</span>
              <div className="filtro-linha"></div>
            </div>
            <div className="filtro-item">
              <span className="filtro-label">Local</span>
              <span className="filtro-valor">Todos</span>
              <div className="filtro-linha"></div>
            </div>
            <div className="filtro-item">
              <span className="filtro-label">Data</span>
              <span className="filtro-valor dropdown">Qualquer Data</span>
              <div className="filtro-linha"></div>
            </div>
          </div>
        </section>

        {/* Eventos em alta */}
        <section className="eventos">
          <h2>Eventos em alta</h2>
          <div className="event-grid">
            {[1, 2, 3, 4, 5, 6].map((index) => (
              <div className="event-card" key={index}>
                <img src={`/images/eventos/evento${index}.png`} alt={`Evento ${index}`} />
                <div className="event-info">
                  <span className="month">{['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN'][index - 1]}</span>
                  <h3>
                    {[
                      'Calourada 2025.1',
                      'Ressaca dos Campeões',
                      'Festa Junina Universitária',
                      'Festival de Inverno',
                      'Noite do Flashback',
                      'Semana Acadêmica'
                    ][index - 1]}
                  </h3>
                  <p>
                    {[
                      'Calourada da UFRJ, Duque de Caxias.',
                      'O Unigarças acabou, mas as comemorações só começaram!',
                      'Uma festa junina como você nunca viu, com muita música e diversão!',
                      'Um festival com música, arte e cultura para aquecer o inverno.',
                      'Reviva os melhores hits dos anos 80 e 90 em uma noite inesquecível.',
                      'Uma semana cheia de palestras, workshops e networking para estudantes.'
                    ][index - 1]}
                  </p>
                </div>
              </div>
            ))}
          </div>
          <div className="center">
            <Link to="#" className="btn explore">Explorar Mais</Link>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
};

export default Home;
