import Box from "@mui/material/Box";
import { Container } from "@mui/material";
import { useEffect, useState } from "react";
import { useTemplates } from "../../api/useTemplates.ts";
import Loader from "../Loader/Loader.tsx";
import TemplateCard from "../../TemplateCard/TemplateCard.tsx";

const TemplatesList = () => {
  const { getAllTemplates, loading, error } = useTemplates();
  const [data, setData] = useState([]);

  useEffect(() => {
    async function getTemplates() {
      const res = await getAllTemplates();
      setData(res);
    }
    getTemplates();
  }, []);

  if (loading) {
    return <Loader />;
  }

  return (
    <Container maxWidth="lg">
      <Box
        component="div"
        sx={{
          marginTop: 6,
          display: "grid",
          gridTemplateColumns: {
            xs: "repeat(1, 1fr)",
            sm: "repeat(2, 1fr)",
            md: "repeat(3, 1fr)",
            lg: "repeat(4, 1fr)",
          },
          gap: 3,
          alignItems: "stretch", // Важно! Растягивает карточки по высоте
        }}
      >
        {data.map((el) => (
          <TemplateCard key={el.id} {...el} />
        ))}
      </Box>
    </Container>
  );
};

export default TemplatesList;