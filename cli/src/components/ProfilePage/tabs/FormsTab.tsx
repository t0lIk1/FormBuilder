import { useEffect, useState } from "react";
import { useNowUser } from "src/context/UserContext";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Chip,
  Button,
  Box,
  CircularProgress,
} from "@mui/material";
import {useForm} from "src/api/useForm.ts";
import {FormI, TemplateI} from "src/types/type.ts";

const FormsTab = () => {
  const [forms, setForms] = useState<FormI[]>([]);
  const { user } = useNowUser();
  const {getFormByNowUser, loading} = useForm();
  useEffect(() => {
    const fetchForms = async () => {
          const res = await getFormByNowUser()
          setForms(res || []);
    };
    fetchForms();
  }, [user]);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" mt={4}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        My Form Answers
      </Typography>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Form ID</TableCell>
              <TableCell>Template</TableCell>
              <TableCell>Submitted At</TableCell>
              <TableCell>Topic</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {forms.map((form) => {
              const template = user.templates.find((template: TemplateI) => template.id === form.templateId);

              return (
                <TableRow key={form.id}>
                  <TableCell>{form.id}</TableCell>
                  <TableCell>
                    <Box display="flex" alignItems="center" gap={1}>
                      {template?.title || 'Unknown Template'}
                      <Chip
                        label={template?.isPublic ? 'Public' : 'Private'}
                        color={template?.isPublic ? 'success' : 'primary'}
                        size="small"
                      />
                    </Box>
                  </TableCell>
                  <TableCell>
                    {new Date(form.submittedAt).toLocaleString()}
                  </TableCell>
                  <TableCell>
                    {template?.topic || 'N/A'}
                  </TableCell>
                  <TableCell>
                    <Button
                      size="small"
                      href={`/templates/${form.templateId}/responses/${form.id}`}
                      sx={{ mr: 1 }}
                    >
                      View
                    </Button>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default FormsTab;