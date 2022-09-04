const Button = ({
  onClick,
  children,
}: {
  onClick: () => void;
  children: React.ReactNode;
}) => {
  return (
    <button type="button" className="nes-btn" onClick={() => onClick()}>
      {children}
    </button>
  );
};

export default Button;
