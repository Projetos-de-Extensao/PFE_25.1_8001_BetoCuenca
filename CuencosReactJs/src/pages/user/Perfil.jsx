import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Perfil.css';

function Perfil() {
  const [userData, setUserData] = useState({
    name: "John Front End",
    email: "johnfrontend@gmail.com",
    phone: "(11) 99999-9999",
    profileImage: "/images/profile-placeholder.jpg"
  });

  const [isEditing, setIsEditing] = useState(false);
  const [editedData, setEditedData] = useState({...userData});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSave = (e) => {
    e.preventDefault();
    setUserData({...editedData});
    setIsEditing(false);
    // Aqui seria feita a chamada para API para atualizar os dados
    console.log("Dados atualizados:", editedData);
  };

  const handleCancel = () => {
    setEditedData({...userData});
    setIsEditing(false);
  };

  return (
    <div className="perfil-container">
      <div className="perfil-header">
        <h1>Meu Perfil</h1>
        <p>Gerencie suas informações pessoais</p>
      </div>

      <div className="perfil-content">
        <div className="perfil-sidebar">
          <div className="profile-image-container">
            <img 
              src={userData.profileImage} 
              alt="Foto de perfil" 
              className="profile-image" 
            />
            <button className="change-photo-btn">Alterar foto</button>
          </div>
          
          <nav className="perfil-nav">
            <ul>
              <li className="active">
                <Link to="/user/perfil">
                  <span className="nav-icon user-icon"></span>
                  Informações pessoais
                </Link>
              </li>
              <li>
                <Link to="/user/mudar-email">
                  <span className="nav-icon email-icon"></span>
                  Alterar e-mail
                </Link>
              </li>
              <li>
                <Link to="/user/mudar-senha">
                  <span className="nav-icon password-icon"></span>
                  Alterar senha
                </Link>
              </li>
              <li>
                <Link to="/user/favoritos">
                  <span className="nav-icon favorites-icon"></span>
                  Favoritos
                </Link>
              </li>
              <li>
                <Link to="/user/ingressos">
                  <span className="nav-icon tickets-icon"></span>
                  Meus ingressos
                </Link>
              </li>
            </ul>
          </nav>
        </div>

        <div className="perfil-details">
          <div className="section-header">
            <h2>Informações pessoais</h2>
            {!isEditing && (
              <button 
                className="edit-button"
                onClick={() => setIsEditing(true)}
              >
                Editar
              </button>
            )}
          </div>

          <form onSubmit={handleSave}>
            <div className="form-group">
              <label htmlFor="name">Nome completo</label>
              {isEditing ? (
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={editedData.name}
                  onChange={handleInputChange}
                />
              ) : (
                <p className="info-text">{userData.name}</p>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="email">E-mail</label>
              <p className="info-text">{userData.email}</p>
              {!isEditing && (
                <Link to="/user/mudar-email" className="change-link">
                  Alterar e-mail
                </Link>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="phone">Telefone</label>
              {isEditing ? (
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={editedData.phone}
                  onChange={handleInputChange}
                />
              ) : (
                <p className="info-text">{userData.phone}</p>
              )}
            </div>

            {isEditing && (
              <div className="button-group">
                <button type="submit" className="save-button">Salvar</button>
                <button 
                  type="button" 
                  className="cancel-button"
                  onClick={handleCancel}
                >
                  Cancelar
                </button>
              </div>
            )}
          </form>

          <div className="section-divider"></div>

          <div className="account-actions">
            <h3>Ações da conta</h3>
            <button className="action-button delete-account">
              Excluir minha conta
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Perfil;
