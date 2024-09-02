import React from "react";

export default function Item({ sender, category, date, amount }) {
  return (
    <tr className="text-xs border-b h-10 sm:text-sm">
      <td>{sender}</td>
      <td>{category}</td>
      <td>{date}</td>
      <td>{amount}</td>
    </tr>
  );
}
