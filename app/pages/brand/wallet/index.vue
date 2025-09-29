<template>
  <div class="space-y-6">
    <!-- Page Header -->
    <div class="bg-white rounded-lg shadow-sm p-6">
      <div class="flex justify-between items-center">
        <div>
          <h1 class="text-2xl font-bold text-gray-900">Wallet</h1>
          <p class="text-gray-600">Manage your funds and transactions</p>
        </div>
        <button 
          @click="showAddFundsModal = true"
          class="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
        >
          <span>+</span>
          <span>Add Funds</span>
        </button>
      </div>
    </div>

    <!-- Wallet Overview -->
    <div class="grid grid-cols-1 md:grid-cols-4 gap-6">
      <!-- Current Balance -->
      <div class="bg-white rounded-lg shadow-sm p-6">
        <div class="flex items-center">
          <div class="p-3 bg-green-100 rounded-lg">
            <span class="text-2xl text-green-600">💰</span>
          </div>
          <div class="ml-4">
            <p class="text-sm font-medium text-gray-600">Current Balance</p>
            <p class="text-2xl font-bold text-gray-900">${{ wallet.balance.toLocaleString() }}</p>
          </div>
        </div>
      </div>

      <!-- Total Deposits -->
      <div class="bg-white rounded-lg shadow-sm p-6">
        <div class="flex items-center">
          <div class="p-3 bg-blue-100 rounded-lg">
            <span class="text-2xl text-blue-600">⬇️</span>
          </div>
          <div class="ml-4">
            <p class="text-sm font-medium text-gray-600">Total Deposits</p>
            <p class="text-2xl font-bold text-gray-900">${{ stats.totalDeposits.toLocaleString() }}</p>
          </div>
        </div>
      </div>

      <!-- Total Spent -->
      <div class="bg-white rounded-lg shadow-sm p-6">
        <div class="flex items-center">
          <div class="p-3 bg-purple-100 rounded-lg">
            <span class="text-2xl text-purple-600">💸</span>
          </div>
          <div class="ml-4">
            <p class="text-sm font-medium text-gray-600">Total Spent</p>
            <p class="text-2xl font-bold text-gray-900">${{ stats.totalSpent.toLocaleString() }}</p>
          </div>
        </div>
      </div>

      <!-- Pending Transactions -->
      <div class="bg-white rounded-lg shadow-sm p-6">
        <div class="flex items-center">
          <div class="p-3 bg-orange-100 rounded-lg">
            <span class="text-2xl text-orange-600">⏳</span>
          </div>
          <div class="ml-4">
            <p class="text-sm font-medium text-gray-600">Pending</p>
            <p class="text-2xl font-bold text-gray-900">{{ stats.pendingTransactions }}</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Quick Actions -->
    <div class="bg-white rounded-lg shadow-sm p-6">
      <h2 class="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <button 
          @click="showAddFundsModal = true"
          class="p-4 border-2 border-dashed border-gray-300 rounded-lg text-center hover:border-blue-500 hover:bg-blue-50 transition-colors"
        >
          <span class="text-2xl mb-2 block">💳</span>
          <span class="font-medium text-gray-700">Add Funds</span>
        </button>
        
        <button 
          @click="showWithdrawModal = true"
          class="p-4 border-2 border-dashed border-gray-300 rounded-lg text-center hover:border-green-500 hover:bg-green-50 transition-colors"
        >
          <span class="text-2xl mb-2 block">🏦</span>
          <span class="font-medium text-gray-700">Withdraw</span>
        </button>
        
        <button 
          @click="exportTransactions"
          class="p-4 border-2 border-dashed border-gray-300 rounded-lg text-center hover:border-purple-500 hover:bg-purple-50 transition-colors"
        >
          <span class="text-2xl mb-2 block">📊</span>
          <span class="font-medium text-gray-700">Export</span>
        </button>
      </div>
    </div>

    <!-- Transactions Table -->
    <div class="bg-white rounded-lg shadow-sm">
      <div class="p-6 border-b border-gray-200">
        <h2 class="text-lg font-semibold text-gray-900">Transaction History</h2>
      </div>

      <div class="overflow-x-auto">
        <table class="w-full">
          <thead class="bg-gray-50">
            <tr>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Reference</th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr v-for="transaction in wallet.transactions" :key="transaction.id">
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {{ formatDate(transaction.date) }}
              </td>
              <td class="px-6 py-4 text-sm text-gray-900">
                {{ transaction.description }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium" :class="getTypeClasses(transaction.type)">
                  {{ getTypeLabel(transaction.type) }}
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm" :class="transaction.amount >= 0 ? 'text-green-600 font-semibold' : 'text-red-600 font-semibold'">
                {{ transaction.amount >= 0 ? '+' : '' }}${{ Math.abs(transaction.amount).toLocaleString() }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium" :class="getStatusClasses(transaction.status)">
                  {{ transaction.status }}
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {{ transaction.reference }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>

  <!-- Add Funds Modal -->
  <div v-if="showAddFundsModal" class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
    <div class="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
      <div class="mt-3">
        <h3 class="text-lg font-medium text-gray-900 mb-4">Add Funds to Wallet</h3>
        
        <div class="mb-4">
          <label class="block text-sm font-medium text-gray-700 mb-2">Amount ($)</label>
          <input 
            v-model="addFundsAmount" 
            type="number" 
            min="10"
            class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter amount"
          >
        </div>

        <div class="mb-4">
          <label class="block text-sm font-medium text-gray-700 mb-2">Payment Method</label>
          <select 
            v-model="selectedPaymentMethod" 
            class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="credit_card">Credit Card</option>
            <option value="debit_card">Debit Card</option>
            <option value="bank_transfer">Bank Transfer</option>
            <option value="paypal">PayPal</option>
          </select>
        </div>

        <div class="flex justify-end space-x-3 mt-6">
          <button 
            @click="showAddFundsModal = false"
            class="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
          >
            Cancel
          </button>
          <button 
            @click="processAddFunds"
            :disabled="!addFundsAmount || addFundsAmount < 10"
            class="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
          >
            Add Funds
          </button>
        </div>
      </div>
    </div>
  </div>

  <!-- Withdraw Modal -->
  <div v-if="showWithdrawModal" class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
    <div class="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
      <div class="mt-3">
        <h3 class="text-lg font-medium text-gray-900 mb-4">Withdraw Funds</h3>
        
        <div class="mb-4">
          <label class="block text-sm font-medium text-gray-700 mb-2">Amount ($)</label>
          <input 
            v-model="withdrawAmount" 
            type="number" 
            :max="wallet.balance"
            class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter amount"
          >
          <p class="text-xs text-gray-500 mt-1">Available: ${{ wallet.balance.toLocaleString() }}</p>
        </div>

        <div class="mb-4">
          <label class="block text-sm font-medium text-gray-700 mb-2">Bank Account</label>
          <select 
            v-model="selectedBankAccount" 
            class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="account1">**** 1234 - Chase Bank</option>
            <option value="account2">**** 5678 - Bank of America</option>
          </select>
        </div>

        <div class="flex justify-end space-x-3 mt-6">
          <button 
            @click="showWithdrawModal = false"
            class="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
          >
            Cancel
          </button>
          <button 
            @click="processWithdraw"
            :disabled="!withdrawAmount || withdrawAmount > wallet.balance"
            class="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50"
          >
            Withdraw
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  layout: 'brand',
  middleware: 'auth-new', 
  requiredUserType: 'brand'
})

const { user } = useAuth()
// Composables
const { wallet, transactionTypes, addFunds, withdrawFunds, getWalletStats } = useWallet()

// State
const showAddFundsModal = ref(false)
const showWithdrawModal = ref(false)
const addFundsAmount = ref('')
const withdrawAmount = ref('')
const selectedPaymentMethod = ref('credit_card')
const selectedBankAccount = ref('account1')

// Computed
const stats = computed(() => getWalletStats())

// Methods
const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}

