interface PageProps {
  className: string;
  onClick: () => void;
  data: number;
}

export const Page = ({className, onClick, data}: PageProps) => {
  return (
    <li className={className} onClick={onClick}>{data}</li>
  )
}