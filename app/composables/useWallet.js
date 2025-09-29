// Composable for wallet operations
export const useWallet = () => {
  // Mock wallet data
  const wallet = ref({
    balance: 5250.00,
    currency: 'USD',
    transactions: [
      {
        id: 1,
        type: 'deposit',
        amount: 2000.00,
        description: 'Bank Transfer',
        status: 'completed',
        date: '2024-01-15T10:30:00Z',
        reference: 'DEP_001'
      },
      {
        id: 2,
        type: 'campaign_payment',
        amount: -450.00,
        description: 'Payment to @sarahj - Summer Campaign',
        status: 'completed',
        date: '2024-01-14T14:20:00Z',
        reference: 'PAY_001'
      },
      {
        id: 3,
        type: 'deposit',
        amount: 5000.00,
        description: 'Credit Card',
        status: 'completed',
        date: '2024-01-10T09:15:00Z',
        reference: 'DEP_002'
      },
      {
        id: 4,
        type: 'campaign_payment',
        amount: -800.00,
        description: 'Payment to @mikechen - Tech Review',
        status: 'pending',
        date: '2024-01-09T16:45:00Z',
        reference: 'PAY_002'
      },
      {
        id: 5,
        type: 'refund',
        amount: 300.00,
        description: 'Campaign cancellation refund',
        status: 'completed',
        date: '2024-01-08T11:20:00Z',
        reference: 'REF_001'
      }
    ]
  })

  // Transaction types
  const transactionTypes = {
    deposit: { label: 'Deposit', color: 'green', icon: '⬇️' },
    withdrawal: { label: 'Withdrawal', color: 'red', icon: '⬆️' },
    campaign_payment: { label: 'Campaign Payment', color: 'red', icon: '💸' },
    refund: { label: 'Refund', color: 'green', icon: '↩️' },
    transfer: { label: 'Transfer', color: 'blue', icon: '🔄' }
  }

  // Add funds to wallet
  const addFunds = async (amount, paymentMethod, description = '') => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    const newTransaction = {
      id: wallet.value.transactions.length + 1,
      type: 'deposit',
      amount: parseFloat(amount),
      description: description || `${paymentMethod} Deposit`,
      status: 'completed',
      date: new Date().toISOString(),
      reference: `DEP_${String(wallet.value.transactions.length + 1).padStart(3, '0')}`
    }

    wallet.value.balance += parseFloat(amount)
    wallet.value.transactions.unshift(newTransaction)

    return {
      success: true,
      transaction: newTransaction,
      newBalance: wallet.value.balance
    }
  }

  // Withdraw funds
  const withdrawFunds = async (amount, bankDetails, description = '') => {
    if (amount > wallet.value.balance) {
      throw new Error('Insufficient funds')
    }

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500))

    const newTransaction = {
      id: wallet.value.transactions.length + 1,
      type: 'withdrawal',
      amount: -parseFloat(amount),
      description: description || 'Withdrawal to Bank',
      status: 'pending',
      date: new Date().toISOString(),
      reference: `WD_${String(wallet.value.transactions.length + 1).padStart(3, '0')}`
    }

    wallet.value.balance -= parseFloat(amount)
    wallet.value.transactions.unshift(newTransaction)

    return {
      success: true,
      transaction: newTransaction,
      newBalance: wallet.value.balance
    }
  }

  // Get transaction by ID
  const getTransaction = (id) => {
    return wallet.value.transactions.find(transaction => transaction.id === id)
  }

  // Get transactions by type
  const getTransactionsByType = (type) => {
    return wallet.value.transactions.filter(transaction => transaction.type === type)
  }

  // Get transactions by date range
  const getTransactionsByDateRange = (startDate, endDate) => {
    return wallet.value.transactions.filter(transaction => {
      const transactionDate = new Date(transaction.date)
      return transactionDate >= new Date(startDate) && transactionDate <= new Date(endDate)
    })
  }

  // Get wallet statistics
  const getWalletStats = () => {
    const totalDeposits = wallet.value.transactions
      .filter(t => t.type === 'deposit' && t.status === 'completed')
      .reduce((sum, t) => sum + t.amount, 0)

    const totalSpent = Math.abs(wallet.value.transactions
      .filter(t => (t.type === 'campaign_payment' || t.type === 'withdrawal') && t.status === 'completed')
      .reduce((sum, t) => sum + t.amount, 0))

    const pendingTransactions = wallet.value.transactions.filter(t => t.status === 'pending')

    return {
      totalDeposits,
      totalSpent,
      pendingTransactions: pendingTransactions.length,
      currentBalance: wallet.value.balance
    }
  }

  return {
    wallet,
    transactionTypes,
    addFunds,
    withdrawFunds,
    getTransaction,
    getTransactionsByType,
    getTransactionsByDateRange,
    getWalletStats
  }
}