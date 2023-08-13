import { useState } from "react"
import { GroceryItems } from "./App"
import Item from "./Item"

export default function GroceryList({
    items,
    onDeleteItem,
    onCheckItem,
    onClearItems,
}: {
    items: GroceryItems
    onDeleteItem: (id: number) => void
    onCheckItem: (id: number) => void
    onClearItems: () => void
}) {
    const [sortBy, setSortBy] = useState("input")

    let sortedItems = [...items]

    switch (sortBy) {
        case "name":
            sortedItems = items
                .slice()
                .sort((a, b) => a.name.localeCompare(b.name))
            break
        case "checked":
            sortedItems = items.slice().sort((a, b) => {
                if (a.checked && !b.checked) return 1
                if (!a.checked && b.checked) return -1
                return 0
            })
            break
    }

    return (
        <>
            <div className="list">
                <ul>
                    {sortedItems.map((item) => (
                        <Item
                            item={item}
                            key={item.id}
                            onCheckItem={onCheckItem}
                            onDeleteItem={onDeleteItem}
                        />
                    ))}
                </ul>
            </div>
            <div className="actions">
                <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                >
                    <option value="input">
                        Urutkan berdasarkan urutan input
                    </option>
                    <option value="name">
                        Urutkan berdasarkan nama barang
                    </option>
                    <option value="checked">Urutkan berdasarkan ceklis</option>
                </select>
                <button onClick={onClearItems}>Bersihkan Daftar</button>
            </div>
        </>
    )
}
