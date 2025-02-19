import { useTranslation } from 'react-i18next';
import "./Home.scss";
import img from "../img/financial-crime-and-bribe-concept-human-hands-giving-and-taking-money-bribe-doing-corruption-over-blue-background-illustration-vector.jpg";
import img2 from "../img/original-defd5410841e3d97fd129d8c83ae8eef.png";

const Home = () => {
  const { t } = useTranslation();

  return (
    <div className="home-page">
      <h1>{t("HOME.Manage Your Expense")}</h1>
      <h2>Save Money</h2>
      <h4>start saving money with this app</h4>
      <button className="btn-start">Get Strated</button>
      <div className="img-top">
        <img className="img" src={img} alt="" />
        <p>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Maiores
          fugiat quidem aspernatur enim minima laborum aliquam voluptate saepe
          pariatur? Ducimus?
        </p>
      </div>
      <div className="img-mid">
        <img className="img2" src={img2} alt="" />
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat alias
          necessitatibus aut doloribus blanditiis eum, est aspernatur
          perferendis rerum deserunt!
        </p>
      </div>
    </div>
  );
};

export default Home;
