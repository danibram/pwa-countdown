import NessButton from "../atoms/NessButton";

const ModalHelp = ({ onClose }: { onClose: () => void }) => {
  return (
    <div
      id="defaultModal"
      className="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 w-full h-full md:inset-0 h-modal md:h-full backdrop-blur-sm bg-white/30"
    >
      <div className="p-4 w-full max-w-2xl h-full md:h-auto">
        <dialog
          className="nes-dialog is-dark is-rounded"
          id="dialog-dark-rounded"
          open
        >
          <div className="block container nes-container is-dark with-title mb-6 text-left">
            <p className="title">Trainer tips</p>
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
          </div>
          <NessButton onClick={onClose}>Close</NessButton>
        </dialog>
      </div>
    </div>
  );
};

export default ModalHelp;
