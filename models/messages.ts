import config from "../config/config.json";

const messageModel = {
    getAllMessages: async function getAllMessages() {
        return fetch(`${config.base_url}/messages`)
            .then(response => response.json())
            .then(result => result.data)
    },
};

export default messageModel;
