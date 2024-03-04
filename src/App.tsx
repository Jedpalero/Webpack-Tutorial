import "./styles.css";
import IMAGE from "./map.png";
import SVG from "./hello.svg";

const App = () => {
  return (
    <>
      <h1>
        React TypeScript Webpack Starter Template - {process.env.NODE_ENV}{" "}
        {process.env.name}{" "}
      </h1>
      <img src={IMAGE} alt="picture" width="300" />
      <img src={SVG} alt="svg-example" width="300" />
    </>
  );
};

export default App;
