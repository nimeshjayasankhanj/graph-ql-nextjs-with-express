import React from "react";

function ClientForm({ register, onSubmit, errors, setIsOpen }) {
  return (
    <form onSubmit={onSubmit}>
      <div className="row">
        <div className="col-lg-12">
          <div className="form-group">
            <label>Name</label>
            <input
              type="type"
              className="form-control"
              placeholder="Enter name"
              {...register("name")}
            />
            <small className="text-danger">{errors?.name?.message}</small>
          </div>
        </div>
        <div className="col-lg-12 pt-3">
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              className="form-control"
              placeholder="Enter email"
              {...register("email")}
            />
            <small className="text-danger">{errors?.email?.message}</small>
          </div>
        </div>
        <div className="col-lg-12 pt-3">
          <div className="form-group">
            <label>Phone</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter phone number"
              {...register("phone")}
            />
            <small className="text-danger">{errors?.phone?.message}</small>
          </div>
        </div>
        <div className="col-lg-12 pt-3">
          <button
            className="btn btn-secondary"
            style={{ marginRight: "10px" }}
            type="button"
            onClick={() => setIsOpen(false)}
          >
            Cancel
          </button>
          <button className="btn btn-primary" type="submit">
            Save
          </button>
        </div>
      </div>
    </form>
  );
}

export default ClientForm;
