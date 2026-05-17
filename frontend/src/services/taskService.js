import api from "./api";

export const getTasks = async () => {

    const token =
        localStorage.getItem("token");

    const response = await api.get(
        "/tasks",
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );

    return response.data;
};

export const updateTask = async (
    taskId,
    updatedData
) => {

    const token =
        localStorage.getItem("token");

    const response = await api.patch(
        `/tasks/${taskId}`,
        updatedData,
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );

    return response.data;
};