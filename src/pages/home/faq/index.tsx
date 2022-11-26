import { Accordion, Box, Typography, AccordionSummary, AccordionDetails } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import React from 'react';
import { Stack } from '@mui/system';

const Faq = () => {
  return (
    <Box id='faq' sx={{ background: '#FFFFFF', py: '6rem' }}>
      <Typography variant='h2' component='h1' sx={{ textAlign: 'center' }}>
        Frequently Asked Questions (FAQ)
      </Typography>
      <Stack
        sx={{
          width: { xs: '95%', sm: '90%', md: '100%', lg: '100%', xl: '100%' },
          maxWidth: 'var(--horizontal-wrapper)',
          mx: 'auto',
          mt: '3.75rem'
        }}
        spacing={3}
      >
        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls='panel1a-content' id='panel1a-header'>
            <Typography>Do you provide repairs?</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              Yes, we're happy to serve you in our physical shop located at Palico, Imus. You may locate it via google
              map.
            </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls='panel1a-content' id='panel1a-header'>
            <Typography>When is your next big sale?</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>{`Just keep posted! Sales are exciting as it is! :)`}</Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls='panel1a-content' id='panel1a-header'>
            <Typography>For More Questions. Contact Us:</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>gnemotorparts@gmail.com</Typography>
          </AccordionDetails>
        </Accordion>
      </Stack>
    </Box>
  );
};

export default Faq;
