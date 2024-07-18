import axios from "axios";

const fetchPostData = async (id:string) => {
  const response = await axios(`https://port-0-components-hub-lya99xale0f30650.sel5.cloudtype.app/api/posts/${id}`);
  return response.data;
}

export default fetchPostData;