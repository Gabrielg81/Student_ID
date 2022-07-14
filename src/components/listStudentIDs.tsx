import { GetServerSideProps } from "next";
import { useState } from "react";
import useSWR from "swr";
import Modal from "./Modal";

const fetcher = (url: any) => fetch(url).then((res) => res.json());

function Profile(urlAPI: any) {
  const universityImage =
    "http://www.ppghi.uneb.br/wp-content/uploads/2019/03/logo_uneb.svg";
  const universityName = "Universidade do Estado da Bahia";
  const { data, error } = useSWR(`${urlAPI.urlAPI}`, fetcher);

  const openModal = (student: any) => {
    console.log("student:", student);
    setShowModal(true);
    setModalStudent(student);
  };

  const [showModal, setShowModal] = useState(false);
  const [modalStudent, setModalStudent] = useState({});

  if (error) return <div>Falha ao listar!</div>;
  if (!data) return <div>Carregando lista...</div>;

  <Modal
    student={modalStudent}
    universityImage={universityImage}
    universityName={universityName}
    showModal={showModal}
    setShowModal={setShowModal}
  />;

  return data.map((result: any) => (
    <div
      key={result.idStudent}
      onClick={() => openModal(result)}
      className="id"
    >
      <div className="image">
        <img
          style={{
            width: "100%",
            height: "auto",
            borderRadius: "1rem",
            border: "0.2rem solid #009774",
          }}
          alt={result.name}
          src={result.photo}
        />
      </div>
      <div className="data">
        <p>{result.name.toUpperCase()}</p>
        <p>{result.courseStudent}</p>
        <p>{result.status ? "Ativo" : "Inativo"}</p>
        <p>{result.semester}</p>
        <p>{result.codeStudent}</p>
      </div>
      <div className="university">
        <img style={{ width: "5rem" }} src={universityImage} />
        <p
          style={{
            alignItems: "center",
            fontSize: "10px",
            display: "flex",
            margin: "0 auto",
          }}
        >
          {universityName}
        </p>
      </div>
    </div>
  ));
}
export default Profile;
