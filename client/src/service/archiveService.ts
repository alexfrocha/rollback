import axios from "axios";
import { BASE_API, defaultErrorRequestMessage } from "./settings";

interface ArchiveProps {
  name: string;
  folderId: string;
  userId: string;
  content?: string;
}

function createArchive({ name, folderId, userId, content }: ArchiveProps) {
  const newArchive = {
    name,
    folderId,
    userId,
    content,
  };

  axios
    .post(`${BASE_API}/api/archives/`, newArchive)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.log(defaultErrorRequestMessage + error);
    });
}

function updateArchive(
  id: string,
  { name, content }: { name?: string; content?: string }
) {
  axios
    .put(`${BASE_API}/api/archives/${id}`, {
      name,
      content,
    })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.log(defaultErrorRequestMessage + error);
    });
}

function deleteArchive(id: string) {
  axios
    .delete(`${BASE_API}/api/archives/${id}`)
    .then((response) => {
      console.log(response.data);
    })
    .catch((error) => {
      console.log(defaultErrorRequestMessage + error);
    });
}

function getAllArchivesByFolderId(folderId: string) {
  axios
    .get(`${BASE_API}/api/archives/folder/${folderId}`)
    .then((response) => {
      console.log(response.data);
    })
    .catch((error) => {
      console.log(defaultErrorRequestMessage + error);
    });
}

function getSourceFolderByUserId(userId: string) {
  axios
    .get(`${BASE_API}/api/archives/folder/source/${userId}`)
    .then((response) => {
      console.log(response.data);
      return response.data;
    })
    .catch((error) => {
      console.log(defaultErrorRequestMessage + error);
    });
}

export {
  getAllArchivesByFolderId,
  getSourceFolderByUserId,
  createArchive,
  deleteArchive,
  updateArchive,
};
