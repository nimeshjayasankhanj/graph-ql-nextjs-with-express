"use client";
import ProjectForm from "@/component/project-form";
import { GET_PROJECTS } from "@/graphQL/queries/projects";
import { useMutation, useQuery } from "@apollo/client";
import React, { useState } from "react";
import { FaTrash, FaRegEdit } from "react-icons/fa";
import Modal from "@/component/modal";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import {
  ADD_PROJECT,
  DELETE_PROJECT,
  UPDATE_PROJECT,
} from "@/graphQL/mutations/project";

function Projects() {
  const [modalIsOpen, setIsOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [projectId, setProjectId] = useState(null);

  const { loading, data, error } = useQuery(GET_PROJECTS);
  const [addProject] = useMutation(ADD_PROJECT);
  const [updateProject] = useMutation(UPDATE_PROJECT);
  const [deleteProject] = useMutation(DELETE_PROJECT);

  const schema = yup
    .object({
      name: yup.string().required("Name is a required field"),
      description: yup.string().required("Description is a required field"),
      status: yup.string().required("Status is a required field"),
      clientId: yup.string().required("Client is a required field"),
    })
    .required();

  const schemaUpdate = yup
    .object({
      name: yup.string().required("Name is a required field"),
      description: yup.string().required("Description is a required field"),
      status: yup.string().required("Status is a required field"),
      clientId: yup.string().notRequired(),
    })
    .required();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    setValue,
  } = useForm({
    resolver: yupResolver(isEdit ? schemaUpdate : schema),
    defaultValues: {
      name: "",
      description: "",
      status: "new",
      clientId: "",
    },
  });
  const onSubmit = (data) => {
    const { name, description, status, clientId } = data;
    if (projectId !== null) {
      updateProject({
        variables: {
          id: projectId,
          name,
          description,
          status,
        },
        refetchQueries: [{ query: GET_PROJECTS }],
      })
        .then(() => {
          setIsOpen(false);
          // Handle successful deletion
          console.log("Record deleted successfully.");
        })
        .catch((error) => {
          // Handle error
          console.error("Error deleting record:", error);
        });
    } else {
      addProject({
        variables: { name, description, status, clientId },
        update(cache, { data: { addProject } }) {
          const { projects } = cache.readQuery({ query: GET_PROJECTS });
          cache.writeQuery({
            query: GET_PROJECTS,
            data: { projects: [...projects, addProject] },
          });
        },
      })
        .then(() => {
          setIsOpen(false);
          // Handle successful deletion
          console.log("Record deleted successfully.");
        })
        .catch((error) => {
          // Handle error
          console.error("Error deleting record:", error);
        });
    }
  };

  const projectStatus = (status) => {
    if (status === "Not Started") {
      return "new";
    } else if (status === "In Progress") {
      return "progress";
    } else {
      return "completed";
    }
  };

  const editProject = (project) => {
    console.log(project);
    setIsEdit(true);
    setIsOpen(true);
    setProjectId(project.id);
    setValue("name", project.name);
    setValue("description", project.description);
    setValue("status", projectStatus(project.status));
  };

  const deleteProjectById = (id) => {
    deleteProject({
      variables: {
        id: id,
      },
      refetchQueries: [{ query: GET_PROJECTS }],
    })
      .then(() => {
        console.log("Record deleted successfully.");
      })
      .catch((error) => {
        // Handle error
        console.error("Error deleting record:", error);
      });
  };

  if (loading) {
    return <h3>Loading</h3>;
  }
  if (error) {
    return <h3>Something went wrong</h3>;
  }
  if (data.projects.length === 0) {
    return <h3>No records</h3>;
  }
  return (
    <div className="container pt-3">
      <div className="row pb-3">
        <div className="col-lg-12">
          <button
            className="btn btn-primary float-right"
            onClick={() => setIsOpen(true)}
          >
            Add Project
          </button>
        </div>
      </div>
      <div className="row">
        {data.projects.map((project) => (
          <div className="col-lg-3" key={project.id}>
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">{project.name}</h5>
                <h6 className="card-subtitle mb-2 text-muted">
                  {project.status}
                </h6>
                <p className="card-text">{project.description}</p>
                <p className="card-text">{project.client}</p>

                <a
                  href="#"
                  className="card-link"
                  onClick={() => deleteProjectById(project.id)}
                >
                  <FaTrash style={{ color: "red" }} />
                </a>
                <a
                  href="#"
                  className="card-link"
                  onClick={() => editProject(project)}
                >
                  <FaRegEdit />
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
      <Modal modalIsOpen={modalIsOpen}>
        <ProjectForm
          register={register}
          errors={errors}
          onSubmit={handleSubmit(onSubmit)}
          setIsOpen={setIsOpen}
          isEdit={isEdit}
        />
      </Modal>
    </div>
  );
}

export default Projects;
