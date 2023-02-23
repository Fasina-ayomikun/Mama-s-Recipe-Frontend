import React from "react";
import ListItems from "./ListItems";

function Tags({ items, type }) {
  return (
    <ul className='flex flex-wrap items-center gap-2'>
      {items?.map((item, index) => {
        return <ListItems key={index} index={index} item={item} type={type} />;
      })}
    </ul>
  );
}

export default Tags;
