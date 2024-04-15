import { Box } from '@mui/material';

export default function LoadingPage() {
  return (
    <Box
      sx={{
        height: '100%',
        position: 'fixed',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0
      }}
    >
      <Box
        sx={{
          height: '100%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#0000002d'
        }}
      >
        <Box
          sx={{
            width: '48px',
            height: '48px',
            borderWidth: '4px',
            borderStyle: 'dashed',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite',
            borderColor: '#000'
          }}
        ></Box>
      </Box>
      <style jsx>{`
        @keyframes spin {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </Box>
  );
}
