import Button from "../atoms/Button";
import { MuteIcon, VolumeIcon } from "../atoms/musicIcons";
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
    <div className="fixed flex right-0 text-md mt-2 mr-2">
      <PWAInstall />

      <Button className="m-2 mr-2" onClick={() => toogleMute()}>
        {!muted ? <VolumeIcon style="h-6 w-6" /> : <MuteIcon style="h-6 w-6" />}
      </Button>
      <Button className="m-2 mr-2" onClick={() => showHelp()}>
        ?
      </Button>
    </div>
  );
};

export default UpperMenu;
