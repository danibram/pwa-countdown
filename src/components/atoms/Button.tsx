const Button = ({
  onClick,
  children,
  className,
}: {
  onClick: () => void;
  children: React.ReactNode;
  className: string;
}) => {
  return (
    <button
      type="button"
      className={"p-2 btn " + className}
      onClick={() => onClick()}
    >
      {children}
    </button>
  );
};

export default Button;
