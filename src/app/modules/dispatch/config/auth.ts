export const DispatchRoles = {
  EMPLOYER: 'employer::admin',
  ENROLL: 'enroll::admin',
  STAFF: 'staff::admin'
};

export const DispatchPermissions = {

  EMPLOYER_CREATE: 'employer::create',
  EMPLOYER_DELETE: 'employer::delete',
  EMPLOYER_CHANGE: `employer::change`,

  ENROLL_CREATE: 'enroll::create',
  ENROLL_DELETE: 'enroll::delete',
  ENROLL_AUDIT: `enroll::audit`,

  STAFF_CREATE: 'staff::create',
  STAFF_DELETE: 'staff::delete',
  STAFF_CHANGE: `staff::change`

};
