import {Avatar, Box, Chip, Divider, Paper, Stack, Typography} from "@mui/material";
import {CalendarToday, Code, Public, Update} from "@mui/icons-material";
import {TemplateI} from "src/types/type.ts";

const InfoTab = (template: TemplateI) => {
  return (
    <Paper elevation={3} sx={{p: 4, my: 4, borderRadius: 2}}>
      <Box sx={{mb: 3}}>
        <Chip
          label={template.topic}
          color="primary"
          variant="outlined"
          sx={{
            mb: 2, overflow: "visible"
          }}
        />
        <Typography variant="h3" component="h1" sx={{fontWeight: 'bold', fontSize: "calc(1rem + 2vw)"}}>
          {template.title}
        </Typography>
      </Box>

      <Typography
        variant="body1"
        component="p"
        sx={{
          color: 'text.secondary',
          wordWrap: 'break-word',
          overflowWrap: 'break-word',
          whiteSpace: 'pre-line',
          textAlign: 'justify',
          hyphens: 'auto',
        }}
      >
        {template.description}
      </Typography>

      <Divider sx={{my: 3}}/>

      <Stack
        direction="row"
        spacing={2}
        sx={{my: 3}}
        flexWrap="wrap"
        useFlexGap
      >
        <Chip
          label={`Author: ${template.authorName}`}
          variant="outlined"
          avatar={
            <Avatar sx={{width: 24, height: 24}}>
              {template.authorName.charAt(0)}
            </Avatar>
          }
        />
        <Chip
          icon={<CalendarToday/>}
          label={`Created: ${new Date(template.createdAt).toLocaleDateString()}`}
          variant="outlined"
        />
        <Chip
          icon={<Update/>}
          label={`Updated: ${new Date(template.updatedAt).toLocaleDateString()}`}
          variant="outlined"
        />
        <Chip
          icon={<Code/>}
          label={`Questions: ${template?.questions?.length}`}
          variant="outlined"
        />
        <Chip
          icon={<Public/>}
          label={template.isPublic ? 'Public' : 'Private'}
          color={template.isPublic ? 'success' : 'default'}
          variant="outlined"
        />
      </Stack>

      {template?.tags?.length > 0 && (
        <Box sx={{mb: 3}}>
          <Typography variant="subtitle2" sx={{mb: 1}}>
            Tags:
          </Typography>
          <Stack direction="row" spacing={1} flexWrap="wrap">
            {template?.tags?.map(tag => (
              <Chip
                key={tag.id}
                label={tag.name}
                size="small"
                color="primary"
                sx={{mb: 1}}
              />
            ))}
          </Stack>
        </Box>
      )}
    </Paper>
  )

}

export default InfoTab;