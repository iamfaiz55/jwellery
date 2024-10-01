import React from 'react'

const Test = () => {
    const [isSmallSidebarOpen, setIsSmallSidebarOpen] = useState(false);

    return <>
        {/* Small Sidebar */}
        <div className={`fixed inset-y-0 left-0 z-40 w-64 overflow-y-auto bg-golden rounded-lg m-2 transition-transform transform ${isSmallSidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:hidden`}>
            <div className="flex flex-col items-center mt-8">
                <h2 className="text-2xl font-bold text-white">Hi, {user.mobile}</h2>
            </div>
            <nav className="mt-10">
                <button
                    onClick={() => {
                        setCurrentSection('profile');
                        setIsSmallSidebarOpen(false);
                    }}
                    className={`flex items-center px-6 py-2 mt-4 text-gray-100 transition-colors duration-200 ${currentSection === 'profile' ? 'bg-gray-700' : 'bg-transparent'}`}
                >
                    <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" />
                    </svg>
                    <span className="mx-3">Profile</span>
                </button>

                <button
                    onClick={() => {
                        setCurrentSection('addresses');
                        setIsSmallSidebarOpen(false);
                    }}
                    className={`flex items-center px-6 py-2 mt-4 text-gray-100 transition-colors duration-200 ${currentSection === 'addresses' ? 'bg-gray-700' : 'bg-transparent'}`}
                >
                    <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                    <span className="mx-3">Addresses</span>
                </button>
            </nav>
        </div>

        {/* Toggle Button for Small Sidebar */}
        <button
            className="md:hidden p-4 fixed top-4 left-4 z-50 bg-golden text-white rounded-full"
            onClick={() => setIsSmallSidebarOpen(!isSmallSidebarOpen)}
        >
            {isSmallSidebarOpen ? 'Close' : 'Menu'}
        </button>

    </>
}

export default Test