import { useForm } from "react-hook-form";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { categoryState, toDoState } from "../atoms";
import { stringify } from "querystring";

interface IForm {
  toDo: string;
}

function CreateToDo() {
  const [toDos, setToDos] = useRecoilState(toDoState);
  const category = useRecoilValue(categoryState);
  const { register, handleSubmit, setValue } = useForm<IForm>();
  const handleValid = (data: IForm) => {
    // console.log("add to do", data.toDo);
    setValue("toDo", "");
    setToDos((oldToDos) => {
      const newToDos = [
        { text: data.toDo, id: Date.now(), category },
        ...oldToDos,
      ];
      localStorage.setItem("toDos", JSON.stringify(newToDos));
      return newToDos;
    });
  };

  return (
    <form onSubmit={handleSubmit(handleValid)}>
      <input
        {...register("toDo", {
          required: "please write a To Do",
        })}
        placeholder="Write a to do"
      ></input>
      <button>Add</button>
    </form>
  );
}

export default CreateToDo;
