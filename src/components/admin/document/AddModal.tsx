import * as React from 'react';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { Divider, FormLabel, Paper, Stack, TextField } from '@mui/material';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import CloseIcon from '@mui/icons-material/Close';
import { useCreateVaccinationSiteMutation } from '@/api/vaccination-sites';
import { QueryActionCreatorResult } from '@reduxjs/toolkit/query';
import { QueryDefinition } from '@reduxjs/toolkit/query';
import { IDocumentAddForm } from '@/types/document';
import { useAddDocumentMutation } from '@/api/documents';

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  p: 2
};

const AddModal: React.FC<{
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  refetchData: () => QueryActionCreatorResult<QueryDefinition<any, any, any, any>>;
}> = ({ open, setOpen, refetchData }) => {
  const [onCreate, { isLoading, error }] = useAddDocumentMutation();

  const addDocumentSchema = yup.object().shape({
    name: yup.string().required('Require'),
    file: yup.mixed<File>().nullable()
  });
  const {
    register,
    handleSubmit,
    reset: resetForm,
    setValue,
    formState: { errors, isValid }
  } = useForm<IDocumentAddForm>({
    mode: 'onChange',
    defaultValues: {
      name: '',
      file: null
    },
    resolver: yupResolver(addDocumentSchema)
  });

  const onSubmit = async (values: IDocumentAddForm) => {
    try {
      await onCreate(values).unwrap();
      await refetchData();
      setOpen(false);
      resetForm();
      await refetchData();
    } catch (error) {}
  };

  const handleChangeFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    setValue('file', e.target.files[0]);
  };

  const onClose = () => setOpen(false);
  return (
    <div>
      <Modal open={open} onClose={onClose}>
        <Paper elevation={6} sx={style}>
          <Stack direction="column" spacing={2}>
            <Stack direction="row" justifyContent="space-between">
              <Typography fontSize={20} fontWeight={500}>
                Thêm tài liệu
              </Typography>
              <Button onClick={onClose}>
                <CloseIcon />
              </Button>
            </Stack>
            <Divider />

            <Stack
              component="form"
              direction="column"
              spacing={2}
              onSubmit={handleSubmit(onSubmit)}
              alignItems="center"
            >
              <Stack spacing={1}>
                <FormLabel
                  sx={{
                    color: '#000'
                  }}
                >
                  Tên tài liệu
                </FormLabel>
                <TextField
                  {...register('name')}
                  id="namePoint"
                  type="text"
                  placeholder="Tên tài liệu"
                  variant="outlined"
                  error={!!errors.name?.message}
                  helperText={errors.name?.message}
                  size="small"
                  sx={{
                    width: '396px'
                  }}
                />
              </Stack>
              <Stack spacing={1}>
                <FormLabel
                  sx={{
                    color: '#000'
                  }}
                >
                  Chọn file
                </FormLabel>
                <TextField
                  id="file"
                  type="file"
                  name="file"
                  variant="outlined"
                  size="small"
                  onChange={handleChangeFile}
                  sx={{
                    width: '396px'
                  }}
                />
              </Stack>

              <Stack direction="row" justifyContent="flex-end" width="100%" spacing={2}>
                <Button
                  variant="outlined"
                  onClick={onClose}
                  sx={{
                    color: '#303F9F',
                    borderColor: '#303F9F',
                    fontSize: '15px',
                    borderRadius: '8px 8px 8px 0',
                    fontWeight: 500,
                    backgroundColor: '#fff',
                    height: '40px',
                    width: 'auto',
                    '&:hover': {
                      backgroundColor: '#fff',
                      opacity: '0.9'
                    },
                    '&.Mui-disabled': {
                      backgroundColor: '#fff',
                      opacity: '0.6',
                      color: '#303F9F'
                    }
                  }}
                >
                  Hủy bỏ
                </Button>
                <Button
                  disabled={!isValid || isLoading}
                  type="submit"
                  variant="outlined"
                  sx={{
                    color: '#fff',
                    borderColor: '#303F9F',
                    fontSize: '15px',
                    borderRadius: '8px 8px 8px 0',
                    fontWeight: 500,
                    backgroundColor: '#303F9F',
                    height: '40px',
                    width: 'auto',
                    '&:hover': {
                      backgroundColor: '#303F9F',
                      opacity: '0.9'
                    },
                    '&.Mui-disabled': {
                      backgroundColor: '#303F9F',
                      opacity: '0.6',
                      color: '#fff'
                    }
                  }}
                >
                  Thêm
                </Button>
              </Stack>
            </Stack>
          </Stack>
        </Paper>
      </Modal>
    </div>
  );
};
export default AddModal;
