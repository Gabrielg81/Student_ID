import { GetServerSideProps } from "next";
import { useState } from "react";
import useSWR from "swr";
import Modal from "../components/Modal";

const fetcher = (url: any) => fetch(url).then((res) => res.json());

export default function Profile(urlAPI: any) {
  const universityImage =
    "http://www.ppghi.uneb.br/wp-content/uploads/2019/03/logo_uneb.svg";
  const universityName = "Universidade do Estado da Bahia";
  const { data, error } = useSWR(
    `${urlAPI.urlAPI}/api/registerStudent`,
    fetcher
  );
  const openModal = (student: any) => {
    setShowModal((prev) => !prev);
    setModalStudent(student);
  };

  const [showModal, setShowModal] = useState(false);
  const [modalStudent, setModalStudent] = useState({});

  if (error) return <div>failed to load</div>;
  if (!data) return <div>loading...</div>;

  <Modal
    student={modalStudent}
    universityImage={universityImage}
    universityName={universityName}
    showModal={showModal}
    setShowModal={setShowModal}
  />;

  return data.allStudentIDs.map((result: any) => (
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
