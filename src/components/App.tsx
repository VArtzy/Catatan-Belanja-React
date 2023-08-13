import { useState, useEffect } from "react"
import Header from "./Header"
import Form from "./Form"
import GroceryList from "./GroceryList"
import Footer from "./Footer"

export type GroceryItem = {
    id: number
    name: string
    qty: number
    checked: boolean
}
export type GroceryItems = GroceryItem[]

const localStorageKey = "groceryItems"

function App() {
    const [items, setItems] = useState<GroceryItems>([])

    useEffect(() => {
        const storedItems = localStorage.getItem(localStorageKey)
        if (storedItems) {
            setItems(JSON.parse(storedItems))
        } else {
            setItems([])
        }
    }, [])

    useEffect(() => {
        localStorage.setItem(localStorageKey, JSON.stringify(items))
    }, [items])

    function handleAddItem(item: GroceryItem) {
        const newItem = { ...item, id: Date.now() }
        setItems([...items, newItem])
    }

    function handleDeleteItem(id: number) {
        setItems(items.filter((item) => item.id !== id))
    }

    function handleCheckItem(id: number) {
        setItems(
            items.map((item) =>
                item.id === id ? { ...item, checked: !item.checked } : item
            )
        )
    }

    function handleClearItems() {
        setItems([])
    }

    return (
        <>
            <div className="app">
                <Header />
                <Form onAddItem={handleAddItem} />
                <GroceryList
                    items={items}
                    onCheckItem={handleCheckItem}
                    onDeleteItem={handleDeleteItem}
                    onClearItems={handleClearItems}
                />
                <Footer items={items} />
            </div>
        </>
    )
}

export default App
