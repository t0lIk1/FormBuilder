import {useParams} from "react-router-dom";
import {useTemplates} from "src/api/useTemplates.ts";
import {useEffect, useState} from "react";
import Loader from "src/components/Loader/Loader.tsx";
import {Container, Paper, Tab, Tabs, Typography} from "@mui/material";
import {Analytics, Comment, Person, Settings} from "@mui/icons-material";
import InfoTab from "src/components/TemplateInfo/tabs/InfoTab.tsx";
import {TemplateI} from "src/types/type.ts";
import {useNowUser} from "src/context/UserContext.tsx";
import Comments from "src/components/Comments/Comments.tsx";


const TemplateInfo = () => {
  const [template, setTemplate] = useState<TemplateI | null>(null);
  const [activeTab, setActiveTab] = useState('info');
  const {id} = useParams();
  const {getTemplateById, loading} = useTemplates();
  const {user} = useNowUser()

  const isCreator = user && template && user.id === template?.authorId;

  useEffect(() => {
    const fetchTemplate = async () => {
      if (id) {
        const res = await getTemplateById(id);
        setTemplate(res);
      }
    };
    fetchTemplate();
  }, []);

  const handleTabChange = (event: React.SyntheticEvent, newValue: string) => {
    setActiveTab(newValue);
  };

  if (loading) {
    return <Loader/>;
  }

  if (!template) {
    return (
      <Container>
        <Typography>Template not found</Typography>
      </Container>
    );
  }

  const tabs = [
    {value: 'info', label: 'Info', icon: <Person/>}
  ];

  if (isCreator) {
    tabs.push(
      {value: 'analytics', label: 'Analytics', icon: <Analytics/>},
      {value: 'settings', label: 'Settings', icon: <Settings/>}
    );
  }

  const tabContent = {
    info: (
      <InfoTab {...template}/>
    ),
    analytics: (
      <Paper elevation={3} sx={{p: 4, my: 4, borderRadius: 2}}>
        <Typography variant="h4" sx={{mb: 3}}>Analytics</Typography>
        <Typography>Here will be analytics data for this template</Typography>
      </Paper>
    ),
    settings: (
      <Paper elevation={3} sx={{p: 4, my: 4, borderRadius: 2}}>
        <Typography variant="h4" sx={{mb: 3}}>Template Settings</Typography>
        <Typography>Here you can configure your template</Typography>
      </Paper>
    )
  };

  return (
    <Container maxWidth="md">
      {isCreator && <Tabs
        value={activeTab}
        onChange={handleTabChange}
        centered
      >
        {tabs.map((tab) => (
          <Tab
            key={tab.value}
            value={tab.value}
            label={tab.label}
            icon={tab.icon}
            iconPosition="start"
          />
        ))}
      </Tabs>}

      {tabContent[activeTab]}

      <Comments templateId={template.id}/>
    </Container>
  );
};

export default TemplateInfo;