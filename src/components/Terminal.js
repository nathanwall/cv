import { useState, MouseEvent } from "react";
import Terminal, {
  ColorMode,
  TerminalInput,
  TerminalOutput,
} from "react-terminal-ui";
import { welcome, help, cv, links } from "./Constants";

const TerminalController = (props = {}) => {
  // Build Welcome message
  let welcomeMessage = welcome.concat(help);
  let welcomeMessageLineData = [];
  for (let line = 0; line < welcomeMessage.length; line++) {
    welcomeMessageLineData.push(
      <TerminalOutput>{welcomeMessage[line]}</TerminalOutput>
    );
  }

  // set welcome message as initial state
  const [lineData, setLineData] = useState(welcomeMessageLineData);

  // set color mode dark as initial state
  const [colorMode, setColorMode] = useState(ColorMode.Dark);

  // set terminal height to 600px as initial state
  const [terminalHeight, setTerminalHeight] = useState("60vh");

  // toggle color mode
  function toggleColorMode(e) {
    e.preventDefault();
    setColorMode(
      colorMode === ColorMode.Light ? ColorMode.Dark : ColorMode.Light
    );
  }

  // toggle terminal height between 60vh and 80vh
  function toggleTerminalHeight() {
    // if we're at 60 (restored) or 0 (minimised) view height, set to 80 (maximised)
    setTerminalHeight(
      terminalHeight === "60vh" || terminalHeight === "0px" ? "80vh" : "60vh"
    );
  }

  // handle input
  function onInput(input) {
    let ld = [...lineData];
    ld.push(<TerminalInput>{input}</TerminalInput>);

    // dummy commands
    if (input.toLocaleLowerCase().trim() === "cv") {
      ld = [];
      setLineData(ld);
      for (let line = 0; line < cv.length; line++) {
        ld.push(<TerminalOutput>{cv[line]}</TerminalOutput>);
      }
    } else if (input.toLocaleLowerCase().trim() === "cv --download") {
      const element = document.createElement("a");
      const file = new Blob([cv.join("\n")], { type: "text/plain" });
      element.href = URL.createObjectURL(file);
      element.download = "NathanWallCV.txt";
      document.body.appendChild(element); // Required for this to work in FireFox
      element.click();
    } else if (input.toLocaleLowerCase().trim() === "links") {
      links.forEach(function (link, index) {
        ld.push(
          <TerminalOutput>
            {link.name}:{" "}
            <a href={link.url} target="_blank">
              {link.url}
            </a>
          </TerminalOutput>
        );
      });
    } else if (input.toLocaleLowerCase().trim() === "help") {
      ld = [];
      setLineData(ld);
      for (let line = 0; line < help.length; line++) {
        ld.push(<TerminalOutput>{help[line]}</TerminalOutput>);
      }
    } else if (input.toLocaleLowerCase().trim() === "clear") {
      ld = [];
    } else if (input) {
      ld.push(<TerminalOutput>Unrecognized command</TerminalOutput>);
    }

    // set line data
    setLineData(ld);
  }

  // Red button click
  const redBtnClick = () => {
    window.location.href = "https://www.linkedin.com/in/nathan-w-68022981";
  };
  // Yellow button click
  const yellowBtnClick = () => {
    setTerminalHeight("0px");
    document.getElementById("terminal-container").className = "container";
  };
  // Green button click
  const greenBtnClick = () => {
    // toggle terminal height
    toggleTerminalHeight();
    // toggle container width
    if (
      document.getElementById("terminal-container").className ===
      "container-fluid"
    ) {
      document.getElementById("terminal-container").className = "container";
    } else {
      document.getElementById("terminal-container").className =
        "container-fluid";
    }
  };

  const btnClasses = ["btn"];
  if (colorMode === ColorMode.Light) {
    btnClasses.push("btn-dark");
  } else {
    btnClasses.push("btn-light");
  }
  return (
    <div className="container" id="terminal-container">
      <div className="d-flex flex-row-reverse p-2">
        <button className={btnClasses.join(" ")} onClick={toggleColorMode}>
          Enable {colorMode === ColorMode.Light ? "Dark" : "Light"} Mode
        </button>
      </div>
      <Terminal
        name="Nathan's Terminal"
        colorMode={colorMode}
        onInput={onInput}
        redBtnCallback={redBtnClick}
        yellowBtnCallback={yellowBtnClick}
        greenBtnCallback={greenBtnClick}
        height={terminalHeight}
      >
        {lineData}
      </Terminal>
    </div>
  );
};

export default TerminalController;
