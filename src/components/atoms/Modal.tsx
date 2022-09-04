import useClickOutside from "../../hooks/useClickOutside";

const Modal = ({
  children,
  onClickOutside,
}: {
  children: React.ReactNode;
  onClickOutside: () => void;
}) => {
  const ref: any = useClickOutside(onClickOutside);

  return (
    <div
      id="defaultModal"
      className="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 w-full h-full md:inset-0 h-modal md:h-full backdrop-blur-sm bg-white/30"
    >
      <div className="flex items-center p-4 w-full max-w-2xl h-full ">
        <dialog
          className="nes-dialog is-dark is-rounded"
          id="dialog-dark-rounded"
          open
          ref={ref}
        >
          {children}
        </dialog>
      </div>
    </div>
  );
};

export default Modal;
