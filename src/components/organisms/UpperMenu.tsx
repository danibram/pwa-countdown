import Button from "../atoms/Button";
import PWAInstall from "./PWAInstall";

const UpperMenu = ({
  showHelp,
  muted,
  toogleMute,
}: {
  muted: boolean;
  toogleMute: () => void;
  showHelp: () => void;
}) => {
  return (
    <div className="fixed right-0 text-md mt-2 mr-2">
      <PWAInstall />

      <Button className="m-2 mr-2" onClick={() => toogleMute()}>
        {!muted ? (
          <i className="nes-icon is-small star"></i>
        ) : (
          <i className="nes-icon is-small star is-empty"></i>
        )}
      </Button>
      <Button className="m-2 mr-2" onClick={() => showHelp()}>
        ?
      </Button>
    </div>
  );
};

export default UpperMenu;
