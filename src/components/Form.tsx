import { useState } from "react"
import { GroceryItem } from "./App"

export default function Form({
    onAddItem,
}: {
    onAddItem: (item: GroceryItem) => void
}) {
    const [name, setName] = useState("")
    const [quantity, setQuantity] = useState(1)

    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()

        if (!name) return

        const newItem = { name, qty: quantity, checked: false, id: Date.now() }
        onAddItem(newItem)

        setName("")
        setQuantity(1)
    }

    const quantityNum = [...Array(20)].map((_, i) => (
        <option value={i + 1} key={i + 1}>
            {i + 1}
        </option>
    ))

    return (
        <form onSubmit={handleSubmit} className="add-form">
            <h3>Hari ini belanja apa kita?</h3>
            <select
                value={quantity}
                onChange={(e) => setQuantity(Number(e.currentTarget.value))}
            >
                {quantityNum}
            </select>
            <input
                type="text"
                placeholder="nama barang..."
                onChange={(e) => setName(e.target.value)}
                value={name}
            />
            <button type="submit">Tambah</button>
        </form>
    )
}
