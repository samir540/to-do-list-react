import React, { useState, useEffect } from "react";
import { Checkbox } from "antd";

const Tasks = () => {
  const [tag, setTag] = useState("");
  const [tasks, setTasks] = useState([]);
  const [header, setHeader] = useState("");
  const [updatedHeader, setUpdatedHeader] = useState("");
  const [updatedTags, setUpdatedTags] = useState([]);

  const localTasks = "localTasks";

  const headerHandler = (e) => {
    const headerVal = e.target.value;
    setHeader(headerVal);
  };
  const tagsHandler = (e) => {
    const tagsInput = e.target.value;
    setTag(tagsInput);
  };

  const submitTaskHandler = (e) => {
    e.preventDefault();

    const tagsSplitedByComma = tag.split(",");
    const newTask = {
      id: new Date().getTime(),
      tags: { tagsNames: tagsSplitedByComma, isEditedTag: false },
      header,
      isEdited: false,
      isChecked: false,
    };
    if (header) {
      setTasks([...tasks, newTask]);
      localStorage.setItem(
        localTasks,
        JSON.stringify([
          ...tasks,
          {
            id: new Date().getTime(),
            tags: { tagsNames: tagsSplitedByComma, isEditedTag: false },
            header,
            isEdited: false,
            isChecked: false,
          },
        ])
      );
    }

    setHeader("");
    setTag("");
    
  };

  useEffect(() => {
    if (localStorage.getItem(localTasks)) {
      const storedTasks = JSON.parse(localStorage.getItem(localTasks));
      setTasks(storedTasks);
    }
  }, []);

  const deleteTaskHandler = (taskId) => {
    const filteredTasksById = tasks.filter((task) => task.id !== taskId);
    setTasks(filteredTasksById);

    localStorage.setItem(localTasks, JSON.stringify(filteredTasksById));
  };
  // update checking

  const onChangeHandler = (id) => {
    const updatedChecked = tasks.map((task) => {
      if (task.id === id) {
        task.isChecked = !task.isChecked;
      }
      return task;
    });
    setTasks([...updatedChecked]);
    localStorage.setItem(localTasks, JSON.stringify([...updatedChecked]));
  };

  // update header
  const updateHeaderHandler = (taskId) => {
    const editedHeader = tasks.map((task) => {
      if (taskId === task.id) {
        task.isEdited = !task.isEdited;
        task.header = updatedHeader;
      }
      return task;
    });

    setTasks([...editedHeader]);
    localStorage.setItem(localTasks, JSON.stringify([...editedHeader]));
    setUpdatedHeader("");
  };
  // update tags
  const editTagHandler = (taskId, tagId) => {
    const editedTag = tasks.map((task) => {
      if (taskId === task.id) {
        if (task.tags.tagsNames) {
          task.tags.isEditedTag = true;
          setUpdatedTags( [...updatedTags,  ...task.tags.tagsNames]);
        }
      }

      return task;
    });

    setTasks([...editedTag]);
    localStorage.setItem(localTasks, JSON.stringify([...editedTag]));
    // setUpdatedTag("");
  };

  const saveTagHandler =(taskId)=>{
    console.log(taskId);
    const updateNewTags = tasks.map(task=>{
      if(task.id===taskId){
        task.tags.isEditedTag = !task.tags.isEditedTag;
        if (typeof updatedTags==="string"){
          task.tags.tagsNames = updatedTags.split(",");
        } else {
          task.tags.tagsNames = updatedTags;
        }
        
      }
      return task;
    })
      setTasks([...updateNewTags]);
      localStorage.setItem(localTasks, JSON.stringify([...updateNewTags]));
    setUpdatedTags([])
    
  }

  return (
    <div className="flex flex-col">
      <div className="flex flex-col ">
        <h3 className="   text-3xl font-bold text-emerald-500 text-center mb-5  ">
          Tapşırıq yarat{" "}
        </h3>
        <div className="flex flex-row">
          <form
            onSubmit={submitTaskHandler}
            className="flex flex-row align-center "
          >
            <div className="flex flex-col mr-[50px] ">
              <div className="mb-5 bg-grey-400  ">
                <label className="font-bold text-[20px] text-orange-400 ">
                  Başlıq:{" "}
                  <input
                    placeholder="Başlıq əlavə et..."
                    className=" ml-3 placeholder:text-[15px]  "
                    value={header}
                    onInput={headerHandler}
                  />
                </label>
              </div>
              <div>
                <label className=" text-[20px] text-orange-300 ">
                  Teqler:
                  <input
                    placeholder="Teqleri vergül (,) ilə əlavə et..."
                    className=" ml-3 placeholder:text-sm  "
                    value={tag}
                    onInput={tagsHandler}
                  />
                </label>
              </div>
            </div>
            <button className="bg-orange-400 p-2 h-[50px] rounded-[12px] border-2 border-slate-400 flex align-center ">
              Əlavə et
            </button>
          </form>
        </div>
      </div>
      <div className="mt-8">
        <h3 className="mb-5 text-[20px] text-emerald-400 text-center ">
          Mənim Siyahım
        </h3>
        {tasks.length > 0 &&
          tasks.map((task) => (
            <div className="  flex flex-row  mb-[80px] " key={task.id}>
              <input
                type="checkbox"
                defaultChecked={task.isChecked}
                onClick={() => onChangeHandler(task.id)}
              />
              <div className="  flex flex-col  mb-[80px] bg-amber-100 h-[200px] w-4/5 ">
                <div className="flex flex-row">
                  {!task.isEdited && (
                    <h5 className="text-blue-500 text-[30px] text-center ">
                      {task.header}
                    </h5>
                  )}

                  {task.isEdited && (
                    <input
                      value={updatedHeader}
                      onChange={(e) => setUpdatedHeader(e.target.value)}
                    />
                  )}

                  <span
                    className="cursor-pointer p-2  "
                    onClick={() => updateHeaderHandler(task.id)}
                  >
                    {task.isEdited ? "Save" : " Edit"}
                  </span>
                </div>

                <div className="flex flex-row justify-between">
                  <div className="flex flex-wrap">
                    {task.tags.tagsNames.length > 0 &&
                      task.tags.tagsNames.map((tag, index) => (
                        <div key={index}>
                          <span
                            key={index}
                            className="mr-1.5   p-[8px] bg-cyan-400 rounded-[12px] text-[20px] "
                          >
                            {tag}
                          </span>
                        </div>
                      ))}
                    <span
                      className="cursor-pointer p-2  "
                      onClick={() => editTagHandler(task.id)}
                    >
                      Edit
                    </span>
                  </div>
                  {task.tags.isEditedTag && (
                    <>
                      <input
                        value={updatedTags}
                        onChange={(e) => setUpdatedTags(e.target.value)}
                      />
                      <span
                        className="cursor-pointer p-2  "
                        onClick={() => saveTagHandler(task.id)}
                      >
                        Save
                      </span>
                    </>
                  )}
                  <button
                    className=" w-1/5  h-11 mt-5 p-2 bg-red-600"
                    onClick={() => {
                      deleteTaskHandler(task.id);
                    }}
                  >
                    Sil
                  </button>
                </div>
              </div>
            </div>
          ))}
        <hr className="w-[10px] " />
      </div>
    </div>
  );
};

export default Tasks;
