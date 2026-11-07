import type {Task} from '../App';

export const taskCard = (props: Task, onClick: (id: number) => void) => {
  return (
    <div>
      {props.completed ?
      <h4 style={{marginBottom: '5px'}}><s>{props.name}</s></h4> :
      <h4 style={{marginBottom: '5px'}}>{props.name}</h4>}
      <p>predmet: {props.subject}</p>
      <p>completed: {props.completed ? 'true' : 'false'}</p>
      <button onClick={() => onClick(props.id)}>completed</button>
    </div>
  )
}
