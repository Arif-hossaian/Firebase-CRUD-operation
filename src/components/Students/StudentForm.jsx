import {
  Button,
  Card,
  CardContent,
  Container,
  Grid,
  Grow,
} from "@material-ui/core";
import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import InputForm from "../Layout/InputForm";
import { useFirestore } from "react-redux-firebase";

const StudentForm = () => {
  const firestore = useFirestore();
  const { id } = useParams();
  const docRef = id ? firestore.collection("students").doc(id) : null;
  const history = useHistory();
  const [student, setStudent] = useState({
    name: "",
    email: "",
    phone: "",
    standard: "",
    address1: "",
    address2: "",
  });
  const handleInputChange = (e) => {
    setStudent({
      ...student,
      [e.target.name]: e.target.value,
    });
  };

  const loadStudentData = async () => {
    //load user data to the input field
    try {
      const result = await docRef.get();
      if (result.exists) setStudent(result.data());
      else alert("No such Students exits");
    } catch (error) {
      console.log("Error: ", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (id) {
      //Update student info
      await docRef.update({
        ...student,
        updatedAt: firestore.FieldValue.serverTimestamp(),
      });
    } else {
      //Add new Student
      firestore.collection("students").add({
        ...student,
        createdAt: firestore.FieldValue.serverTimestamp(),
      });
    }
    history.push("/");
  };

  useEffect(() => {
    if (id) loadStudentData();
  }, [id]);

  return (
    <Container>
      <Grow in>
        <Card>
          <CardContent>
            <form onSubmit={handleSubmit}>
              <Grid container spacing={4}>
                <InputForm
                  required
                  name="name"
                  label="Enter student name"
                  value={student.name}
                  onChange={handleInputChange}
                />
                <InputForm
                  required
                  name="email"
                  label="Enter Student E-mail"
                  value={student.email}
                  onChange={handleInputChange}
                />
                <InputForm
                  required
                  name="phone"
                  label="Enter Student Phone"
                  value={student.phone}
                  onChange={handleInputChange}
                />
                <InputForm
                  required
                  name="standard"
                  label="Enter Student Class"
                  value={student.standard}
                  onChange={handleInputChange}
                />
                <InputForm
                  required
                  name="address1"
                  label="Enter Student's Temporary Address"
                  value={student.address1}
                  onChange={handleInputChange}
                />
                <InputForm
                  required
                  name="address2"
                  label="Enter Student's parmanent Address"
                  value={student.address2}
                  onChange={handleInputChange}
                />
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  style={{ marginLeft: "15px", marginTop: "10px" }}
                >
                  {id ? "Update student" : "Add Student"}
                </Button>
              </Grid>
            </form>
          </CardContent>
        </Card>
      </Grow>
    </Container>
  );
};

export default StudentForm;
