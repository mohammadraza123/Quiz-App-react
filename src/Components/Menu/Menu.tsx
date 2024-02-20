import { Link } from 'react-router-dom';

export default function Menu() {
  return (

    <div className="h-screen flex flex-col justify-center items-center bg-gray-300">
      <div className="text-center mb-12">
        <h1 className="text-5xl font-bold text-gray-800 mb-4">Welcome to the Frontend Quiz!</h1>
        <p className="text-lg text-gray-600 ">Select a topic to begin the quiz</p>
      </div>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3 w-2/5 text-center">
        <Link to={"/html"} className="bg-blue-500 text-white py-4 px-6 rounded-lg shadow-md hover:bg-blue-700 transition duration-300 transform hover:scale-105 focus:outline-none"   >HTML</Link>
        <Link to={"/css"} className="bg-green-500 text-white py-4 px-6 rounded-lg shadow-md hover:bg-green-700 transition duration-300 transform hover:scale-105 focus:outline-none">CSS</Link>
        <Link to={"/javascript"} className="bg-yellow-500 text-white py-4 px-6 rounded-lg shadow-md hover:bg-yellow-700 transition duration-300 transform hover:scale-105 focus:outline-none">JavaScript</Link>
      </div>
    </div>
      );
}


