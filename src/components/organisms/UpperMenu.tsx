import Button from "../atoms/Button";
import PWAInstall from "./PWAInstall";

const UpperMenu = ({ showHelp }: { showHelp: () => void }) => {
  return (
    <div className="fixed right-0 text-md mt-2 mr-2">
      <PWAInstall />

      <Button className="m-2 mr-2" onClick={() => showHelp()}>
        ?
      </Button>
    </div>
  );
};

export default UpperMenu;
