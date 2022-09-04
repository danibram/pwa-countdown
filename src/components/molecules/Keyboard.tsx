import NessButton from "../atoms/NessButton";

export default function Keyboard(props: {
  onPressNumber: (n: number) => void;
  onStop: () => void;
}) {
  const { onPressNumber, onStop } = props;

  return (
    <>
      <div className="flex flex-col">
        <div className="flex">
          {[1, 2, 3].map((n) => (
            <NessButton key={`button-${n}`} onClick={() => onPressNumber(n)}>
              {n}
            </NessButton>
          ))}
        </div>
        <div className="flex">
          {[4, 5, 6].map((n) => (
            <NessButton key={`button-${n}`} onClick={() => onPressNumber(n)}>
              {n}
            </NessButton>
          ))}
        </div>
        <div className="flex">
          {[7, 8, 9].map((n) => (
            <NessButton key={`button-${n}`} onClick={() => onPressNumber(n)}>
              {n}
            </NessButton>
          ))}
        </div>
        <div className="flex">
          <NessButton onClick={() => onStop()}>X</NessButton>
          <NessButton onClick={() => onPressNumber(0)}>0</NessButton>
          <div />
        </div>
      </div>
    </>
  );
}
