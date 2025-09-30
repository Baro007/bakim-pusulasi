-- FIX: Add SELECT policies for anonymous users
-- This allows the app to read back the inserted data

-- Caregivers table SELECT policy
DROP POLICY IF EXISTS "Allow anonymous SELECT on caregivers" ON caregivers;
CREATE POLICY "Allow anonymous SELECT on caregivers"
ON caregivers
FOR SELECT
TO anon
USING (true);

-- Patients table SELECT policy
DROP POLICY IF EXISTS "Allow anonymous SELECT on patients" ON patients;
CREATE POLICY "Allow anonymous SELECT on patients"
ON patients
FOR SELECT
TO anon
USING (true);

-- ZBI Assessments table SELECT policy
DROP POLICY IF EXISTS "Allow anonymous SELECT on zbi_assessments" ON zbi_assessments;
CREATE POLICY "Allow anonymous SELECT on zbi_assessments"
ON zbi_assessments
FOR SELECT
TO anon
USING (true);

-- Verify policies
SELECT 
  schemaname,
  tablename,
  policyname,
  cmd,
  roles
FROM pg_policies 
WHERE tablename IN ('caregivers', 'patients', 'zbi_assessments')
ORDER BY tablename, cmd;
