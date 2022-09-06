/* eslint-disable @next/next/no-html-link-for-pages */
import Modal from "../atoms/Modal";
import NessButton from "../atoms/NessButton";
const ModalHelp = ({ onClose }: { onClose: () => void }) => {
  return (
    <Modal onClickOutside={() => onClose()}>
      <div className="lists p-4">
        <ul className="nes-list is-disc">
          <li>Follow onscreen indications or tap them</li>
          <li>
            You can preload the counter with the search param `init` in the url.
            Examples:
          </li>
          <ul className="nes-list is-circle">
            <li className="ml-4">
              <a href="/?init=3">3sec -&gt; `?init=3`</a>
            </li>
            <li className="ml-4">
              <a href="/?init=10">10sec -&gt; `?init=10`</a>
            </li>
            <li className="ml-4">
              <a href="/?init=300">3min -&gt; `?init=300`</a>
            </li>
            <li className="ml-4">
              <a href="/?init=1000">10min -&gt; `?init=1000`</a>
            </li>
          </ul>
        </ul>
      </div>
      <NessButton onClick={onClose}>Close</NessButton>
    </Modal>
  );
};

export default ModalHelp;
