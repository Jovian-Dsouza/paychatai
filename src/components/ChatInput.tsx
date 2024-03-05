"use client"
import { PaperAirplaneIcon } from "@heroicons/react/24/solid"
import { FormEvent, useState } from "react"

export function ChatInput({onSubmit}) {
    const [prompt, setPrompt] = useState("")

    const sendMessage = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const input = prompt.trim()
        onSubmit(input)
        setPrompt("")
    }

    return (
        <div className="bg-gray-700/50 text-gray-400 rounded-lg text-sm">
            <form className="p-5 space-x-5 flex" onSubmit={(e) => sendMessage(e)}>
                <input 
                    value={prompt}
                    onChange={e => setPrompt(e.target.value)}
                    type="text" 
                    placeholder="Type your message here"
                    className="bg-transparent focus:outline-none flex-1 disabled:cursor-not-allowed disabled::text-gray-300"
                />
                <button 
                    type="submit"
                    disabled={!prompt}
                    className="bg-[#11A37F] hover:opacity-50 text-white font-bold px-4 py-2
                    rounded disabled:bg-gray-300 disabled:cursor-not-allowed"
                >
                    <PaperAirplaneIcon className="h-4 w-4 -rotate-45"/>
                </button>
            </form>
        </div>
    )
}