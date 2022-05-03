import react from "react"

function ArrayView({ name, array }) {

  return <div>
    <span>{ name }</span>
    {
      array.map(
        v => <input type={ "text" } value={ v } ></input>
      )
    }
  </div>

}

export default ArrayView
