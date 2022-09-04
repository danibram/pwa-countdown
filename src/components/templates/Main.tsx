import Countdown from "../organisms/Countdown";

const ModalHelp = ({
  isRunning,
  count,
  counterView,
}: {
  isRunning: boolean;
  count: number;
  counterView: [string, string];
}) => {
  return (
    <main className="container mx-auto flex flex-col items-center justify-center min-h-screen">
      <div className="container flex ">
        <Countdown
          isRunning={isRunning}
          count={count}
          counterView={counterView}
        />
      </div>
    </main>
  );
};

export default ModalHelp;
