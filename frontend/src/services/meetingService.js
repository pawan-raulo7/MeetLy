import api from "./api";

export const getMeetings = async () => {

    const token =
        localStorage.getItem("token");

    const response = await api.get(
        "/meetings",
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );

    return response.data;
};

export const getMeetingById = async (
    meetingId
) => {

    const token =
        localStorage.getItem("token");

    const response = await api.get(
        `/meetings/${meetingId}`,
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );

    return response.data;
};

export const searchMeetings = async (
    query
) => {

    const token =
        localStorage.getItem("token");

    const response = await api.get(
        `/meetings/search?keyword=${query}`,
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );

    return response.data;
};

export const createMeeting = async (
    meetingData
) => {

    const token =
        localStorage.getItem("token");

    const response = await api.post(
        "/meetings",
        meetingData,
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );

    return response.data;
};

export const uploadTranscript = async (
    formData
) => {

    const token =
        localStorage.getItem("token");

    const response = await api.post(
        "/meetings/upload",
        formData,
        {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type":
                    "multipart/form-data",
            },
        }
    );

    return response.data;
};