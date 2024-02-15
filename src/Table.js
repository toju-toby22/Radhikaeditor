import React from 'react'
import "./style.css"
import { BsTrashFill, BsPencilFill } from "react-icons/bs"
const Table = () => {
  return (
    <div className='table-wrapper'>
      <table className='table'>
        <thead>
          <tr>
            <th>Page</th>
            <th className='expand'>Article Title</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>

        <tbody>
          <tr>
            <td>Home</td>
            <td>HoThis is me</td>
            <td>
            <span className='actions'>
                <BsPencilFill />
              </span>
            </td>
            <td>
              <span className='actions'>
                <BsTrashFill />
              </span>
            </td>
          </tr>



          <tr>
            <td>Page 2</td>
            <td>Fixed</td>
            <td>
            <span className='actions'>
                <BsPencilFill />
              </span>
            </td>
            <td>
              <span className='actions'>
                <BsTrashFill />
              </span>
            </td>
          </tr>

        </tbody>
      </table>
    </div>
  );
}

export default Table