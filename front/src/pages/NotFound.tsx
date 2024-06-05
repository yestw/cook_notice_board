import { Link } from "react-router-dom";

export const NotFound = () => {
  return (
    <div>
      <p>페이지가 존재하지 않습니다.</p>
      <Link to={"/"}>뒤로</Link>
    </div>
  );
};
