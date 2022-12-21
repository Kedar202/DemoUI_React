import axios from "axios";
export const get = async (url) => {
  const response = await axios
    .get(url, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem("accessToken")}`
      }
    })
    .then((res) => {
      if (res.status ==="200" || res.status === 200) {
        return res.data.response;
      } else {
        return [];
      }
      // return res;
    })
    .catch((err) => {
      console.error(err);
    });
  return response;
};

export const remove = async (url, data) => {
  const response = await axios
    .delete(url, data)
    .then((res) => {
      return res;
    })
    .catch((err) => {
      console.error(err);
    });
  return response;
};

// export const patch = async (url, data) => {
//   const response = await axios
//     .patch(url, data)
//     .then((res) => {
//       return res;
//     })
//     .catch((err) => {
//       console.error(err);
//     });
//   return response;
// };

export const patch = async (url, data) => {
  return await axios
    .patch(url, data)
    .then((res) => {
      if (res.status === 200) {
        if (res.data?.success) {
          return res.data?.data.list ? res.data?.data.list : res.data;
        } else {
          return [];
        }
      } else {
        return [];
      }
    })
    .catch((err) => {
      // return err?.response?.data;
    });
};

export const post = async (url, data) => {
  const Token = localStorage.getItem("accessToken");
  let header;
  console.log(Token)
  if (Token) {
    header = {
      'Authorization': `Bearer ${localStorage.getItem("accessToken")}`
    }
  }
  return await axios
    .post(url, data, { headers: header })
    .then((res) => {
      console.log(res)
      if (res.status ==="200" || res.status === 200) {
        return res.data?.data.list ? res.data?.data.list : res.data?.data ? res.data.data : true;
      } else {
        return [];
      }
    })
    .catch((err) => {
      return err?.response?.data;
    });
};
