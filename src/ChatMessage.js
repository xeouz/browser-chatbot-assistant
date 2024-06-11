import React, { useState } from 'react';
import { TypeAnimation } from 'react-type-animation';

export default function ChatMessage(message, author) {

    if (author === "user") {
        return (
            <div className={"flex justify-end transition-all opacity-50 hover:opacity-85 animate-in fade-in slide-in-from-right-24 duration-300 last:opacity-75"}>
                <div class="flex items-start gap-2.5 p-5 pr-2 mt-5 opacity-90 font-google zoom-in-75 animate-in duration-400">
                    <div class="flex flex-col w-full max-w-[340px] text-wrap h-auto pr-5 py-3 rounded-tl-[2rem] rounded-b-[2rem] bg-gradient-to-bl from-lightindigo to-lighterindigo from-70% outline outline-1 outline-lighterindigo">
                        <p class="text-base text-right font-normal py-2.5 pl-5 text-slate-50 h-auto text-wrap overflow-hidden break-words">{message}</p>
                    </div>
                </div>
                <div className='opacity-[85%] -mt-5 p-[1rem] pl-0'>
                    <i className='material-icons md-account_circle duration-200 md-48 outline-4 outline outline-offset-0 outline-lighterindigo rounded-full' />
                    <p className='text-sm font-google font-medium text-opacity-65'>User</p>
                </div>
            </div>
        )
    }
    else {
        return (
            <div className={"flex justify-start transition-all opacity-50 hover:opacity-85 animate-in fade-in slide-in-from-left-24 duration-300 last:opacity-75"}>
                <div className='opacity-[75%] -mt-5 p-[1rem] pr-0 zoom-in-75 animate-in duration-400'>
                    <i className='material-icons md-sentiment_very_satisfied duration-200 md-48 outline-4 outline outline-offset-0 outline-lighterindigo rounded-full' />
                    <p className='text-sm font-google font-medium'>Bot</p>
                    </div>
                <div class="flex items-start gap-2.5 p-5 pl-2 mt-5 opacity-90 font-google">
                    <div class="flex flex-col w-full max-w-[340px] pl-5 py-3 rounded-tr-[2rem] text-wrap h-auto rounded-b-[2rem] bg-gradient-to-br from-lightindigo to-lighterindigo from-70% outline outline-1 outline-lighterindigo">
                        <p class="text-base text-left font-normal py-2.5 pr-5 text-slate-50 h-auto text-wrap overflow-hidden break-words">
                            <TypeAnimation sequence={[message]}  speed={80} cursor={false} />
                        </p>
                    </div>
                </div>
            </div>
        )
    }
}