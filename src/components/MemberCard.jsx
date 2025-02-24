import PropTypes from 'prop-types';
function MemberCard({ title, description, imagen,cargo }) {
  const defaultImage = "image.png"; 
  return(
      <div className="container-member-card">
      <img src={imagen || defaultImage} className="Perfil" alt="Foto de perfil" onError={(e) => e.target.src = defaultImage} />
      <h2 className="member-card-title">{title}</h2>
        <p>{description}</p>
        <h3>{cargo}</h3>
      </div>
    );
  }
  MemberCard.propTypes = {
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    imagen: PropTypes.string,
    cargo: PropTypes.string.isRequired,
  };
  export default MemberCard;
  
