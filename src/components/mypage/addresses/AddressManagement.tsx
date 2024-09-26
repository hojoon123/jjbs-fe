'use client'

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Plus } from 'lucide-react'
import { useState } from 'react'

interface Address {
  id: number;
  name: string;
  address: string;
}

interface AddressManagementProps {
  initialAddresses: Address[];
}

export function AddressManagement({ initialAddresses }: AddressManagementProps) {
  const [addresses, setAddresses] = useState(initialAddresses)
  const [showForm, setShowForm] = useState(false)
  const [newAddress, setNewAddress] = useState({ name: '', address: '' })

  const handleAddAddress = (e: React.FormEvent) => {
    e.preventDefault()
    setAddresses([...addresses, { id: addresses.length + 1, ...newAddress }])
    setNewAddress({ name: '', address: '' })
    setShowForm(false)
  }

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {addresses.map((address) => (
          <Card key={address.id}>
            <CardHeader>
              <CardTitle>{address.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <p>{address.address}</p>
              <Button variant="outline" size="sm" className="mt-2">수정</Button>
            </CardContent>
          </Card>
        ))}
      </div>
      {showForm ? (
        <form onSubmit={handleAddAddress} className="mt-6">
          <div className="mb-4">
            <Label htmlFor="name">배송지 이름</Label>
            <Input
              id="name"
              value={newAddress.name}
              onChange={(e) => setNewAddress({ ...newAddress, name: e.target.value })}
              className="mt-1"
            />
          </div>
          <div className="mb-4">
            <Label htmlFor="address">주소</Label>
            <Input
              id="address"
              value={newAddress.address}
              onChange={(e) => setNewAddress({ ...newAddress, address: e.target.value })}
              className="mt-1"
            />
          </div>
          <Button type="submit">저장</Button>
          <Button type="button" variant="outline" className="ml-2" onClick={() => setShowForm(false)}>취소</Button>
        </form>
      ) : (
        <Button onClick={() => setShowForm(true)} className="mt-6">
          <Plus className="mr-2 h-4 w-4" /> 새 배송지 추가
        </Button>
      )}
    </div>
  )
}