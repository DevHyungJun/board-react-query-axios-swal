import axios from "axios";

interface IFormInput {
  title: string;
  content: string;
}

const fetchCreatePost = async (data: IFormInput | null) => {
  const response = await axios.post("https://port-0-components-hub-lya99xale0f30650.sel5.cloudtype.app/api/posts", data, {
    headers: {
      "Content-Type": "application/json"
    },
  });
  const result = response.data;
  return result;
}

export default fetchCreatePost;