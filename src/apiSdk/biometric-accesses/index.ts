import axios from 'axios';
import queryString from 'query-string';
import { BiometricAccessInterface, BiometricAccessGetQueryInterface } from 'interfaces/biometric-access';
import { GetQueryInterface, PaginatedInterface } from '../../interfaces';

export const getBiometricAccesses = async (
  query?: BiometricAccessGetQueryInterface,
): Promise<PaginatedInterface<BiometricAccessInterface>> => {
  const response = await axios.get('/api/biometric-accesses', {
    params: query,
    headers: { 'Content-Type': 'application/json' },
  });
  return response.data;
};

export const createBiometricAccess = async (biometricAccess: BiometricAccessInterface) => {
  const response = await axios.post('/api/biometric-accesses', biometricAccess);
  return response.data;
};

export const updateBiometricAccessById = async (id: string, biometricAccess: BiometricAccessInterface) => {
  const response = await axios.put(`/api/biometric-accesses/${id}`, biometricAccess);
  return response.data;
};

export const getBiometricAccessById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/biometric-accesses/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deleteBiometricAccessById = async (id: string) => {
  const response = await axios.delete(`/api/biometric-accesses/${id}`);
  return response.data;
};
