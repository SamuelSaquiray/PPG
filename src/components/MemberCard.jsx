import PropTypes from 'prop-types';
function MemberCard({ title, description, imagen,cargo }) {
    return (
      <div className="container-member-card">
        <img src={imagen} alt="" />
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
  