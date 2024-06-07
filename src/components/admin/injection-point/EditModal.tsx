import * as React from 'react';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { Divider, FormLabel, Paper, Stack, TextField } from '@mui/material';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import CloseIcon from '@mui/icons-material/Close';
import { IInjectionPointUpdate, IInjectionPointUpdateForm } from '@/types/injection-point';
import { useUpdateVaccinationSitesMutation } from '@/api/vaccination-sites';
import { QueryActionCreatorResult } from '@reduxjs/toolkit/query';
import { QueryDefinition } from '@reduxjs/toolkit/query';

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  p: 2
};

const EditModal: React.FC<{
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  editData: IInjectionPointUpdate;
  refetchData: () => QueryActionCreatorResult<QueryDefinition<any, any, any, any>>;
}> = ({ open, setOpen, editData, refetchData }) => {
  const [onUpdate, { isLoading }] = useUpdateVaccinationSitesMutation();

  const editInjectionPointSchema = yup.object().shape({
    name: yup.string().required('Require'),
    manager: yup.string().required('Require'),
    number_table: yup.number().required('Require')
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid }
  } = useForm<IInjectionPointUpdateForm>({
    mode: 'onChange',
    defaultValues: {
      name: 'name edit',
      manager: editData.manager,
      number_table: editData.number_table
    },
    resolver: yupResolver(editInjectionPointSchema)
  });

  React.useEffect(() => {
    reset({
      name: editData.name,
      manager: editData.manager,
      number_table: editData.number_table
    });
  }, [editData, reset]);

  const onSubmit = async (values: IInjectionPointUpdateForm) => {
    try {
      await onUpdate({
        ...values,
        id: editData.id
      }).unwrap();
      setOpen(false);
      await refetchData();
    } catch (error) {}
  };

  const onClose = () => setOpen(false);
  return (
    <div>
      <Modal open={open} onClose={onClose}>
        <Paper elevation={6} sx={style}>
          <Stack direction="column" spacing={2}>
            <Stack direction="row" justifyContent="space-between">
              <Typography fontSize={20} fontWeight={500}>
                Cập nhật điểm tiêm
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
                  Điểm tiêm
                </FormLabel>
                <TextField
                  {...register('name')}
                  id="namePoint"
                  type="text"
                  placeholder="Điểm tiêm"
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
                  Người đứng đầu cơ sở
                </FormLabel>
                <TextField
                  {...register('manager')}
                  id="manager"
                  type="text"
                  placeholder="Người đứng đầu cơ sở"
                  variant="outlined"
                  error={!!errors.manager?.message}
                  helperText={errors.manager?.message}
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
                  Số bàn tiêm
                </FormLabel>
                <TextField
                  {...register('number_table')}
                  id="number_table"
                  type="number"
                  placeholder="Số bàn tiêm"
                  variant="outlined"
                  error={!!errors.number_table?.message}
                  helperText={errors.number_table?.message}
                  size="small"
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
                  Xác nhận
                </Button>
              </Stack>
            </Stack>
          </Stack>
        </Paper>
      </Modal>
    </div>
  );
};
export default EditModal;
