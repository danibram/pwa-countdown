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
            <p className="title">{`${counterView[0]}:${counterView[1]}`}</p>
            <div className="flex justify-center my-6 ">
              <Keyboard onPressNumber={onPressNumber} onStop={onStop} />
            </div>
          </div>
          <NessButton onClick={onClose}>Close</NessButton>
          <NessButton onClick={onStart}>Start</NessButton>
        </dialog>
      </div>
    </div>
  );
};

export default ModalHelp;
