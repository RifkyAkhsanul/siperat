import axios from 'axios';
import { getToken } from '../components';

const SUPABASE_KEY =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTYyNzk1NTk0OCwiZXhwIjoxOTQzNTMxOTQ4fQ.c5rC9NY-KoVY1QYFha9d6nMapi4PJH6p3Pfyj3_uPjY';

const TTD_ENDPOINT = 'https://tmflkpbzllxuxukayata.supabase.co/rest/v1/permintaan_ttd';
const SIPERAT_ENDPOINT = 'https://siperatdata.azurewebsites.net/';

// Send get request and returns a Promise from Axios
const sendGet = async (url, params = {}) => {
  return axios({
    method: 'GET',
    url: url,
    headers: {
      Authorization: `Bearer ${getToken}`,
    },
    params: params,
  });
};

// Send post request and returns a Promise from Axios
const sendPost = async (url, payload = {}) => {
  return axios({
    method: 'POST',
    url: url,
    headers: {
      Authorization: `Bearer ${getToken}`,
      'content-type': 'application/json',
    },
    data: payload,
  });
};

// Send patch request and returns a Promise from Axios
const sendPatch = async (url, payload = {}) => {
  return axios({
    method: 'PATCH',
    url: url,
    headers: {
      Authorization: `Bearer ${getToken}`,
      'content-type': 'application/json',
    },
    params: payload,
  });
};

// Send delete request and returns a Promise from Axios
const sendDelete = async (url) => {
  return axios({
    method: 'DELETE',
    url: url,
    headers: {
      Authorization: `Bearer ${getToken}`,
      'content-type': 'application/json',
    },
  });
};

// Send post request w/ file and returns a Promise from Axios
const sendFile = async (url, payload = {}) => {
  return axios({
    method: 'POST',
    url: url,
    headers: {
      Authorization: `Bearer ${getToken}`,
      'content-type': 'multipart/form-data',
    },
    data: payload,
  });
};

const sendGetTTD = (url, params = {}) => {
  return axios({
    method: 'GET',
    url: url,
    headers: {
      apikey: SUPABASE_KEY,
      Authorization: `Bearer ${SUPABASE_KEY}`,
    },
    params: params,
  });
};

// Send post request and returns a Promise from Axios
const sendPostTTD = async (url, payload = {}) => {
  return axios({
    method: 'POST',
    url: url,
    headers: {
      Authorization: `Bearer ${SUPABASE_KEY}`,
      'content-type': 'application/json',
      Prefer: 'return=representation',
      apikey: SUPABASE_KEY,
    },
    data: payload,
  });
};

const sendPatchTTD = async (url, payload = {}) => {
  return axios({
    method: 'PATCH',
    url: url,
    headers: {
      Authorization: `Bearer ${SUPABASE_KEY}`,
      'content-type': 'application/json',
      Prefer: 'return=representation',
      apikey: SUPABASE_KEY,
    },
    data: payload,
  });
};

/**
 * Holds various function for communicating with irCARE backend.
 *
 * @namespace
 */
export const APIService = {
  public: {
    post: {
      buku_tamu: (data) => sendPost(`${SIPERAT_ENDPOINT}/buku_tamu/create`, data),
    },
  },
  user: {
    get: {
      check_privilege: (token) => sendGet(`${SIPERAT_ENDPOINT}/is_admin?bearer=${token}`),
      nomor_surat_all: () => sendGet(`${SIPERAT_ENDPOINT}/user/permintaan_nomor`),
      request_ttd_all: (nim) =>
        sendGetTTD(
          `${TTD_ENDPOINT}?nim=eq.${nim}&select=id,nama,nim,prodi,kontak,proker,perihal,tanggal,link_berkas,status_ttd_id, status_ttd(status),kementerian(kode),jenis_berkas_ttd(jenis)&order=tanggal.desc`
        ),
    },
    post: {
      nomor_surat: (data) => sendPost(`${SIPERAT_ENDPOINT}/user/permintaan_nomor`, data),
      request_ttd: (data) => sendPostTTD(`${TTD_ENDPOINT}`, data),
    },
    patch: {
      ajukan_ulang_nomor_surat: (id) => sendPatch(`${SIPERAT_ENDPOINT}/user/permintaan_nomor/${id}`),
    },
  },
  admin: {
    get: {
      nomor_surat_all: () => sendGet(`${SIPERAT_ENDPOINT}/admin/permintaan_nomor`),
      buku_tamu_all: () => sendGet(`${SIPERAT_ENDPOINT}/admin/buku_tamu`),
      request_ttd_all: () =>
        sendGetTTD(
          `${TTD_ENDPOINT}?select=id,nama,nim,prodi,kontak,proker,perihal,tanggal,link_berkas,status_ttd_id, status_ttd(status), kementerian(kode), jenis_berkas_ttd(jenis)&order=tanggal.desc`
        ),
    },
    patch: {
      change_status_nomor_surat: (id, data) => sendPatch(`${SIPERAT_ENDPOINT}/admin/permintaan_nomor/${id}/update`, data),
      change_status_ttd: (id, data) => sendPatchTTD(`${TTD_ENDPOINT}?id=eq.${id}`, data),
    },
  },
};
