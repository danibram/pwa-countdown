import Button from "../atoms/Button";

const PWAInstallButton = ({ onClick }: { onClick: any }) => {
  return (
    <Button className="m-2 mr-2" onClick={onClick}>
      Install as PWA
    </Button>
  );
};

export default PWAInstallButton;
