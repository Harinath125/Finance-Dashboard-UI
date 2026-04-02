const Layout = ({ children }) => {
    const { role, setRole, theme, toggleTheme } = useAppContext();
    const [sidebarOpen, setSidebarOpen] = React.useState(false);

    return (
        <div className="flex h-screen overflow-hidden" data-name="layout">
            {/* Sidebar */}
            <aside className={`absolute inset-y-0 left-0 z-50 w-64 bg-slate-900 text-white transform transition-transform duration-300 lg:relative lg:translate-x-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
                <div className="flex items-center justify-between p-4 border-b border-slate-800">
                    <div className="flex items-center space-x-2">
                        <div className="icon-wallet text-2xl text-primary"></div>
                        <span className="text-xl font-bold">FinDash</span>
                    </div>
                    <button className="lg:hidden text-slate-400 hover:text-white" onClick={() => setSidebarOpen(false)}>
                        <div className="icon-x text-xl"></div>
                    </button>
                </div>
                <nav className="p-4 space-y-2">
                    <a href="#" className="flex items-center space-x-3 px-4 py-3 bg-primary bg-opacity-10 text-primary rounded-lg">
                        <div className="icon-layout-dashboard text-lg"></div>
                        <span className="font-medium">Dashboard</span>
                    </a>
                </nav>
            </aside>

            {/* Main Content */}
            <div className="flex-1 flex flex-col overflow-hidden">
                {/* Header */}
                <header className="flex items-center justify-between p-4 bg-surface dark:bg-dark-surface border-b border-slate-200 dark:border-slate-800 transition-colors">
                    <button className="lg:hidden text-slate-600 dark:text-slate-300" onClick={() => setSidebarOpen(true)}>
                        <div className="icon-menu text-2xl"></div>
                    </button>
                    
                    <div className="flex-1"></div>

                    <div className="flex items-center space-x-4">
                        {/* Role Toggle */}
                        <div className="flex items-center space-x-2">
                            <span className="text-sm font-medium text-slate-600 dark:text-slate-300">Role:</span>
                            <select 
                                value={role} 
                                onChange={(e) => setRole(e.target.value)}
                                className="bg-slate-100 dark:bg-slate-800 border-none rounded-md text-sm py-1 pl-2 pr-8 focus:ring-primary"
                            >
                                <option value="admin">Admin</option>
                                <option value="viewer">Viewer</option>
                            </select>
                        </div>

                        {/* Theme Toggle */}
                        <button onClick={toggleTheme} className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 transition-colors">
                            <div className={`text-xl ${theme === 'dark' ? 'icon-sun' : 'icon-moon'}`}></div>
                        </button>
                    </div>
                </header>

                {/* Page Content */}
                <main className="flex-1 overflow-x-hidden overflow-y-auto bg-background dark:bg-dark-bg p-4 lg:p-8 transition-colors">
                    {children}
                </main>
            </div>
        </div>
    );
};