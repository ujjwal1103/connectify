import { OutlineLoading } from "../../../icons";

export const SubmitButton=({ isValid, loading, title = "Login" })=> {
    return (
      <div className="flex justify-between w-full items-center">
        <button
          type="submit"
          disabled={!isValid}
          className="w-full disabled:bg-slate-500 h-12 disabled:text-gray-400 disabled:cursor-not-allowed bg-zinc-950 rounded-xl p-3 text-white  hover:bg-black"
        >
          {loading ? (
            <span className="flex justify-center">
              <OutlineLoading className="animate-spin" />
            </span>
          ) : (
            title
          )}
        </button>
      </div>
    );
  }
  