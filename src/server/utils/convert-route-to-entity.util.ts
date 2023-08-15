const mapping: Record<string, string> = {
  'biometric-accesses': 'biometric_access',
  organizations: 'organization',
  payrolls: 'payroll',
  users: 'user',
};

export function convertRouteToEntityUtil(route: string) {
  return mapping[route] || route;
}
