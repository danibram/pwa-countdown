import Modal from "../atoms/Modal";
import NessBlock from "../atoms/NessBlock";
import NessButton from "../atoms/NessButton";
import Keyboard from "../molecules/Keyboard";

const ModalHelp = ({
  counterView,
  onPressNumber,
  onStop,
  onClose,
  onStart,
}: {
  counterView: [string, string];
  onPressNumber: (arg0: number) => void;
  onStop: () => void;
  onClose: () => void;
  onStart: () => void;
}) => {
  return (
    <Modal>
      <NessBlock title={`${counterView[0]}:${counterView[1]}`}>
        <Keyboard onPressNumber={onPressNumber} onStop={onStop} />
      </NessBlock>
      <NessButton onClick={onClose}>Close</NessButton>
      <NessButton onClick={onStart}>Start</NessButton>
    </Modal>
  );
};

export default ModalHelp;
