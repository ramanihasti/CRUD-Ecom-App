import { BASE_URL } from "../consts";
import { capitalize } from "./stringHelper";

export function getAllApiServices({ entity, entities }) {
  async function getAllEntities() {
    const response = await fetch(`${BASE_URL}/${entities}`);
    return await response.json();
  }

  async function getSingleEntity(id) {
    const response = await fetch(`${BASE_URL}/${entities}/${id}`);
    return await response.json();
  }

  async function addEntity(body) {
    const response = await fetch(`${BASE_URL}/${entities}`, {
      method: "POST",
      body: body,
    });
    return await response.json();
  }

  async function updateEntity(body, id) {
    const response = await fetch(`${BASE_URL}/${entities}/${id}`, {
      method: "PATCH",
      body,
    });
    return await response.json();
  }

  async function deleteEntity(id) {
    const response = await fetch(`${BASE_URL}/${entities}/${id}`, {
      method: "DELETE",
    });
    return await response.json();
  }

  const capEntity = capitalize(entity);
  const capEntities = capitalize(entities);

  const apiServices = {
    [`getAll${capEntities}`]: getAllEntities,
    [`getSingle${capEntity}`]: getSingleEntity,
    [`add${capEntity}`]: addEntity,
    [`update${capEntity}`]: updateEntity,
    [`delete${capEntity}`]: deleteEntity,
  };
  return apiServices;
}
