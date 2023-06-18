"use client";
import { useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { FaTrash } from "react-icons/fa";
import { GET_CLIENTS } from "@/graphQL/queries/clients";
import { DELETE_CLIENT, CREATE_CLIENT } from "@/graphQL/mutations/client";
import Modal from "../component/modal";
import ClientForm from "@/component/client-form";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const schema = yup
  .object({
    name: yup.string().required("Name is a required field"),
    email: yup
      .string()
      .email("Invalid Email")
      .required("Email is a required field"),
    phone: yup.string().required("Phone number is a required field"),
  })
  .required();

export default function Home() {
  const [modalIsOpen, setIsOpen] = useState(false);

  const { loading, error, data } = useQuery(GET_CLIENTS);

  const [deleteClient]: any = useMutation(DELETE_CLIENT);
  const [addClient]: any = useMutation(CREATE_CLIENT);

  const deleteClientById = (id: any) => {
    deleteClient({
      variables: { id },
      update(cache, { data: { deleteClient } }) {
        const { clients } = cache.readQuery({ query: GET_CLIENTS });
        cache.writeQuery({
          query: GET_CLIENTS,
          data: {
            clients: clients.filter((client) => client.id !== deleteClient.id),
          },
        });
      },
    })
      .then(() => {
        // Handle successful deletion
        console.log("Record deleted successfully.");
      })
      .catch((error) => {
        // Handle error
        console.error("Error deleting record:", error);
      });
  };

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });
  const onSubmit = (data) => {
    const { name, email, phone } = data;
    addClient({
      variables: { name, email, phone },
      update(cache, { data: { addClient } }) {
        const { clients } = cache.readQuery({ query: GET_CLIENTS });
        cache.writeQuery({
          query: GET_CLIENTS,
          data: { clients: [...clients, addClient] },
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
  };

  const navigateToProject = () => {};

  if (loading) {
    return <h1>Loading</h1>;
  }
  if (error) {
    return <h1>something went wrong</h1>;
  }
  return (
    <div className="row pt-3">
      <Modal modalIsOpen={modalIsOpen}>
        <ClientForm
          onSubmit={handleSubmit(onSubmit)}
          register={register}
          errors={errors}
          setIsOpen={setIsOpen}
        />
      </Modal>
      <div className="col-lg-2"></div>
      <div className="col-lg-8">
        <button
          className="btn btn-primary float-right"
          onClick={() => navigateToProject()}
        >
          Add Project
        </button>
        <button className="btn btn-primary" onClick={() => setIsOpen(true)}>
          Add Client
        </button>
        <table className="table table-hover mt-3">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {data.clients.map((client) => (
              <tr key={client.id}>
                <td>{client.name}</td>
                <td>{client.email}</td>
                <td>{client.phone}</td>
                <td>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => deleteClientById(client.id)}
                  >
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="col-lg-2"></div>
    </div>
  );
}
