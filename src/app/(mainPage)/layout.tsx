import Footer from '@/components/layout/Footer';
import Header from '@/components/layout/Header';
import { Box, Stack } from '@mui/material';

export default function HomeLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Stack spacing={4} direction="column" alignItems={'center'}>
      <Header />
      <Box width="100%">{children}</Box>
      <Footer />
    </Stack>
  );
}
