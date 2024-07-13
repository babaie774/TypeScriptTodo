export const onDragStart = (e: React.DragEvent<HTMLLIElement>, index: any) => {
  console.log(index);
  e.dataTransfer.setData('draggedItemIndex', index);
};

export const onDragOver = (e: { preventDefault: () => void }) => {
  e.preventDefault();
};

export const onDrop = (
  e: React.DragEvent<HTMLLIElement>,
  index: any,
  handleNewOrderTodos: (arg0: any) => void,
  todoList: any,
) => {
  const draggedItemIndex: any = e.dataTransfer.getData('draggedItemIndex');
  const newItems: any = [...todoList];
  const [draggedItem] = newItems.splice(draggedItemIndex, 1);
  newItems.splice(index, 0, draggedItem);
  console.log(index, +draggedItemIndex, newItems);

  handleNewOrderTodos(newItems);
};

export let persianDateTimeFormatter = (date: Date) =>
  new Intl.DateTimeFormat('fa-IR-u-ca-persian', {
    month: 'numeric',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    hour12: false,
  }).format(date);