const getTypeLabel = (type) => {
  return transactionTypes[type]?.label || type
}

const getTypeClasses = (type) => {
  const typeConfig = transactionTypes[type]
  if (!typeConfig) return 'bg-gray-100 text-gray-800'
  
  const colorMap = {
    green: 'bg-green-100 text-green-800',
    red: 'bg-red-100 text-red-800',
    blue: 'bg-blue-100 text-blue-800',
    orange: 'bg-orange-100 text-orange-800'
  }
  
  return colorMap[typeConfig.color] || 'bg-gray-100 text-gray-800'
}

const getStatusClasses = (status) => {
  const statusMap = {
    completed: 'bg-green-100 text-green-800',
    pending: 'bg-yellow-100 text-yellow-800',
    failed: 'bg-red-100 text-red-800'
  }
  
  return statusMap[status] || 'bg-gray-100 text-gray-800'
}

const processAddFunds = async () => {
  if (!addFundsAmount.value || addFundsAmount.value < 10) return
  
  try {
    const result = await addFunds(addFundsAmount.value, selectedPaymentMethod.value)
    alert(`Successfully added $${addFundsAmount.value} to your wallet!`)
    showAddFundsModal.value = false
    addFundsAmount.value = ''
  } catch (error) {
    alert('Failed to add funds. Please try again.')
  }
}

const processWithdraw = async () => {
  if (!withdrawAmount.value || withdrawAmount.value > wallet.value.balance) return
  
  try {
    const result = await withdrawFunds(withdrawAmount.value, selectedBankAccount.value)
    alert(`Withdrawal request submitted for $${withdrawAmount.value}!`)
    showWithdrawModal.value = false
    withdrawAmount.value = ''
  } catch (error) {
    alert(error.message || 'Failed to process withdrawal. Please try again.')
  }
}

const exportTransactions = () => {
  alert('Exporting transaction history...')
  // In a real app, this would generate a CSV or PDF
}
</script>