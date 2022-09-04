import Button from "../atoms/Button";
import PWAInstall from "./PWAInstall";

const UpperMenu = ({
  isStopped,
  isPaused,
  onPause,
  onStop,
  showControls,
  showHelp,
}: {
  isStopped: boolean;
  isPaused: boolean;
  onPause: () => void;
  onStop: () => void;
  showControls: () => void;
  showHelp: () => void;
}) => {
  return (
    <div className="fixed right-0 text-md mt-2 mr-2">
      <PWAInstall />

      {!isStopped ? (
        <>
          {isPaused ? (
            <Button className="m-2 mr-2" onClick={() => onPause()}>
              {"|>"}
            </Button>
          ) : (
            <Button className="m-2 mr-2" onClick={() => onPause()}>
              {"||"}
            </Button>
          )}

          <Button className="m-2 mr-2" onClick={() => onStop()}>
            X
          </Button>
        </>
      ) : (
        <Button className="m-2 mr-2" onClick={() => showControls()}>
          Controls
        </Button>
      )}

      <Button className="m-2 mr-2" onClick={() => showHelp()}>
        ?
      </Button>
    </div>
  );
};

export default UpperMenu;
