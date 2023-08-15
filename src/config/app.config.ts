interface AppConfigInterface {
  ownerRoles: string[];
  customerRoles: string[];
  tenantRoles: string[];
  tenantName: string;
  applicationName: string;
  addOns: string[];
}
export const appConfig: AppConfigInterface = {
  ownerRoles: ['Business Owner'],
  customerRoles: ['Customer'],
  tenantRoles: ['IT Administrator'],
  tenantName: 'Organization',
  applicationName: 'Attendance management',
  addOns: ['file upload', 'chat', 'notifications', 'file'],
};
