const NessBlock = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => {
  return (
    <div className="block container nes-container is-dark with-title mb-6 text-left">
      <p className="title">{title}</p>
      <div className="flex justify-center my-6 ">{children}</div>
    </div>
  );
};

export default NessBlock;
