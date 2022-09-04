import Modal from "../atoms/Modal";
import NessBlock from "../atoms/NessBlock";
import NessButton from "../atoms/NessButton";

const ModalHelp = ({ onClose }: { onClose: () => void }) => {
  return (
    <Modal>
      <NessBlock title={"Trainer tips"}>
        <div className="lists">
          <ul className="nes-list is-disc">
            <li>
              Mobile user use controls button, pc users continue reading ;)
            </li>
            <li>Set timer with keyboard numbers</li>
            <li>Enter to start</li>
            <li>Spacebar to pause / unpause</li>
            <li>Escape / Backspace to stop</li>
          </ul>
        </div>
      </NessBlock>
      <NessButton onClick={onClose}>Close</NessButton>
    </Modal>
  );
};

export default ModalHelp;
