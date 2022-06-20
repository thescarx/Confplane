import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function EditFromRev() {
  const [file, setFile] = useState(null);
  const handleUpload = (event) => {
    setFile(event.target.files[0]);
    console.log(file);
  };
  const [article, setArticle] = useState({});
  const token = localStorage.getItem("token");

  const modify = () => {
    let urll = "http://192.168.8.100:8000/articles/edit_article/" + article.article;
    let data = new FormData();
    data.append("article_url", file);
    data.append("request_to_edit", id);
    axios.post();
  };
  axios.interceptors.request.use(
    (config) => {
      config.headers.authorization = `Bearer ${token}`;
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );
  const { id } = useParams();
  useEffect(() => {
    let url = "http://192.168.8.100:8000/articles/get/request_to_edit/" + id;
    axios.get(url).then((resp) => {
      let newArticle = {
        modification: resp["data"].modification,
        deadline: resp["data"].deadline,
        article: resp["data"].article,
      };
      setArticle(newArticle);
    });
  }, []);
  return (
    <>
      <div>hello</div>
    </>
  );
}
export default EditFromRev;
