import { useState } from "react"

export default function TypeSelector({options}: any) {
  const [selected, setSelected] = useState(options[0].size)

  return (
    <div className="my-4">
      <p className="font-medium">Size: <span className="font-light">{selected}</span></p>
      
      <div className="flex gap-1">
        {options.map((opt: any) => {
          return opt.amount <= 0 ? (
            <button disabled className="w-20 h-12 md:w-14 md:h-10 rounded-md border border-gray-3 bg-gray-400" key={opt.size}>{opt.size}</button>
          ) : opt.size == selected ? (
            <button className="w-20 h-12 md:w-14 md:h-10 rounded-md border border-gray-3 bg-gray-200" onClick={() => setSelected(opt.size)} key={opt.size}>{opt.size}</button>
          ) : (
            <button className="w-20 h-12 md:w-14 md:h-10 rounded-md border border-gray-300" onClick={() => setSelected(opt.size)} key={opt.size}>{opt.size}</button>
          )
        })}
      </div>
    </div>
  )
}