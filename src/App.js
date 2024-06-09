import logo from './logo.svg';
import SplitPane, { Pane } from 'split-pane-react';
import React, { useState } from 'react';
import 'split-pane-react/esm/themes/default.css';
import './App.css';

function App() {
  const [sizes, setSizes] = useState(["45%", "55%"]);

  const layoutCSS = {
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  };

  return (
    <div className="App">
      <header className="App-header overflow-hidden">
        <div className="flex flex-row h-dvh w-dvw max-w-screen bg-darkerindigo">
          <div id="sidebar" className='bg-gradient-to-tr from-medindigo from-30% to-lightindigo to-80% opacity-70 h-dvh basis-[4%] flex flex-col hover:basis-[5%] duration-150 transition-all'> 
            <div className="">
              <img src="https://pikmail.herokuapp.com/agencyxhq@gmail.com?size=50"/>
            </div>
          </div>

          <SplitPane split="vertical" sizes={sizes} resizerSize={4} onChange={setSizes} className="divide-x-8 divide-lightindigo divide-opacity-10">
            <Pane minSize="45%" maxSize="60%">
              <div id="chatscreen" className="h-dvh bg-gradient-radial to-darkerindigo from-0% from-darkindigo to-70% pl-[4rem]">
                <div id="intromsg" className="h-max flex-1 flex-col flex items-start space-y-1">
                  <p className="font-google font-bold text-left tracking-tighter text-3xl mt-7 lg:text-5xl xl:text-6xl lg:mt-10 2xl:text-7xl xl:mt-14 bg-gradient-to-br from-20% to-90% from-indigo-400 to-fuchsia-400 text-transparent bg-clip-text inline-block">
                    Hello, Username!
                  </p>
                  <p className="font-google pb-5 font-bold text-left tracking-tighter text-2xl lg:text-4xl xl:text-5xl 2xl:text-6xl bg-gradient-to-b opacity-70 from-gray-400 to-gray-500 text-transparent bg-clip-text inline-block">
                    How can I help you today?
                  </p>
                </div>
              </div>
            </Pane>

            <Pane minSize="40%" maxSize="55%">
              <div id="webdisplay" className="h-dvh bg-gradient-radial to-darkerindigo from-0% from-darkindigo to-80% flex-col flex">

              </div>
            </Pane>
          </SplitPane>

        </div>
      </header>
    </div>
  );
}

export default App;
