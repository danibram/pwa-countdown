const AdditionalCSS = () => {
  return (
    <>
      <div className="overlayScan"></div>
      <div className="overlayStatic"></div>
      <div className="overlayAnimation"></div>
      <a
        className={"absolute -top-4 -left-4"}
        style={{ transform: "rotate(135deg)" }}
        href="https://github.com/danibram/pwa-countdown"
        rel="noopener noreferrer"
        target="_blank"
      >
        <i className="nes-octocat animate"></i>
      </a>
    </>
  );
};

export default AdditionalCSS;
