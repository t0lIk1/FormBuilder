import Box from "@mui/material/Box";
import {Container, Typography} from "@mui/material";
import {useEffect, useState} from "react";
import {useTemplates} from "../../api/useTemplates.ts";
import Loader from "../Loader/Loader.tsx";
import TemplateCard from "src/components/TemplateCard/TemplateCard.tsx";
import AddTemplateButton from "./AddTemplateButton.tsx";
import {TemplateI} from "src/types/type.ts";
import {useNowUser} from "src/context/UserContext.tsx";

interface TemplatesListProps {
  type?: "all" | "user";
}

const TemplatesList = ({type = "all"}: TemplatesListProps) => {
  const {getAllTemplates, getTemplatesByUser, loading} = useTemplates();
  const [data, setData] = useState<TemplateI[]>([]);
  const {user} = useNowUser();
  const token = localStorage.getItem("token");

  const fetchTemplates = async () => {
    if (type === "all") {
      const res = await getAllTemplates();
      setData(res);
    } else if (type === "user") {
      const res = await getTemplatesByUser();
      setData(res);
    }
  };

  useEffect(() => {
    fetchTemplates();
  }, [type]);

  const handleDeleteSuccess = () => {
    fetchTemplates();
  };

  if (loading) {
    return <Loader/>;
  }

  const filteredData = data.filter(template =>
    template.isPublic || (user && template.authorId === user.id)
  );


  return (
    <>
      <Container maxWidth="lg">
        {filteredData.length !== 0 ? <Box
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
          {filteredData.map((el) => (
            <Box
              key={el.id}
              sx={{
                opacity: !el.isPublic ? 0.5 : 1,
                transition: "opacity 0.3s ease",
                "&:hover": {
                  opacity: 1
                }
              }}
            >
              <TemplateCard {...el} onDeleteSuccess={handleDeleteSuccess}/>
            </Box>
          ))}
        </Box> : <Typography color="text.secondary" sx={{mt: 2}}>
          {type === "user" ? "У вас пока нет шаблонов" : "Шаблонов пока нет"}
        </Typography>}
      </Container>
      {token && <AddTemplateButton/>}
    </>
  );
};

export default TemplatesList;