const GlitchClock = ({ clock, style = {} }: { clock: string; style?: any }) => {
  return (
    <div className="counter glitch" style={style}>
      <span>{clock}</span>
      {clock}
      <span>{clock}</span>
    </div>
  );
};

export default GlitchClock;
