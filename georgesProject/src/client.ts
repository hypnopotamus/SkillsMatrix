import axios from "axios";

const url = "https://edsf.itwasaday.net/api/boothEvents";
const apiKey = "dd531564-d1a9-4146-8bfa-9c8c6d3fe606";
const eventType = "skillsmatrix";
type message = {
    readonly messageType: typeof eventType;
    readonly message: string;
    readonly json: string;
};

export const sendEvent = async (message: string, content: any) => axios.post<never, void, message>(
    url,
    {
        messageType: eventType,
        message,
        json: JSON.stringify(content)
    },
    {
        headers: {
            Authorization: apiKey
        },
        withCredentials: false
    }
);