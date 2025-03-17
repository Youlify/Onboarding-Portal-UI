import "./index.less";

interface ButtonProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
  containerClassName?: string;
  style?: React.CSSProperties;
}

export const Button: React.FC<ButtonProps> = ({
  style,
  children,
  containerClassName,
  ...props
}) => {
  let className = "p-button";
  if (containerClassName) className += ` ${containerClassName}`;
  return (
    <div className={className} style={style} {...props}>
      {children}
    </div>
  );
};
