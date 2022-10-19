import { Navigate } from "react-router-dom";
import { useUser } from "../../context/UserContext";
import { useGetLinks } from "../api";
import OneLink from "../OneLink/OneLink";
import "./ListLinks.css";

const ListLinks = ({ reload, result, fetchKey, setResult }) => {
  const user = useUser();
  const [links] = useGetLinks(fetchKey);

  if (!user) {
    return <Navigate to="/" />;
  }
  const onClickEvent = () => {
    setResult(undefined);
  };

  return (
    <ul className="listLinks">
      {result?.data.length === 0 && (
        <li className="messageResponse">
          <p>Aún no tienes enlaces compartidos</p>
          <button onClick={() => onClickEvent()}>volver</button>
        </li>
      )}
      {result === undefined
        ? links?.data?.map((link) => (
            <li key={link.id_link}>
              <OneLink link={link} reload={reload} />
            </li>
          ))
        : result.data?.map((link) => (
            <li key={link.id_link}>
              <OneLink link={link} reload={reload} />
            </li>
          ))}
    </ul>
  );
};

export default ListLinks;
