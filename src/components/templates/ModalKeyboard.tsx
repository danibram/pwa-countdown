import { toClock } from "../../helpers/formating";
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
  counterView: [string, string, string, string];
  onPressNumber: (arg0: number) => void;
  onStop: () => void;
  onClose: () => void;
  onStart: () => void;
}) => {
  return (
    <Modal onClickOutside={() => onClose()}>
      <NessBlock title={toClock(counterView)}>
        <Keyboard onPressNumber={onPressNumber} onStop={onStop} />
      </NessBlock>
      <NessButton onClick={onClose}>Close</NessButton>
      <NessButton onClick={onStart}>Start</NessButton>
    </Modal>
  );
};

export default ModalHelp;
