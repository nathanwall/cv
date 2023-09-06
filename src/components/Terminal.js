import { useState, MouseEvent } from 'react';
import Terminal, { ColorMode, TerminalInput, TerminalOutput, } from 'react-terminal-ui';
import { welcome, help, cv, links } from './Constants';

const TerminalController = (props = {}) => {
    const [colorMode, setColorMode] = useState(ColorMode.Dark);
    const [lineData, setLineData] = useState([
      <TerminalOutput>{welcome}&#128075;</TerminalOutput>,
      <TerminalOutput>Type 'help' to begin</TerminalOutput>,
			<TerminalOutput>Hint: Try using the &#128994; button if the CV is too long! </TerminalOutput>,
    ]);
		const [terminalHeight, setTerminalHeight] = useState("600px");

    function toggleColorMode (e) {
      e.preventDefault();
      setColorMode(colorMode === ColorMode.Light ? ColorMode.Dark : ColorMode.Light);
    }

		function toggleTerminalHeight() {
			setTerminalHeight(terminalHeight === "600px" ? "2800px" : "600px");
		}
  
    function onInput (input) {
      let ld = [...lineData];
      ld.push(<TerminalInput>{input}</TerminalInput>);

      if (input.toLocaleLowerCase().trim() === 'cv') {
				ld = [];
				setLineData(ld);
				for (let line = 0; line < cv.length; line++) {
					ld.push(<TerminalOutput>{cv[line]}</TerminalOutput>);
				}
			//} else if (input.toLocaleLowerCase().trim() === 'cv --pdf') {
				// TODO: Download the CV as a PDF
			} else if (input.toLocaleLowerCase().trim() === 'cv --download') {
				const element = document.createElement("a");
				const file = new Blob([cv.join('\n')], {type: 'text/plain'});
				element.href = URL.createObjectURL(file);
				element.download = "NathanWallCV.txt";
				document.body.appendChild(element); // Required for this to work in FireFox
				element.click();
   		} else if (input.toLocaleLowerCase().trim() === 'links') {
				links.forEach(function(link, index) {
					ld.push(<TerminalOutput>{link.name}: <a href={link.url} target="_blank">{link.url}</a></TerminalOutput>);
				});
			} else if (input.toLocaleLowerCase().trim() === 'help') {
				ld = [];
				setLineData(ld);
				for (let line = 0; line < help.length; line++) {
					ld.push(<TerminalOutput>{help[line]}</TerminalOutput>);
				}
			} else if (input.toLocaleLowerCase().trim() === 'clear') {
        ld = [];
      } else if (input) {
        ld.push(<TerminalOutput>Unrecognized command</TerminalOutput>);
      }
      setLineData(ld);
    }
  
    const redBtnClick = () => {
      console.log("Clicked the red button.");
    }
  
    const yellowBtnClick = () => {
      console.log("Clicked the yellow button.");
			setTerminalHeight("0px");

    }
  
    const greenBtnClick = () => {
      console.log("Clicked the green button.");
			toggleTerminalHeight();
    }
  
    const btnClasses = ['btn'];
    if (colorMode === ColorMode.Light) {
      btnClasses.push('btn-dark');
    } else {
      btnClasses.push('btn-light');
    }
    return (
      <div className="container" >
        <div className="d-flex flex-row-reverse p-2">
          <button className={ btnClasses.join(' ') } onClick={ toggleColorMode } >Enable { colorMode === ColorMode.Light ? 'Dark' : 'Light' } Mode</button>
        </div>
        <Terminal 
          name="Nathan's Terminal" 
          colorMode={ colorMode }  
          onInput={ onInput } 
          redBtnCallback={ redBtnClick } 
          yellowBtnCallback={ yellowBtnClick } 
          greenBtnCallback={ greenBtnClick }
					height={ terminalHeight }
        >
          {lineData}
        </Terminal>
      </div>
    )
  };

export default TerminalController;