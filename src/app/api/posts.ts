import axios from "axios";

const handleFetchFn = async () => {
  const response = await axios('https://port-0-components-hub-lya99xale0f30650.sel5.cloudtype.app/api/posts');
  return response.data;
}

export default handleFetchFn;