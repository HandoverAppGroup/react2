import React, {useEffect, useState} from "react";
import axios from 'axios'
import { useHistory } from "react-router-dom";
import Button from "react-bootstrap/Button";

export default function EditTask(props) {
  let history = useHistory();
  const [task, setTask] = useState(Object.assign({}, props.location.selectedTask ?? {
    description: "",
    gradeRequired: "",
    patientMrn: "",
    patientClinicalSummary: "",
    patientLocation: ""
  }));

  const [creator, setCreator] = useState (Object.assign({}, props.location.selectedTask.creator ?? {
    name: "",
    grade: ""
  }));

  const [completer, setCompleter] = useState (Object.assign({}, props.location.selectedTask.completer ?? {
    name: "",
    grade: ""
  }));

  const onInputChange = e => {
    setTask({ ...task, [e.target.name]: e.target.value });
  };

  const onCreatorInfoChange = e => {
    setCreator({ ...creator, [e.target.name]: e.target.value });
  }

  const onCompleterInfoChange = e => {
    setCompleter({ ...completer, [e.target.name]: e.target.value });
  }

  const onSubmit = async e => {
    e.preventDefault();
    let taskToPost = JSON.parse(JSON.stringify(task));
    taskToPost.creator = creator;
    console.log(taskToPost);
    await axios.put(`https://handoverapp.herokuapp.com/api/tasks/${props.match.params.id}`, taskToPost);
    history.push("/");
  };

  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    loadTasks();
  }, []);

  const loadTasks = async () => {
    const result = await axios.get("https://handoverapp.herokuapp.com/api/tasks/today");
    setTasks(result.data);
  };

  const deleteTask = async id => {
    history.goBack()
    await axios.delete(`https://handoverapp.herokuapp.com/api/tasks/${id}`);
    loadTasks();
  };

  return (
    <div className="container mt-3">
      <div className="w-75 mx-auto shadow p-5 py-4">
        <h2 className="text-center mb-4">Edit task</h2>
        <form onSubmit={e => onSubmit(e)}>
          <div className="form-group">
            <h5> Task Description
            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="Task description"
              name="description"
              value={task.description}
              onChange={e => onInputChange(e)}
            />
              </h5>
          </div>
          <div className="form-group">
            <h5> Grade required
            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="Grade required"
              name="gradeRequired"
              value={task.gradeRequired}
              onChange={e => onInputChange(e)}
            />
              </h5>
          </div>
          <div className="form-group">
            <h5> MRN
            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="Enter the patient's MRN"
              name="patientMrn"
              value={task.patientMrn}
              onChange={e => onInputChange(e)}
            />
              </h5>
          </div>
          <div className="form-group">
            <h5> Clinical Summary
            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="Enter the patient's clinical summary"
              name="patientClinicalSummary"
              value={task.patientClinicalSummary}
              onChange={e => onInputChange(e)}
            />
              </h5>
          </div>
          <div className="form-group">
            <h5> Location
            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="Enter the patient's location"
              name="patientLocation"
              value={task.patientLocation}
              onChange={e => onInputChange(e)}
            />
              </h5>
          </div>
          <div className="form-group">
            <h5> Your name
            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="Your name"
              name="name"
              value={creator.name}
              onChange={e => onCreatorInfoChange(e)}
            />
              </h5>
          </div>
          <div className="form-group">
            <h5> Your grade
            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="Your grade"
              name="grade"
              value={creator.grade}
              onChange={e => onCreatorInfoChange(e)}
            />
              </h5>
          </div>
          <div className="form-group">
            <h5> Nightshift Completer's name
              <input
                  type="text"
                  className="form-control form-control-lg"
                  placeholder="Nightshift Completer's name"
                  name="name"
                  value={completer.name}
                  onChange={e => onCompleterInfoChange(e)}
              />
            </h5>
          </div>
          <div className="form-group">
            <h5> Nightshift Completer's grade
              <input
                  type="text"
                  className="form-control form-control-lg"
                  placeholder="Nightshift Completer's grade"
                  name="grade"
                  value={completer.grade}
                  onChange={e => onCompleterInfoChange(e)}
              />
            </h5>
          </div>
          <button className="btn btn-warning btn-block">Update this task</button>
          <Button variant="danger" onClick={() => {history.goBack()}}>Cancel</Button>
          <Button variant="danger" onClick={() => {deleteTask(task.id)}}>Delete</Button>
        </form>
      </div>
    </div>
  );
}




