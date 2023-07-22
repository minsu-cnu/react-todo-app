import { useSetRecoilState } from "recoil";
import { Categories, IToDo, toDoState } from "../atoms";

/* [
  {
    text: "5",
    id: 1689919037349,
    category: "TO_DO",
  },
  {
    text: "4",
    id: 1689919036350,
    category: "TO_DO",
  },
  {
    text: "3",
    id: 1689919036057,
    category: "TO_DO",
  },
  {
    text: "2",
    id: 1689919035625,
    category: "TO_DO",
  },
  {
    text: "1",
    id: 1689919033854,
    category: "TO_DO",
  },
]; */

function ToDo({ text, category, id }: IToDo) {
  const setToDos = useSetRecoilState(toDoState);
  const onClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    const {
      currentTarget: { name },
    } = event;
    setToDos((oldToDos) => {
      const targetIndex = oldToDos.findIndex((toDo) => toDo.id === id);
      const newToDo = { text, id, category: name as any };
      const newToDos = [
        ...oldToDos.slice(0, targetIndex),
        newToDo,
        ...oldToDos.slice(targetIndex + 1),
      ];
      localStorage.setItem("toDos", JSON.stringify(newToDos));
      return newToDos;
    });
  };
  const onDelete = () => {
    setToDos((oldToDos) => {
      const targetIndex = oldToDos.findIndex((toDo) => toDo.id === id);
      const newToDos = [
        ...oldToDos.slice(0, targetIndex),
        ...oldToDos.slice(targetIndex + 1),
      ];
      localStorage.setItem("toDos", JSON.stringify(newToDos));
      return newToDos;
    });
  };
  return (
    <li>
      <span>{text}</span>
      {category !== Categories.TO_DO && (
        <button name={Categories.TO_DO} onClick={onClick}>
          To Do
        </button>
      )}
      {category !== Categories.DOING && (
        <button name={Categories.DOING} onClick={onClick}>
          Doing
        </button>
      )}
      {category !== Categories.DONE && (
        <button name={Categories.DONE} onClick={onClick}>
          Done
        </button>
      )}
      <button onClick={onDelete}>Delete</button>
    </li>
  );
}

export default ToDo;
