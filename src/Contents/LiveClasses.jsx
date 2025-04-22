
const LiveClasses = () =>{
    return (
        <div className="p-8">
      <div className="text-2xl font-bold mb-2">Live Classes</div>
      <div className="text-gray-500 mb-4">View and manage your live clases</div>

      

      <div className="flex justify-between items-center mb-4">
        <div></div>
        <div className="flex space-x-4">
          <button
            className="border border-gray-300 text-gray-500 px-4 py-2 rounded"
          >
            Select Columns
          </button>
        </div>
      </div>


      <div className="bg-gray-100 h-64 flex items-center justify-center">
        <p className="text-gray-400">No results found</p>
      </div>
    </div>
    )
}
export default LiveClasses;