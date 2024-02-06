import { Sketch } from "@prisma/client";
import { axios } from "libs/axios";

type SketchData = {
  name?: string;
  elements: string;
};

export const createSketch = async (sketchData: {
  authorId: string;
  projectId: string;
}) => {
  try {
    const response = await axios.post(`/api/sketches`, {
      sketchData,
    });

    return response.data as Sketch;
  } catch (error) {
    console.log(error);
  }
};

export const getProjectSketches = async (projectId: string) => {
  try {
    const response = await axios.get(`/api/projects/${projectId}/sketches`);

    return response.data as Sketch[];
  } catch (error) {
    console.log(error);
  }
};

export const getOneSketch = async (sketchId: string) => {
  try {
    const response = await axios.get(`/sketches/${sketchId}`);

    return response.data as Sketch;
  } catch (error) {
    console.log(error);
  }
};

export const updateSketch = async (
  sketchId: string,
  sketchData: SketchData
) => {
  try {
    const response = await axios.put(`/sketches/${sketchId}`, {
      sketchData,
    });
    return response.data as Sketch;
  } catch (error) {
    console.log(error);
  }
};

export const deleteSketch = async (sketchId: string) => {
  try {
    const response = await axios.delete(`/sketches/${sketchId}`);
    return response.data as Sketch;
  } catch (error) {
    console.log(error);
  }
};
