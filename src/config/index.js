import { createClient } from "@supabase/supabase-js";
const supabase = createClient(window.location.hostname.startsWith('192.168.')
? process.env.REACT_APP_SUPABASE_URL_INTERNAL
: process.env.REACT_APP_SUPABASE_URL_VPN, process.env.REACT_APP_SUPABASE_KEY)

export default supabase;

export const USER_TYPE = {
  ADMIN: 0,
  STUDNET: 1,
  TEACHER: 2,
  NOT_SET: 3
}
export const PAPER_TYPE = {
  CONFERENCE_PAPER: 1,
  JOURNAL_PAPER: 2
}
export const BUCKET_NAME = "scientific-management-platform"
export const CONFERENCE_PAPER_STORAGE_PATH = "achievements/conference-papers/"
export const JOURNAL_PAPER_STORAGE_PATH = "achievements/journal-papers/"
export const AWARD_STORAGE_PATH = "achievements/conference-papers/"
export const PATENT_STORAGE_PATH = "achievements/conference-papers/"
export const MONOGRAPH_STORAGE_PATH = "achievements/conference-papers/"
export const SOFTWARE_COPYRIGHT_STORAGE_PATH = "achievements/conference-papers/"
export const PROJECT_STORAGE_PATH = "achievements/conference-papers/"