import style from "./Button.module.scss";

type Props = {
  title: string,
  onClick: () => void,
  className?: string,
}

export const Button = ({title, onClick, className=style.btn}: Props) => {
  return (
    <button onClick={onClick} className={className}>{title}</button>
  )
}