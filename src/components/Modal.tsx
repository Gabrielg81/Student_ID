/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import React from "react";
import { MdClose } from "react-icons/md";
import { Background, CardModal } from "../styles/components.Styles";
import Image from "next/image";

export default function Modal(props: any) {
  console.log("bateu", props);
  const { student, universityImage, universityName, showModal, setShowModal } =
    props;
  return (
    <>
      {showModal ? (
        <Background>
          <CardModal>
            <MdClose
              className="close"
              onClick={() => setShowModal((prev: any) => !prev)}
            />
            <div className="image">
              <img
                style={{
                  width: "100%",
                  height: "auto",
                  borderRadius: "1rem",
                  border: "0.2rem solid #009774",
                }}
                src={student.photo}
              />
            </div>
            <div className="data">
              <p>{student?.name}</p>
              <p>{student?.course}</p>
              <p>{student?.status ? "Inativo" : "Ativo"}</p>
              <p>{student?.semester}</p>
              <p>{student?.codeStudent}</p>
              <div style={{ display: "flex", justifyContent: "space-around" }}>
                <a href={student?.linkedin} target={"_blank"}>
                  <Image src="/linkedin.png" width={30} height={30} />
                </a>
                <a href={student?.lattes} target={"_blank"}>
                  <Image src="/lattes.png" width={30} height={30} />
                </a>
              </div>
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
          </CardModal>
        </Background>
      ) : null}
    </>
  );
}
