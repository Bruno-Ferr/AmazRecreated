import { useState } from "react"

export default function ColorSelector({options}: any) {
  const [selected, setSelected] = useState("black")
  
  return (
    <div className="my-4">
      <p className="font-medium">Color selected: <span className="font-light">{selected}</span></p>
        
      <div className="flex gap-1 items-center">
        {options.map((opt: any) => {
          return opt.color == selected ? (
            <div className="w-7 h-7 border-2 border-black rounded-full flex items-center justify-center" key={opt.color}>
              <button className={`w-6 h-6 rounded-full bg-${opt.color} border border-gray-300`} onClick={() => setSelected(opt.color)} />
            </div>
          ) : (
            <button key={opt.color} className={`w-6 h-6 rounded-full bg-${opt.color} border border-gray-300`} onClick={() => setSelected(opt.color)} />
          )
        })}
      </div>
    </div>
  )
}