/* eslint-disable @next/next/no-html-link-for-pages */
import Modal from "../atoms/Modal";
import NessButton from "../atoms/NessButton";
const ModalHelp = ({ onClose }: { onClose: () => void }) => {
  return (
    <Modal onClickOutside={() => onClose()}>
      <div className="p-4 text-xs">
        <h3 className="pb-2">On PC your can use: </h3>
        <div className="lists pb-2 ml-4">
          <ul className="nes-list is-disc">
            <li>Press numbers to load the counter</li>
            <li>Spacebar to pause</li>
            <li>Esc/Backspace to stop</li>
            <li>Enter to start when it has number loaded</li>
          </ul>
        </div>
        <h3 className="pb-2">
          You can preload the counter with the search param `init` in the url.
          Examples:
        </h3>
        <div className="lists ml-4">
          <ul className="nes-list is-disc">
            <li>
              <a href="/?init=3">3sec -&gt; `?init=3`</a>
            </li>
            <li>
              <a href="/?init=10">10sec -&gt; `?init=10`</a>
            </li>
            <li>
              <a href="/?init=300">3min -&gt; `?init=300`</a>
            </li>
            <li>
              <a href="/?init=1000">10min -&gt; `?init=1000`</a>
            </li>
          </ul>
        </div>
      </div>
      <NessButton onClick={onClose}>Close</NessButton>
    </Modal>
  );
};

export default ModalHelp;
