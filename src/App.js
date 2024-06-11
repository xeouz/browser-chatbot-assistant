import logo from './logo.svg';
import SplitPane, { Pane } from 'split-pane-react';
import React, { useEffect, useState } from 'react';
import 'split-pane-react/esm/themes/default.css';
import './App.css';
import ChatMessage from './ChatMessage';
import Iframe from 'react-iframe';

function App() {
  const [sizes, setSizes] = useState(["45%", "55%"]);
  const [introMessageVisibility, setIntroMessageVisibility] = useState(true)
  const [convoChats, setConvoChats] = useState([]);
  const [inputURL, setInputURL] = useState("")
  const [inputEmail, setInputEmail] = useState("")
  const [inputUsername, setInputUsername] = useState("")
  const [isLoggedIn, setIsLoggedIn] = useState(true)

  function onRefreshClick() {
    window.location.reload()
  }

  const inputPlaceholder = "Enter a question here";

  function loadURL(url) {
    setIntroMessageVisibility(false)
    setInputURL(url)
  }

  function isValidEmail(email) {
    return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
  }

  function loginEmail(email, username) {
    if(!email)
      return;

    setInputEmail(email);
    setInputUsername(username)
    setIsLoggedIn(true);
  }

  let [chats, setChats] = useState([])

  function addChatInner(inp, author) {
    const text = inp.trim().replace(/[^\x00-\x7F]/g, "");

    if (text == "")
      return 0;

    let chatObject = {content: text, timestamp: Date.now(), author: author}

    setChats([...chats, chatObject])
    console.log(chats)

    return 1
  }

  function addUserChat(inp) {
    setTimeout(() => addBotChat("BOT: "+inp.trim()), 200)

    return addChatInner(inp, "user")
  }

  function addBotChat(inp) {
    return addChatInner(inp, "bot")
  }

  function onTextSubmit(e) {
    if (e.key === "Enter" && e.shiftKey == false) {
      const data = e.target.innerText;
      e.target.innerHTML='';
      e.target.innerText='';
      e.preventDefault()
      addUserChat(data)
    }
  }

  function onChatsChange() {
    const latest_chat = chats.at(-1)
    if (latest_chat)
    {
      setConvoChats([...convoChats, ChatMessage(latest_chat['content'], latest_chat['author'])])
    }
  }

  function isValidUrl(string) {
    try {
      new URL(string);
      return true;
    } catch (err) {
      return false;
    }
  }

  function onLinkSubmit(e) {
    if (e.key === "Enter" && e.shiftKey == false) {
      const data = e.target.value;
      e.preventDefault()

      if(data) {
        if (isValidUrl(data)) {
          loadURL(data)
        }
      }
    }
  }

  function onWebLinkClick(e) {
    window.open(inputURL, '_blank').focus();
  }

  function onEmailEnter(e) {
    if (e.key === "Enter" && e.shiftKey == false) {
      const data = e.target.value;
      e.preventDefault()
      
      if(!isValidEmail(data)) {
        const element = document.getElementById('email')

        element.classList.remove('animate-shake'); // reset animation
        void element.offsetWidth; // trigger reflow
        element.classList.add('animate-shake'); // start animation
      }
    }
  }

  function onUsernameEnter(e) {
    if (e.key === "Enter" && e.shiftKey == false) {
      const data = e.target.value;
      e.preventDefault()
      
      if(data === "") {
        const element = document.getElementById('email')

        element.classList.remove('animate-shake'); // reset animation
        void element.offsetWidth; // trigger reflow
        element.classList.add('animate-shake'); // start animation
      }
    }
  }
  
  useEffect(() => {
    onChatsChange()
  }, [chats])

  const layoutCSS = {
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  };

  return (
    <div className="App">
      <header className="App-header overflow-hidden z-0">
        <div id="modal"className={"absolute flex flex-col h-[60%] w-[25%] bg-gradient-to-b from-darkindigo to-medindigo via-baseindigo border-lightindigo border-[2px] drop-shadow-2xl z-50 rounded-[1rem] bg-opacity-35 " + (isLoggedIn?"hidden":"visible")}>
          <p className='font-google font-bold tracking-normal p-8 text-center text-5xl border-b-4 border-b-lightindigo bg-gradient-to-br from-slate-100 from-30% to-slate-700 text-transparent bg-clip-text inline-block'>Sign in</p>
          <div className='flex-1 flex flex-col'>
            <form className='flex flex-col space-y-3 p-8 text-left font-google font-medium text-xl'>
              <p className=''>Your email</p>
              <input type="email" id="email" onKeyDown={onEmailEnter} required className={'rounded-lg bg-lightindigo border-lighterindigo border animate-shake invalid:border-red-500 invalid:border-2'} placeholder='example@abc.com' />
              <p className='pt-6'>Your username</p>
              <input type="text" id="username" onKeyDown={onEmailEnter} required className={'rounded-lg bg-lightindigo border-lighterindigo border animate-shake invalid:border-red-500 invalid:border-2'} placeholder='Username' />
              <div className='flex flex-col justify-center items-center bg-gradient-to-b from-lighterindigo to-lightindigo rounded-xl h-16'>
                <button className='text-left text-3xl font-bold tracking-wide bg-gradient-to-br from-indigo-400 via-rose-400 to-[200%] hover:from-rose-400 hover:to-indigo-400 transition-all duration-300 bg-clip-text text-transparent inline-block'>Submit</button>
              </div>
            </form>
          </div>
        </div>
        
        <div className={"flex flex-row h-dvh w-dvw max-w-screen bg-darkerindigo " + (isLoggedIn?"":"brightness-50")}>
          <div id="sidebar" className='bg-lightindigo hover:shadow-[inset_0_-3px_30px_rgba(0,0,0,0.15)] opacity-90 h-dvh flex flex-col justify-between duration-300 transition-all hover:basis-[4.5%] basis-[3%]'>
            <button className="px-1 py-2 pt-3 duration-200 transition-all hover:shadow-2xl">
              <i className='material-icons md-account_circle duration-200 md-48 md-dark opacity-[75%] scale-[80%] rounded-full p-[0.6rem] hover:bg-lighterindigo group bg-opacity-15'>
                <span className='invisible absolute group-hover:visible z-50 mt-16 -ml-3 rounded-lg bg-medindigo px-1 font-google font-bold text-base text-lighterindigo'>
                  Account
                </span>
              </i>
            </button>
            <div>
              <button onClick={onRefreshClick} className="px-1 py-2 pt-3 duration-200 transition-all hover:shadow-2xl">
                <i className='material-icons md-refresh duration-200 md-48 md-dark opacity-[75%] scale-[80%] rounded-full p-[0.6rem] hover:bg-lighterindigo group bg-opacity-15'>
                  <span className='invisible absolute group-hover:visible z-50 -mt-11 ml-[-0.7rem] rounded-lg bg-medindigo px-1 font-google font-bold text-base text-lighterindigo'>
                    Refresh
                  </span>
                </i>
              </button>
              <button className="px-1 py-2 pt-3 duration-200 transition-all hover:shadow-2xl">
                <i className='material-icons md-info duration-200 md-48 md-dark opacity-[75%] scale-[80%] rounded-full p-[0.6rem] hover:bg-lighterindigo group bg-opacity-15'>
                  <span className='invisible absolute group-hover:visible z-50 -mt-11 ml-[0.2rem] rounded-lg bg-medindigo px-1 font-google font-bold text-base text-lighterindigo'>
                    Info
                  </span>
                </i>
              </button>
            </div>
          </div>

          <SplitPane split="vertical" sizes={sizes} resizerSize={4} onChange={setSizes} className="divide-x-8 divide-lightindigo divide-opacity-10">
            <Pane minSize="45%" maxSize="60%">
              <div id="chatscreen" className="h-dvh bg-gradient-radial to-darkerindigo from-0% from-darkindigo to-70% items-stretch flex flex-col animate-in fade-in-50 zoom-in-95 duration-700 ease-out">
                <div id="intromsg" className={"select-none h-max flex-1 flex-col flex space-y-2 opacity-80 items-center z-30 pt-7 scale-[125%] " + (introMessageVisibility?"visible":"hidden")}>
                  <p className="font-google font-bold text-left tracking-tighter text-3xl mt-7 lg:text-4xl xl:text-5xl lg:mt-10 2xl:text-6xl xl:mt-14 bg-gradient-to-br from-30% to-90% from-indigo-400 to-rose-400 text-transparent bg-clip-text inline-block">
                    Hello, Varsha!
                  </p>
                  <p className="font-google pb-5 font-bold text-left tracking-tighter text-2xl lg:text-3xl xl:text-4xl 2xl:text-5xl bg-gradient-to-b opacity-70 from-gray-400 to-gray-500 text-transparent bg-clip-text inline-block">
                    How can I help you today?
                  </p>
                </div>

                <div className={"animate-in fade-in duration-300 h-40 z-30 font-google font-bold tracking-tighter bg-gradient-to-br from-lighterindigo via-indigo-400 to-rose-400 from-20% to-80% bg-clip-text text-transparent inline-block text-opacity-80 p-7 text-6xl " + (introMessageVisibility?"hidden":"visible")}>Conversation</div>
                <div className={"animate-in fade-in duration-300 h-40 z-20 -mt-[9rem] p-5 drop-shadow-2xl opacity-90 bg-gradient-to-r from-darkindigo via-medindigo to-darkindigo outline outline-1 outline-lightindigo " + (introMessageVisibility?"hidden":"visible")}/>
                <div id="conversation" className={"flex overflow-x-hidden overflow-y-scroll flex-col px-5 h-full relative pt-[10rem] -mb-[8rem] -top-[8rem] " + (introMessageVisibility?"hidden":"visible")}>
                  {convoChats}
                </div>

                <form className={'p-8 pt-12 h-full zoom-input flex align-top justify-center border-none outline-none bg-transparent ' + (introMessageVisibility?"visible":"hidden")}>
                  <input id="webinput" type="url" required rows="1" onKeyDown={onLinkSubmit} class={"hover:opacity-95 focus:opacity-95 focus:border-none focus:ring-0 transition-opacity tracking-wide text-left text-xl font-google font-semibold outline outline-1 outline-lighterindigo opacity-70 text-opacity-90 mx-4 py-6 px-6 resize-none h-[4.3rem] overflow-hidden w-[37rem] rounded-[2.2rem] bg-baseindigo focus:bg-lightindigo text-blue-300 caret-slate-200 whitespace-pre"} placeholder={"Where to? Enter the website link and let's begin..."}/>
                </form>

                <form className={'p-8 pb-2.5 flex items-center align-middle justify-center border-none outline-none bg-transparent ' + (inputURL==""?"opacity-25 select-none pointer-events-none":"opacity-100")}>
                  <div id="chat" contentEditable={inputURL==""?"false":"true"} onKeyDownCapture={onTextSubmit} rows="1" class={(inputURL==""?"":"focus:opacity-95 hover:opacity-95") + " transition-opacity text-left text-base font-google outline outline-1 outline-lighterindigo opacity-90 text-opacity-95 mx-4 py-5 px-5 resize-none h-auto min-h-[3.6rem] max-h-[10rem] overflow-hidden w-[37rem] rounded-[2.2rem] bg-baseindigo focus:bg-lightindigo text-slate-200"} data-text={inputPlaceholder}>
                    {inputURL==""?inputPlaceholder:""}
                  </div>
                </form>

                <p className='font-google font-light text-xs opacity-40 pb-4 xl:scale-110 lg:scale-90 md:scale-75 scale-50'>AI may display inaccurate information. Always recheck it's responses.</p>
              </div>
            </Pane>

            <Pane minSize="40%" maxSize="55%">
              <div className="h-dvh bg-gradient-radial to-darkerindigo from-0% from-darkindigo to-80% flex-col flex justify-center items-center mx-4">
                <div id='webframe' className={"w-[95%] h-[70%] rounded-2xl relative " + (inputURL==""?"hidden":"visible")}>
                  <div className='flex flex-row pt-3 justify-center h-[3.6rem] z-30 absolute left-[-1px] right-[-1px] rounded-t-2xl bg-opacity-50 border-b-4 border-opacity-30 border-lighterindigo bg-medindigo backdrop-blur-sm backdrop-filter'>
                    <p onClick={onWebLinkClick} className='font-semibold font-google text-baseindigo opacity-60 hover:opacity-95 transition-all duration-200 tracking-tighter text-xl select-none peer-hover:underline hover:underline hover:cursor-pointer'>
                      {inputURL}
                      <i className='material-icons md-link md-dark px-1 align-middle'/>
                    </p>
                  </div>
                  <Iframe id="iframe" className='opacity-90 rounded-2xl' url={inputURL} height='100%' width='100%'/>
                </div>
              </div>
            </Pane>
          </SplitPane>
        </div>
      </header>
    </div>
  );
}

export default App;
