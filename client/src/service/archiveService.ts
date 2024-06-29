import axios from "axios";
import { BASE_API, defaultErrorRequestMessage } from "./settings";
import { ArchiveProps } from "../interfaces/core";

async function createArchive({
  name,
  folderId,
  userId,
  content,
  type,
}: ArchiveProps) {
  let newArchive: ArchiveProps = {
    name,
    folderId,
    userId,
    content,
    type,
  };

  await axios
    .post(`${BASE_API}/api/archives/`, newArchive)
    .then((response) => {
      newArchive = response.data;
      console.log(
        `[NEW ARCHIVE] archive #${response.data.id} has been created`
      );
      return response.data;
    })
    .catch((error) => {
      console.log(defaultErrorRequestMessage + error);
    });
  return newArchive;
}

async function updateArchive(
  id: string,
  { name, content }: { name?: string; content?: string }
) {
  let archive: ArchiveProps = {
    name: "",
    folderId: "",
    content: "",
    userId: "",
    type: "",
    id: "",
  };
  axios
    .put(`${BASE_API}/api/archives/${id}`, {
      name,
      content,
    })
    .then((response) => {
      archive = response.data;
    })
    .catch((error) => {
      console.log(defaultErrorRequestMessage + error);
    });
  return archive;
}

function deleteArchive(id: string) {
  axios
    .delete(`${BASE_API}/api/archives/${id}`)
    .then((response) => {
    })
    .catch((error) => {
      console.log(defaultErrorRequestMessage + error);
    });
}

async function getAllArchivesByFolderId(folderId: string) {
  let archives: ArchiveProps[] = [];
  await axios
    .get(`${BASE_API}/api/archives/folder/${folderId}`)
    .then((response) => {
      archives = response.data;
    })
    .catch((error) => {
      console.log(defaultErrorRequestMessage + error);
    });
  return archives;
}

async function getSourceFolderByUserId(userId: string) {
  let archives: ArchiveProps[] = [];
  await axios
    .get(`${BASE_API}/api/archives/folder/source/${userId}`)
    .then((response) => {
      archives = response.data;
    })
    .catch((error) => {
      console.log(defaultErrorRequestMessage + error);
    });
  return archives;
}

export {
  getAllArchivesByFolderId,
  getSourceFolderByUserId,
  createArchive,
  deleteArchive,
  updateArchive,
};
