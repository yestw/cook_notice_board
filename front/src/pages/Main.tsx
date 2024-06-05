import { Link } from "react-router-dom"

export const Main = () => {
  return (
    <div>
      <p>안녕하세요. Cook Book 입니다.</p>
      <p>원하시는 레시피를 찾아 요리하시면 됩니다.</p>
      <Link to="/posts">레시피 보러가기</Link>
    </div>
  )
}