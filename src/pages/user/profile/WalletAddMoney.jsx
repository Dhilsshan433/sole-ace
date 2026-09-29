import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Button from '../../../components/Button'
import Input from '../../../components/Input'

export default function WalletAddMoney() {
  const [amount, setAmount] = useState('1000')
  const navigate = useNavigate()
  return (
    <>
      <h1 className="text-3xl font-bold">Add money</h1>
      <div className="max-w-md space-y-4 rounded-2xl border border-stone-line bg-white p-6">
        <p className="text-sm text-muted">Current balance: ₹1,250</p>
        <Input label="Amount" value={amount} onChange={(e) => setAmount(e.target.value)} />
        <div className="flex gap-2">
          {['500', '1000', '2000', '5000'].map((v) => (
            <button key={v} onClick={() => setAmount(v)} className={`rounded-xl px-3 py-2 text-sm font-medium ${amount === v ? 'bg-ink text-white' : 'border border-stone-line'}`}>₹{v}</button>
          ))}
        </div>
        <Button full onClick={() => navigate('/profile/wallet')}>Add ₹{amount}</Button>
      </div>
    </>
  )
}