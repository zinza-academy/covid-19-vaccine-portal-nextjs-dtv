import * as React from 'react';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import {
  Alert,
  Divider,
  FormControl,
  FormHelperText,
  FormLabel,
  MenuItem,
  Paper,
  Select,
  Stack,
  TextField
} from '@mui/material';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { Controller, useForm } from 'react-hook-form';
import CloseIcon from '@mui/icons-material/Close';
import dayjs, { Dayjs } from 'dayjs';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { IVaccinationRegistrationResult } from '@/types/vaccination-registration';
import { ICreateVaccinationResultForm } from '@/types/vaccination_result';
import { IVaccinationType } from '@/types/vaccination_type';
import { useCreateVaccinationResultMutation } from '@/api/vaccination-results';
import { useFetchAllVaccinationSitesQuery } from '@/api/vaccination-sites';
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
const vaccinationTypes: IVaccinationType[] = [
  {
    id: 1,
    name: 'Vaccine 1'
  },
  {
    id: 2,
    name: 'Vaccine 2'
  }
];
const EditModal: React.FC<{
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  editData?: IVaccinationRegistrationResult | null;
  refetchData: () => QueryActionCreatorResult<QueryDefinition<any, any, any, any>>;
}> = ({ open, setOpen, editData, refetchData }) => {
  const [onCreateVaccinationResult, { isLoading, error }] = useCreateVaccinationResultMutation();

  const editVaccineResultSchema = yup.object().shape({
    time: yup.mixed<Dayjs>().required('Require'),
    lot: yup.number().required('Require'),
    vaccination_type_id: yup.number().required('Require'),
    vaccination_site_id: yup.number().required('Require')
  });

  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isValid }
  } = useForm<ICreateVaccinationResultForm>({
    mode: 'onChange',
    defaultValues: {
      time: dayjs(),
      lot: 0,
      vaccination_type_id: 1,
      vaccination_site_id: 1
    },
    resolver: yupResolver(editVaccineResultSchema)
  });

  const onSubmit = async (values: ICreateVaccinationResultForm) => {
    try {
      if (editData) {
        await onCreateVaccinationResult({
          lot: values.lot,
          time: values.time,
          vaccination_type_id: values.vaccination_type_id,
          user_id: editData.user.id,
          vaccination_registration_id: editData.id,
          vaccination_site_id: values.vaccination_site_id
        }).unwrap();
        await refetchData();
        setOpen(false);
      }
    } catch (error) {}
  };

  const onClose = () => setOpen(false);
  return (
    <div>
      <Modal open={open} onClose={onClose}>
        <Paper elevation={6} sx={style}>
          <Stack direction="column" spacing={2}>
            <Stack direction="row" justifyContent="space-between" alignItems="start">
              <Stack direction="column" spacing={2}>
                <Typography fontSize={20} fontWeight={500}>
                  Cập nhật kết quả tiêm
                </Typography>
                {editData && !editData?.vaccinationResult && (
                  <Alert severity="info">Số thẻ: {editData && `${editData.hic}`}</Alert>
                )}
              </Stack>
              <Button onClick={onClose}>
                <CloseIcon />
              </Button>
            </Stack>
            <Divider />
            {editData && editData?.vaccinationResult ? (
              <Alert severity="success">Đã được tiêm</Alert>
            ) : (
              <Stack
                component="form"
                direction="column"
                spacing={2}
                onSubmit={handleSubmit(onSubmit)}
                alignItems="center"
              >
                <Stack spacing={1} width="396px">
                  <FormLabel sx={{ color: 'black' }}>Ngày tiêm</FormLabel>
                  <Controller
                    name="time"
                    control={control}
                    render={({ field, fieldState }) => (
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker disablePast {...field} format="DD/MM/YYYY" />
                        {errors.time?.message && (
                          <FormHelperText error>{errors.time?.message}</FormHelperText>
                        )}
                      </LocalizationProvider>
                    )}
                  />
                </Stack>
                <Stack spacing={1}>
                  <FormLabel
                    sx={{
                      color: '#000'
                    }}
                  >
                    Lot
                  </FormLabel>
                  <TextField
                    {...register('lot')}
                    id="lot"
                    type="number"
                    placeholder="Điểm tiêm"
                    variant="outlined"
                    error={!!errors.lot?.message}
                    helperText={errors.lot?.message}
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
                    Mã điểm tiêm
                  </FormLabel>
                  <TextField
                    {...register('vaccination_site_id')}
                    id="vaccination_site_id"
                    type="number"
                    placeholder="Điểm tiêm"
                    variant="outlined"
                    error={!!errors.vaccination_site_id?.message}
                    helperText={errors.vaccination_site_id?.message}
                    size="small"
                    sx={{
                      width: '396px'
                    }}
                  />
                </Stack>
                <Stack spacing={1} width="396px">
                  <FormLabel sx={{ color: 'black' }}>Loại Vaccine</FormLabel>
                  <Controller
                    control={control}
                    name="vaccination_type_id"
                    render={({ field }) => (
                      <FormControl>
                        <Select
                          id="status"
                          {...field}
                          error={!!errors.vaccination_type_id?.message}
                          sx={{
                            '& .MuiSelect-select .notranslate::after': {
                              content: `"Trạng thái"`,
                              opacity: 0.42
                            }
                          }}
                        >
                          {vaccinationTypes.map((item) => (
                            <MenuItem key={item.id} value={item.id}>
                              {item.name}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    )}
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
                    disabled={!isValid}
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
            )}
          </Stack>
        </Paper>
      </Modal>
    </div>
  );
};
export default EditModal;
