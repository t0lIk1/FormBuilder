import Box from "@mui/material/Box";
import {Container} from "@mui/material";
import {useEffect, useState} from "react";
import {useTemplates} from "../../api/useTemplates.ts";
import Loader from "../Loader/Loader.tsx";
import TemplateCard from "../../TemplateCard/TemplateCard.tsx";
import AddTemplateButton from "./AddTemplateButton.tsx";

const TemplatesList = () => {
  const {getAllTemplates, loading, error, token} = useTemplates();
  const [data, setData] = useState([]);

  useEffect(() => {
    async function getTemplates() {
      const res = await getAllTemplates();
      setData(res);
    }

    getTemplates();
  }, []);

  if (loading) {
    return <Loader/>;
  }

  return (
    <>
      <Container maxWidth="lg">
        <Box
          component="div"
          sx={{
            marginTop: 6,
            marginBottom: 6,
            display: "grid",
            gridTemplateColumns: {
              xs: "repeat(1, 1fr)",
              sm: "repeat(2, 1fr)",
              md: "repeat(3, 1fr)",
              lg: "repeat(4, 1fr)",
            },
            gap: 3,
            alignItems: "stretch",
          }}
        >
          {data.map((el) => (
            <TemplateCard key={el.id} {...el} />
          ))}
        </Box>
      </Container>
      {token && <AddTemplateButton/>}
    </>
  );
};

export default TemplatesList;