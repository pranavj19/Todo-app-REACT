import React from 'react';

const tableList = ({
  list, handleDelete, handleEdit, handleStatus,
  handleArraySort,
 }) => {
  return (
    <div className="mt-2">
      {list && list.length > 0 ? (
        <table class="table table-striped">
          <thead className="thead-dark">
            <tr>
              <th scope="col" style={{ cursor: 'pointer' }}><div role="presentation" onClick={() => handleArraySort()}>Status</div></th>
              <th scope="col">Title</th>
              <th scope="col">Description</th>
              <th scope="col">Edit</th>
              <th scope="col">Delete</th>
            </tr>
          </thead>
          <tbody>
            {list && list.length > 0 && list.map((e) => {
              return (
                <tr>
                  <td scope="row">
                    <input
                      type="checkbox"
                      checked={e.status}
                      onClick={(d) => handleStatus(d.target.checked, e.id)}
                    />
                  </td>
                  <td>{e.title}</td>
                  <td>{e.description}</td>
                  <td><i className="fa fa-pencil" role="presentation" onClick={() => handleEdit(e)}/></td>
                  <td><i className="fa fa-trash" role="presentation" onClick={() => handleDelete(e.id)}/></td>
                </tr>
              )
            })}
          </tbody>
        </table>
      ) : <div className="col-12 d-flex text-danger justify-content-center">NO RECORDS FOUND</div>}
    </div>
  );
};

export default tableList;