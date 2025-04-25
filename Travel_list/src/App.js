import React, { useState } from "react";
import "./index.css";

function Logo() {
  return <h1>🌴 Far Away 🎒</h1>;
}

function Form(props) {
  const [quantity, setNum] = useState(1);
  const [description, setQuantity] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    const newItem = { description, quantity, packed: false, id: Date.now() };
    props.onHandleAddItem(newItem);

    setQuantity("");
    setNum(1);
  }

  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <h3>What do you need for your trip 🤟</h3>
      <input
        type="number"
        value={quantity}
        onChange={(e) => setNum(Number(e.target.value))}
      />
      <input
        type="text"
        placeholder="Item..."
        value={description}
        onChange={(e) => setQuantity(e.target.value)}
      />
      <button name="btn">ADD</button>
    </form>
  );
}

function Lists(props) {
  return (
    <li>
      <input
        type="checkbox"
        value={props.packed}
        onChange={() => props.onCheck(props.id)}
      />
      <span style={props.packed ? { textDecoration: "line-through" } : null}>
        {props.quantity}&nbsp;
        {props.description}
      </span>
      <button onClick={() => props.onRemove(props.id)}>❌</button>
    </li>
  );
}

function Packing(props) {
  const [sortBy, setSortBy] = useState("input");
  let sortedItems;
  if (sortBy === "input") sortedItems = props.items;
  if (sortBy === "description")
    sortedItems = props.items
      .slice()
      .sort((a, b) => a.description.localeCompare(b.description));
  if (sortBy === "packed")
    sortedItems = props.items
      .slice()
      .sort((a, b) => Number(a.packed) - Number(b.packed));

  return (
    <div className="list">
      <ul>
        {sortedItems.map((x) => (
          <Lists
            key={x.id}
            packed={x.packed}
            quantity={x.quantity}
            description={x.description}
            id={x.id}
            onRemove={props.onRemove} // Pass the function
            onCheck={props.onCheck}
          />
        ))}
      </ul>
      <div className="action">
        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          <option value="input">Sort by input order</option>
          <option value="description">Sort by description</option>
          <option value="packed">Sort by packed status</option>
        </select>
        <button onClick={props.onClear}>Clear list</button>
      </div>
    </div>
  );
}

function Stats(props) {
  if (!props.itemNumber) {
    return (
      <p className="stats">
        <em>Start adding some items to your packing List 🚀</em>
      </p>
    );
  }
  return (
    <footer className="stats">
      <em>
        {props.percentage !== 100
          ? `🎒 You have ${props.itemNumber} items on your List, and you already
        packed
        ${props.statsPacked}(
        ${props.itemNumber !== 0 ? props.percentage : 0}
        %)`
          : "You got everything! Ready to go 🛫"}
      </em>
    </footer>
  );
}

function App() {
  const [items, setItems] = useState([]);
  function handleAddItem(item) {
    setItems((items) => [...items, item]);
  }

  function handleRemove(id) {
    setItems((prevValue) => prevValue.filter((item) => item.id !== id));
  }

  function check(id) {
    setItems((items) =>
      items.map((item) =>
        item.id === id ? { ...item, packed: !item.packed } : item
      )
    );
  }

  function clear(){
    setItems([]);
  }
  const itemsPacked = items.filter((item) => item.packed === true);
  const percentage = Math.round((itemsPacked.length / items.length) * 100);

  return (
    <div className="app">
      <Logo />
      <Form onHandleAddItem={handleAddItem} />
      <Packing items={items} onRemove={handleRemove} onCheck={check} onClear={clear}/>
      <Stats
        itemNumber={items.length}
        statsPacked={itemsPacked.length}
        percentage={percentage}
      />
    </div>
  );
}

export default App;
