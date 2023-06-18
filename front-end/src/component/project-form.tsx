import { GET_CLIENTS } from "@/graphQL/queries/clients";
import { useQuery } from "@apollo/client";
import React from "react";

function ProjectForm({
  register,
  onSubmit,
  errors,
  setIsOpen,
  isEdit = false,
}) {
  const { loading, error, data } = useQuery(GET_CLIENTS);
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
          <label className="form-label">Status</label>
          <select id="status" className="form-select" {...register("status")}>
            <option value="" disabled>
              Select Status
            </option>
            <option value="new">Not Started</option>
            <option value="progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>
          <small className="text-danger">{errors?.status?.message}</small>
        </div>
        {!isEdit ? (
          <div className="col-lg-12 pt-3">
            <label className="form-label">Clients</label>
            <select
              id="status"
              className="form-select"
              {...register("clientId")}
            >
              <option value="" disabled>
                Select Client
              </option>
              {loading || error ? (
                <option value="" disabled>
                  Loading...
                </option>
              ) : (
                data.clients.map((client) => (
                  <option value={client.id} key={client.id}>
                    {client.name}
                  </option>
                ))
              )}
            </select>
            <small className="text-danger">{errors?.clientId?.message}</small>
          </div>
        ) : null}

        <div className="col-lg-12 pt-3">
          <div className="form-group">
            <label>Description</label>
            <textarea
              {...register("description")}
              className="form-control"
              placeholder="Enter description here"
              rows={4}
            ></textarea>
            <small className="text-danger">
              {errors?.description?.message}
            </small>
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
            {isEdit ? "Edit" : "Save"}
          </button>
        </div>
      </div>
    </form>
  );
}

export default ProjectForm;
