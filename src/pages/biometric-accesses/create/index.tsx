import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Text,
  Box,
  Spinner,
  FormErrorMessage,
  Switch,
  Flex,
} from '@chakra-ui/react';
import Breadcrumbs from 'components/breadcrumb';
import DatePicker from 'components/date-picker';
import { Error } from 'components/error';
import { FormWrapper } from 'components/form-wrapper';
import { NumberInput } from 'components/number-input';
import { SelectInput } from 'components/select-input';
import { AsyncSelect } from 'components/async-select';
import { TextInput } from 'components/text-input';
import AppLayout from 'layout/app-layout';
import { FormikHelpers, useFormik } from 'formik';
import { useRouter } from 'next/router';
import { FunctionComponent, useState } from 'react';
import * as yup from 'yup';
import { AccessOperationEnum, AccessServiceEnum, requireNextAuth, withAuthorization } from '@roq/nextjs';
import { compose } from 'lib/compose';

import { createBiometricAccess } from 'apiSdk/biometric-accesses';
import { biometricAccessValidationSchema } from 'validationSchema/biometric-accesses';
import { UserInterface } from 'interfaces/user';
import { getUsers } from 'apiSdk/users';
import { BiometricAccessInterface } from 'interfaces/biometric-access';

function BiometricAccessCreatePage() {
  const router = useRouter();
  const [error, setError] = useState(null);

  const handleSubmit = async (values: BiometricAccessInterface, { resetForm }: FormikHelpers<any>) => {
    setError(null);
    try {
      await createBiometricAccess(values);
      resetForm();
      router.push('/biometric-accesses');
    } catch (error) {
      setError(error);
    }
  };

  const formik = useFormik<BiometricAccessInterface>({
    initialValues: {
      punch_in_time: new Date(new Date().toDateString()),
      punch_out_time: new Date(new Date().toDateString()),
      user_id: (router.query.user_id as string) ?? null,
    },
    validationSchema: biometricAccessValidationSchema,
    onSubmit: handleSubmit,
    enableReinitialize: true,
    validateOnChange: false,
    validateOnBlur: false,
  });

  return (
    <AppLayout
      breadcrumbs={
        <Breadcrumbs
          items={[
            {
              label: 'Biometric Accesses',
              link: '/biometric-accesses',
            },
            {
              label: 'Create Biometric Access',
              isCurrent: true,
            },
          ]}
        />
      }
    >
      <Box rounded="md">
        <Box mb={4}>
          <Text as="h1" fontSize={{ base: '1.5rem', md: '1.875rem' }} fontWeight="bold" color="base.content">
            Create Biometric Access
          </Text>
        </Box>
        {error && (
          <Box mb={4}>
            <Error error={error} />
          </Box>
        )}
        <FormWrapper onSubmit={formik.handleSubmit}>
          <FormControl id="punch_in_time" mb="4">
            <FormLabel fontSize="1rem" fontWeight={600}>
              Punch In Time
            </FormLabel>
            <DatePicker
              selected={formik.values?.punch_in_time ? new Date(formik.values?.punch_in_time) : null}
              onChange={(value: Date) => formik.setFieldValue('punch_in_time', value)}
            />
          </FormControl>
          <FormControl id="punch_out_time" mb="4">
            <FormLabel fontSize="1rem" fontWeight={600}>
              Punch Out Time
            </FormLabel>
            <DatePicker
              selected={formik.values?.punch_out_time ? new Date(formik.values?.punch_out_time) : null}
              onChange={(value: Date) => formik.setFieldValue('punch_out_time', value)}
            />
          </FormControl>
          <AsyncSelect<UserInterface>
            formik={formik}
            name={'user_id'}
            label={'Select User'}
            placeholder={'Select User'}
            fetcher={getUsers}
            labelField={'email'}
          />
          <Flex justifyContent={'flex-start'}>
            <Button
              isDisabled={formik?.isSubmitting}
              bg="state.info.main"
              color="base.100"
              type="submit"
              display="flex"
              height="2.5rem"
              padding="0rem 1rem"
              justifyContent="center"
              alignItems="center"
              gap="0.5rem"
              mr="4"
              _hover={{
                bg: 'state.info.main',
                color: 'base.100',
              }}
            >
              Submit
            </Button>
            <Button
              bg="neutral.transparent"
              color="neutral.main"
              type="button"
              display="flex"
              height="2.5rem"
              padding="0rem 1rem"
              justifyContent="center"
              alignItems="center"
              gap="0.5rem"
              mr="4"
              onClick={() => router.push('/biometric-accesses')}
              _hover={{
                bg: 'neutral.transparent',
                color: 'neutral.main',
              }}
            >
              Cancel
            </Button>
          </Flex>
        </FormWrapper>
      </Box>
    </AppLayout>
  );
}

export default compose(
  requireNextAuth({
    redirectTo: '/',
  }),
  withAuthorization({
    service: AccessServiceEnum.PROJECT,
    entity: 'biometric_access',
    operation: AccessOperationEnum.CREATE,
  }),
)(BiometricAccessCreatePage);
