import * as React from 'react';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import {
  Divider,
  FormControl,
  FormLabel,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Stack,
  TextField
} from '@mui/material';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm, Controller } from 'react-hook-form';
import CloseIcon from '@mui/icons-material/Close';
import { ICreateInjectionPointForm } from '@/types/injection-point';
import { useCreateVaccinationSiteMutation } from '@/api/vaccination-sites';
import { QueryActionCreatorResult } from '@reduxjs/toolkit/query';
import { QueryDefinition } from '@reduxjs/toolkit/query';
import { useFetchDistrictQuery, useFetchProvinceQuery, useFetchWardQuery } from '@/api/address';

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
  const [onCreate, { isLoading, error }] = useCreateVaccinationSiteMutation();

  const editInjectionPointSchema = yup.object().shape({
    name: yup.string().required('Require'),
    street: yup.string().required('Require'),
    manager: yup.string().required('Require'),
    number_table: yup.number().required('Require'),
    house_number: yup.number().nullable(),
    province: yup.string().required('Province is require'),
    district: yup.string().required('District is require'),
    ward: yup.string().required('Ward is require')
  });

  const {
    register,
    handleSubmit,
    reset: resetForm,
    watch,
    control,
    formState: { errors, isValid }
  } = useForm<ICreateInjectionPointForm>({
    mode: 'onChange',
    defaultValues: {
      name: '',
      street: '',
      manager: '',
      number_table: 0,
      house_number: null,
      ward: '',
      district: '',
      province: ''
    },
    resolver: yupResolver(editInjectionPointSchema)
  });

  const watchProvince = watch('province');
  const watchDistrict = watch('district');
  const { data: provinces } = useFetchProvinceQuery();
  const { data: districts } = useFetchDistrictQuery({
    province_id: watchProvince
  });
  const { data: wards } = useFetchWardQuery({
    district_id: watchDistrict
  });

  const onSubmit = async (values: ICreateInjectionPointForm) => {
    try {
      await onCreate({
        name: values.name,
        house_number: values.house_number,
        manager: values.manager,
        street: values.street,
        number_table: values.number_table,
        ward_id: values.ward
      }).unwrap();
      await refetchData();
      resetForm();
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
                Thêm điểm tiêm
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
              sx={{
                height: '100%',
                maxHeight: '500px',
                overflowY: 'auto',
                '&::-webkit-scrollbar': {
                  display: 'none'
                }
              }}
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
                  Số nhà
                </FormLabel>
                <TextField
                  {...register('house_number')}
                  id="house_number"
                  type="text"
                  placeholder="Số nhà"
                  variant="outlined"
                  error={!!errors.house_number?.message}
                  helperText={errors.house_number?.message}
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
                  Đường/Phố
                </FormLabel>
                <TextField
                  {...register('street')}
                  id="street"
                  type="text"
                  placeholder="Đường/Phố"
                  variant="outlined"
                  error={!!errors.street?.message}
                  helperText={errors.street?.message}
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
              <Stack width="100%" spacing={1}>
                <FormLabel
                  sx={{
                    color: '#000'
                  }}
                >
                  Địa chỉ
                </FormLabel>
                <Controller
                  control={control}
                  name="province"
                  render={({ field }) => (
                    <FormControl size="small">
                      <InputLabel id="demo-simple-select-label">Tỉnh/Thành phố</InputLabel>
                      <Select
                        id="province"
                        label="Tỉnh/Thành phố"
                        {...field}
                        error={!!errors.province?.message}
                      >
                        {provinces &&
                          provinces.map((province, index) => (
                            <MenuItem key={province.id} value={province.id}>
                              {province.name}
                            </MenuItem>
                          ))}
                      </Select>
                    </FormControl>
                  )}
                />
              </Stack>
              <Stack width="100%">
                <Controller
                  control={control}
                  name="district"
                  render={({ field }) => (
                    <FormControl size="small" disabled={!watchProvince}>
                      <InputLabel id="demo-simple-select-label">Quận/Huyện</InputLabel>
                      <Select
                        id="district"
                        label="Quận/Huyện"
                        {...field}
                        error={!!errors.district?.message}
                      >
                        {districts &&
                          districts.map((district, index) => (
                            <MenuItem key={district.id} value={district.id}>
                              {district.name}
                            </MenuItem>
                          ))}
                      </Select>
                    </FormControl>
                  )}
                />
              </Stack>
              <Stack width="100%">
                <Controller
                  control={control}
                  name="ward"
                  render={({ field }) => (
                    <FormControl size="small" disabled={!watchProvince || !watchDistrict}>
                      <InputLabel id="demo-simple-select-label">Xã/Phường</InputLabel>
                      <Select
                        id="ward"
                        label="Xã/Phường"
                        {...field}
                        error={!!errors.province?.message}
                      >
                        {wards &&
                          wards.map((ward, index) => (
                            <MenuItem key={ward.id} value={ward.id}>
                              {ward.name}
                            </MenuItem>
                          ))}
                      </Select>
                    </FormControl>
                  )}
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
