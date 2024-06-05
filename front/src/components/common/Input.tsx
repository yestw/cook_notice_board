import style from "./Input.module.scss";

type Props = {
  type: string,
  propValue: string,
  title: string,
  onChange:(e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
}

export const Input = ({type, title, propValue, onChange, className=style.input}: Props) => {
  return (
    <div className={className}>
      <span>{title}: </span><input type={type} onChange={onChange} value={propValue}/>
    </div>
  )
}