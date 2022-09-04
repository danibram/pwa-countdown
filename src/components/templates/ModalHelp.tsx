import Modal from "../atoms/Modal";
import NessBlock from "../atoms/NessBlock";
import NessButton from "../atoms/NessButton";

const ModalHelp = ({ onClose }: { onClose: () => void }) => {
  return (
    <Modal onClickOutside={() => onClose()}>
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
            <li>
              You can preload the counter with the search param `init`.
              Examples:
            </li>
            <ul className="nes-list is-circle">
              <li className="ml-4">3sec -&gt; `?init=3`</li>
              <li className="ml-4">10sec -&gt; `?init=10`</li>
              <li className="ml-4">3min -&gt; `?init=300`</li>
              <li className="ml-4">10min -&gt; `?init=1000`</li>
            </ul>
          </ul>
        </div>
      </NessBlock>
      <NessButton onClick={onClose}>Close</NessButton>
    </Modal>
  );
};

export default ModalHelp;
