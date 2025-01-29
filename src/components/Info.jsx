export const Info = ({ title, description }) => {
  return (
    <div className="d-flex flex-column mb-20 flex justify-center align-center">
      <h2>{title}</h2>
      <p className="ml-40 mr-40">{description}</p>
    </div>
  );
};

export default Info;
