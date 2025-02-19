export default function SearchTodoForm() {

    return(
        <form className="grid grid-cols-6 gap-4 my-4" >

            <div className="col-start-1 col-end-7 flex">
            <label htmlFor="todoName" className="m-4 max-w-8">Name</label>
            <input type="text" id="todoName"
                placeholder="Text"
                className="grow mx-4 rounded-md border border-gray-600 p-2"
            />
            </div>
            <div className="col-start-1 col-end-4 flex">
            <label htmlFor="priority" className="m-4 max-w-8">Priority</label>
            <select id="priority"
                autoComplete="All, High, Medium, Low"
                className=" mx-4 rounded-md grow border border-gray-600"   
            >
                <option>All</option>
                <option>High</option>
                <option>Medium</option>
                <option>Low</option>
            </select>
            </div>
            <div className="col-start-1 col-end-4 flex">
            <label htmlFor="state" className="m-4 max-w-8">State</label>
            <select id="state"
                autoComplete="All, Done, Undone"
                className="mx-4 rounded-md grow border border-gray-600"
            >
                <option>All</option>
                <option>Done</option>
                <option>Undone</option>
            </select>
            </div>
            <div className="col-span-2 col-end-7 flex flex-row-reverse">
            <button
            type="submit"
            className="mx-4 px-6 align-middle rounded-md bg-slate-950 text-white hover:bg-slate-800 ">
                Search
            </button>
            </div>
        </form>
    )
}