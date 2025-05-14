import { Link } from 'react-router-dom';
import Header from '../../../../prototipo-react/src/components/common/Header';
import Footer from '../../../../prototipo-react/src/components/common/Footer';
import './Logado.css';

const Logado = () => {
  return (
    <>
      <Header isLoggedIn={true} />
      
      {/* HERO */}
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
      
      <section className="filtro">
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
            <span className="filtro-valor">Qualquer Data</span>
            <div className="filtro-linha"></div>
          </div>
        </div>
      </section>

      {/* EVENTOS EM ALTA */}
      <section className="eventos">
        <div className="eventos-header">
          <h2>Eventos em alta</h2>
          <div className="eventos-filtros">
            <select>
              <option>Dias da Semana</option>
            </select>
            <select>
              <option>Qualquer Categoria</option>
            </select>
          </div>
        </div>

        <div className="eventos-grid">
          {[1, 2, 3, 4].map((index) => (
            <div className="card-evento" key={index}>
              <img src={`/images/eventos/evento${index}.png`} alt={`Evento ${index}`} />
              <div className="info">
                <span>
                  {['MAY', 'MAY', 'JUN', 'JUL'][index - 1]}
                </span>
                <h3>
                  {['Calourada 2025.1', 'Ressaca dos Campeões', 'Festa Junina Universitária', 'Festival de Inverno'][index - 1]}
                </h3>
                <p>
                  {[
                    'Calourada da UFRJ, do campus de Duque de Caxias.',
                    'O Unigarças acabou mas as comemorações só começaram!',
                    'Uma festa junina como você nunca viu!',
                    'Um festival com música, arte e cultura para aquecer o inverno.'
                  ][index - 1]}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="explorar">
          <button>Explorar Mais</button>
        </div>
      </section>
      
      <Footer />
    </>
  );
};

export default Logado;
