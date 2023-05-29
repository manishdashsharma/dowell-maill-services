import axios from "axios";

export const generateKey = async () => {
    try {
        const response = await axios.post("api/v1/generate-api-key/")
        return response.data
    } catch (error) {
        console.error(error);
        throw new Error("Failed to send email");
    }
};


export const sendMail = async (emailData, uuid) => {
  try {
    const response = await axios.post(`/api/v1/send-email/${uuid}/`, emailData);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to send email");
  }
};
