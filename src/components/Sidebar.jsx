


const links = [
  ["Dashboard","/dashboard"],
  ["Inventory List","/inventories"],
  ["Add Item","/inventories/new"],
]

export default function() {
  return <div class="w-full flex flex-col">
    <div>Inventaris</div>
    <ul class="flex flex-col">
      {links.map(([name,link]) =>
        <li>
          <a href={link}>{name}</a>
        </li>
      )}
    </ul>
  </div>
}

