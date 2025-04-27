import Box from "@mui/material/Box";
import {Container, Typography} from "@mui/material";
import {useEffect, useState} from "react";
import {useTemplates} from "../../api/useTemplates.ts";
import Loader from "../Loader/Loader.tsx";
import TemplateCard from "src/components/TemplateCard/TemplateCard.tsx";
import AddTemplateButton from "./AddTemplateButton.tsx";
import {TemplateI} from "src/types/type.ts";

interface TemplatesListProps {
  type?: "all" | "user";
}

const TemplatesList = ({type = "all"}: TemplatesListProps) => {
  const {getAllTemplates, getTemplatesByUser, loading, token} = useTemplates();
  const [data, setData] = useState<TemplateI[]>([]);

  useEffect(() => {
    async function getTemplates() {
      if (type === "all") {
        const res = await getAllTemplates();
        setData(res);
      } else if (type === "user") {
        const res = await getTemplatesByUser();
        setData(res)
      }
    }

    getTemplates();
  }, []);

  if (loading) {
    return <Loader/>;
  }

  return (
    <>
      {/*<Typography color="text.secondary" sx={{mt: 2}}>*/}
      {/*  У вас пока нет шаблонов*/}
      {/*</Typography>*/}
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
            },
            gap: 3,
            alignItems: "stretch",
          }}
        >
          {data.map((el) => (
            <TemplateCard key={el.id} {...el}/>
          ))}
        </Box>
      </Container>
      {token && <AddTemplateButton/>}
    </>
  );
};

export default TemplatesList;