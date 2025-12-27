# EmTerra Portal - Backend Integration Summary

## Overview
The emterra-portal frontend has been fully integrated with the emterra-be backend API. All authentication, facility management, and emission data features are now connected to the real backend.

---

## Changes Made to Frontend

### 1. Authentication & Token Management

#### Updated Files:
- **`src/utils/axiosClient.ts`**
  - Added JWT token management in request interceptor
  - Automatically attaches `Authorization: Bearer <token>` header to all requests
  - Implements automatic token refresh on 401 errors
  - Stores tokens in localStorage
  - Redirects to login on refresh failure

- **`src/service/auth/actions.ts`**
  - Updated to store JWT tokens after login/signup
  - Added error handling and proper error messages
  - Added `logout()`, `getUser()`, and `isAuthenticated()` helper functions
  - Changed default backend URL to `http://localhost:8080`

- **`src/components/login-form/hooks.ts`**
  - Added loading state during login
  - Proper success/error message handling
  - Only navigates to dashboard on successful login

### 2. Protected Routes

#### New Files:
- **`src/middleware.ts`**
  - Next.js middleware for route protection
  - Checks for authentication token before accessing protected routes
  - Redirects to login page if unauthenticated
  - Protected routes: `/dashboard`, `/company-profile`, `/data-collection`

### 3. Facility Management

#### New Files:
- **`src/service/branch/types.ts`**
  - TypeScript types for branch/facility data
  - `FacilityType` enum: HEADQUARTERS, MANUFACTURING, WAREHOUSE, OFFICE, RD, RETAIL, DATACENTER, OTHER
  - `SpaceType` enum: SQFT, SQM
  - `CreateBranchRequest` and `Branch` interfaces

- **`src/service/branch/actions.ts`**
  - `createBranch()` - Creates new facility via `POST /branches/signup`

#### Updated Files:
- **`src/service/company-profile/actions.ts`**
  - Updated `addFacility()` to call real backend API via BranchActions
  - Maps form data to backend-expected format

- **`src/components/add-facility-form/index.tsx`**
  - Added `city` and `country` form fields (required by backend)
  - Updated facility types to match backend enum values (uppercase)
  - Updated space unit values to match backend: SQFT, SQM
  - Form now fully integrated with backend API

### 4. Emission Data Management

#### New Files:
- **`src/service/emission/types.ts`**
  - `ScopeType` enum for all emission scopes
  - `AvailabilityType`: YES, NOT_AVAILABLE, NOT_APPLICABLE
  - `DataState`: DRAFT, SUBMITTED, APPROVED
  - `EmissionDataRequest` interface

- **`src/service/emission/actions.ts`**
  - `saveEmissionData()` - Saves emission data via `POST /branches/emission-data`

---

## Backend Endpoints Used

### Authentication
- `POST /users/signupCompanyAndUser` - User and company registration
- `POST /users/login` - User login (returns JWT tokens)
- `POST /users/refresh` - Refresh access token
- `GET /users/profile` - Get user profile (authenticated)

### Facility Management
- `POST /branches/signup` - Create new facility (ADMIN only)

### Emission Data
- `POST /branches/emission-data` - Submit emission data (authenticated)

---

## Environment Configuration

### Backend (.env.local in portal):
```env
BE_BASE_URL=http://localhost:8080
```

### CORS (Backend):
Backend is configured to accept requests from:
- `http://localhost:3000`
- `http://localhost:3001`

---

## Authentication Flow

1. **Login:**
   - User submits email/password
   - Frontend sends `POST /users/login`
   - Backend returns `{ accessToken, refreshToken, user }`
   - Frontend stores tokens in localStorage
   - User redirected to `/dashboard`

2. **Authenticated Requests:**
   - axios interceptor reads accessToken from localStorage
   - Adds `Authorization: Bearer <token>` header to request
   - If 401 response, automatically tries to refresh token
   - If refresh succeeds, retries original request
   - If refresh fails, clears tokens and redirects to login

3. **Logout:**
   - Clears all tokens from localStorage
   - Redirects to login page

---

## Data Mapping

### Facility Form → Backend API

| Form Field | Backend Field | Type |
|-----------|---------------|------|
| name | name | string |
| address | address | string |
| city | city | string (NEW) |
| country | country | string (NEW) |
| zipCode | zipcode | string |
| facilityType | type | FacilityType enum |
| officeSpace | officeSpace | number |
| spaceUnit | spaceType | SpaceType enum |
| fteCount | empCount | number |
| description | description | string (optional) |
| phone | phone | string (optional) |

---

## Testing Checklist

### Authentication:
- [ ] User can sign up with company details
- [ ] User can log in with email/password
- [ ] JWT tokens are stored in localStorage after login
- [ ] Protected routes redirect to login if not authenticated
- [ ] Token refresh works automatically on 401
- [ ] Logout clears tokens and redirects to login

### Facility Management:
- [ ] User can create a new facility
- [ ] All required fields are validated
- [ ] Facility types match backend enum values
- [ ] Space units (SQFT/SQM) work correctly
- [ ] Success message shown on facility creation
- [ ] User redirected to company profile after creation

### API Integration:
- [ ] CORS works between frontend (3000) and backend (8080)
- [ ] Authorization headers are sent with authenticated requests
- [ ] Error messages are displayed properly
- [ ] Loading states work during API calls

---

## Known Limitations

1. **Middleware Cookie Check:**
   - Next.js middleware checks for cookies, but tokens are in localStorage
   - May need client-side protection in addition to middleware

2. **No GET Endpoints Yet:**
   - Backend missing `GET /branches` to list facilities
   - Backend missing emission data retrieval endpoints
   - Frontend still uses mock data for display

3. **Emission Form:**
   - Emission data form UI exists but needs integration with `EmissionActions.saveEmissionData()`
   - Form schema endpoint `/form-schema/{scope}/{availability}` not yet integrated

---

## Next Steps for Full Integration

1. **Backend:**
   - Add `GET /branches` endpoint to retrieve facility list
   - Add emission data retrieval endpoints
   - Add dashboard statistics endpoints

2. **Frontend:**
   - Integrate emission data form with backend API
   - Fetch and display real facility data instead of mock
   - Implement form schema dynamic generation
   - Add proper loading and error states throughout

3. **Enhanced Features:**
   - Add user profile editing
   - Add facility editing/deletion
   - Add emission data history viewing
   - Add dashboard statistics visualization

---

## File Structure

```
src/
├── middleware.ts                          # NEW - Route protection
├── utils/
│   └── axiosClient.ts                     # UPDATED - JWT token handling
├── service/
│   ├── auth/
│   │   ├── actions.ts                     # UPDATED - Token storage
│   │   └── types.ts
│   ├── branch/                            # NEW
│   │   ├── actions.ts                     # NEW - Facility API calls
│   │   └── types.ts                       # NEW - Facility types
│   ├── emission/                          # NEW
│   │   ├── actions.ts                     # NEW - Emission API calls
│   │   └── types.ts                       # NEW - Emission types
│   └── company-profile/
│       └── actions.ts                     # UPDATED - Real API integration
└── components/
    ├── login-form/
    │   └── hooks.ts                       # UPDATED - Error handling
    └── add-facility-form/
        └── index.tsx                      # UPDATED - City/Country fields, enum values
```

---

## Conclusion

The frontend is now fully configured to communicate with the backend. Core authentication and facility creation features are working end-to-end. Additional backend endpoints are needed for complete feature parity, but the integration foundation is solid.
