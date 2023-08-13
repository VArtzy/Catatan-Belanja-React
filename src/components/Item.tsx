import { GroceryItem } from "./App"

export default function Item({
    item,
    onDeleteItem,
    onCheckItem,
}: {
    item: GroceryItem
    onDeleteItem: (id: number) => void
    onCheckItem: (id: number) => void
}) {
    return (
        <li>
            <input
                type="checkbox"
                checked={item.checked}
                onChange={() => onCheckItem(item.id)}
            />
            <span
                style={
                    item.checked
                        ? { textDecoration: "line-through" }
                        : undefined
                }
            >
                {item.qty} {item.name}
            </span>
            <button onClick={() => onDeleteItem(item.id)}>&times;</button>
        </li>
    )
}
