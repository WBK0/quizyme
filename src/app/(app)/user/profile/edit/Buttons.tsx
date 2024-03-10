"use client";

const Buttons = () => {
  return (
    <div className="w-full mt-4">
      <button
        className="w-full rounded-xl px-4 py-2 outline-none font-bold text-lg bg-black text-white hover:scale-105 duration-300"
        type="button"
      >
        Save changes
      </button>
      <button
        className="w-full rounded-xl px-4 py-2 outline-none font-bold text-lg bg-black text-white mt-2 hover:scale-105 duration-300"
      >
        Change password
      </button>
    </div>
  )
}
export default Buttons