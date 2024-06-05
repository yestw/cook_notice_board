import { Link } from "react-router-dom"
import style from "./Header.module.scss";

export const Header = () => {
  return (
    <header>
      <div className={style.header}>
        <p>Cook Book</p>
        <ul className={style.ul}>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/posts">레시피</Link></li>
        </ul>
      </div>
    </header>
  )
}