import PropTypes from 'prop-types';
function MemberCard({ title, description }) {
    return (
      <div className="container-member-card">
        <img src="" alt="" />
        <h2 className="member-card-title">{title}</h2>
        <p>{description}</p>
      </div>
    );
  }
  MemberCard.propTypes = {
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
  };
  export default MemberCard;
  