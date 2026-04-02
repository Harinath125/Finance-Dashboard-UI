const AppContext = React.createContext();

const AppProvider = ({ children }) => {
    // State
    const [transactions, setTransactions] = React.useState(() => {
        const saved = localStorage.getItem('finance_transactions');
        return saved ? JSON.parse(saved) : MOCK_TRANSACTIONS;
    });
    
    const [role, setRole] = React.useState('admin'); // 'admin' or 'viewer'
    const [theme, setTheme] = React.useState('light');

    // Persistence
    React.useEffect(() => {
        localStorage.setItem('finance_transactions', JSON.stringify(transactions));
    }, [transactions]);

    React.useEffect(() => {
        if (theme === 'dark') {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }, [theme]);

    // Actions
    const addTransaction = (transaction) => {
        setTransactions(prev => [{ ...transaction, id: Date.now().toString() }, ...prev]);
    };

    const updateTransaction = (id, updated) => {
        setTransactions(prev => prev.map(t => t.id === id ? { ...updated, id } : t));
    };

    const deleteTransaction = (id) => {
        setTransactions(prev => prev.filter(t => t.id !== id));
    };

    const toggleTheme = () => {
        setTheme(prev => prev === 'light' ? 'dark' : 'light');
    };

    return (
        <AppContext.Provider value={{
            transactions,
            addTransaction,
            updateTransaction,
            deleteTransaction,
            role,
            setRole,
            theme,
            toggleTheme
        }}>
            {children}
        </AppContext.Provider>
    );
};

const useAppContext = () => React.useContext(AppContext);